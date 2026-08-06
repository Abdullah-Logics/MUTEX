import { isAllowed, fileTypeOf, extOf, MAX_UPLOAD_BYTES } from "../data/fileRules.js"

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000

function json(status, body, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...extra },
  })
}

function mimeFor(ext) {
  if (ext === "pdf") return "application/pdf"
  if (ext === "md") return "text/markdown; charset=utf-8"
  return "text/plain; charset=utf-8"
}

async function requireAuth(env, request) {
  const header = request.headers.get("Authorization") || ""
  const token = header.startsWith("Bearer ") ? header.slice(7) : ""
  if (!token) return null
  const cutoff = new Date(Date.now() - SESSION_TTL_MS).toISOString()
  const row = await env.DB.prepare("SELECT token FROM sessions WHERE token = ?1 AND created_at > ?2")
    .bind(token, cutoff)
    .first()
  return row ? token : null
}

function base64ToBytes(b64) {
  const bin = atob(b64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return bytes
}

async function insertNote(env, body) {
  const filename = String(body.filename || "").trim()
  if (!isAllowed(filename)) {
    return [400, { error: "Only PDF, Markdown (.md), and code files can be uploaded" }]
  }
  const type = fileTypeOf(filename)
  const extension = extOf(filename)
  const title = String(body.title || filename.replace(/\.[a-z0-9]+$/i, "")).trim() || "Untitled note"
  let bytes
  if (type === "pdf") {
    bytes = base64ToBytes(String(body.contentBase64 || ""))
  } else {
    bytes = new TextEncoder().encode(String(body.content ?? ""))
  }
  if (bytes.length > MAX_UPLOAD_BYTES) {
    return [413, { error: "File is too large (max 40 MB)" }]
  }
  const id = `note-${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}`
  const note = {
    id,
    title,
    subject: String(body.subject || "").trim() || "cs",
    author: String(body.author || "MUTEX Board").trim() || "MUTEX Board",
    filename,
    extension,
    type,
    mime: mimeFor(extension),
    size: `${(bytes.length / 1024).toFixed(1)} KB`,
    date: String(body.date || new Date().toISOString().slice(0, 10)).slice(0, 10),
  }
  await env.BUCKET.put(`notes/${id}.${extension}`, bytes, {
    httpMetadata: { contentType: note.mime },
  })
  await env.DB.prepare(
    "INSERT INTO notes (id, title, subject, author, filename, extension, type, mime, size, date) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10)"
  )
    .bind(
      note.id,
      note.title,
      note.subject,
      note.author,
      note.filename,
      note.extension,
      note.type,
      note.mime,
      note.size,
      note.date
    )
    .run()
  return [201, note]
}

export async function handle(request, env) {
  const url = new URL(request.url)
  const { pathname } = url
  const method = request.method

  try {
    if (method === "OPTIONS") return new Response(null, { status: 204 })

    if (pathname === "/api/health") {
      const { results } = await env.DB.prepare("SELECT COUNT(*) AS count FROM notes").all()
      return json(200, { ok: true, notes: results[0]?.count || 0 })
    }

    if (pathname === "/api/login" && method === "POST") {
      const body = await request.json().catch(() => ({}))
      if (body.email === env.ADMIN_EMAIL && body.password === env.ADMIN_PASSWORD) {
        const token = crypto.randomUUID()
        await env.DB.prepare("INSERT INTO sessions (token, created_at) VALUES (?1, ?2)")
          .bind(token, new Date().toISOString())
          .run()
        return json(200, { token, email: env.ADMIN_EMAIL })
      }
      return json(401, { error: "Invalid email or password" })
    }

    if (pathname === "/api/logout" && method === "POST") {
      const token = await requireAuth(env, request)
      if (token) {
        await env.DB.prepare("DELETE FROM sessions WHERE token = ?1").bind(token).run()
      }
      return json(200, { ok: true })
    }

    if (pathname === "/api/notes" && method === "GET") {
      const { results } = await env.DB.prepare("SELECT * FROM notes ORDER BY date DESC, id DESC").all()
      return json(200, results)
    }

    if (pathname === "/api/notes" && method === "POST") {
      if (!(await requireAuth(env, request))) return json(401, { error: "Not authorized" })
      const body = await request.json().catch(() => ({}))
      const [status, payload] = await insertNote(env, body)
      return json(status, payload)
    }

    const noteMatch = pathname.match(/^\/api\/notes\/(note-[\w-]+)(?:\/(download))?$/)
    if (noteMatch) {
      const [, id, isDownload] = noteMatch
      const note = await env.DB.prepare("SELECT * FROM notes WHERE id = ?1").bind(id).first()
      if (!note) return json(404, { error: "Note not found" })
      const key = `notes/${id}.${note.extension || "txt"}`
      const obj = await env.BUCKET.get(key)
      if (!obj) return json(404, { error: "Note file missing" })

      if (isDownload) {
        const inline = note.type === "pdf"
        return new Response(obj.body, {
          status: 200,
          headers: {
            "Content-Type": obj.httpMetadata?.contentType || mimeFor(note.extension),
            "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${encodeURIComponent(note.filename)}"`,
            "Content-Length": String(obj.size),
            "Cache-Control": "public, max-age=3600",
          },
        })
      }

      if (method === "GET") {
        if (note.type === "pdf") return json(200, note)
        const content = await obj.text()
        return json(200, { ...note, content })
      }

      if (method === "DELETE") {
        if (!(await requireAuth(env, request))) return json(401, { error: "Not authorized" })
        await env.BUCKET.delete(key)
        await env.DB.prepare("DELETE FROM notes WHERE id = ?1").bind(id).run()
        return json(200, { ok: true })
      }
    }

    return json(404, { error: "Not found" })
  } catch (err) {
    return json(500, { error: String(err?.message || err) })
  }
}
