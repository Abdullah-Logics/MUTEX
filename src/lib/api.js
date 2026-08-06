const TOKEN_KEY = "mutex.token"
const ADMIN_EMAIL = "MrMutex@gmail.com"

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function isLoggedIn() {
  return Boolean(getToken())
}

export function authHeaders(token = getToken()) {
  return { Authorization: `Bearer ${token}` }
}

export async function login(email, password) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || "Invalid email or password")
  localStorage.setItem(TOKEN_KEY, data.token)
  return data
}

export async function logout() {
  const token = getToken()
  localStorage.removeItem(TOKEN_KEY)
  if (token) fetch("/api/logout", { method: "POST", headers: authHeaders(token) }).catch(() => {})
}

export async function getNotes() {
  const res = await fetch("/api/notes")
  if (!res.ok) throw new Error("Failed to load notes")
  return res.json()
}

export async function createNote({ title, subject, author, filename, content, contentBase64 }) {
  const payload = { title, subject, author, filename }
  if (contentBase64) payload.contentBase64 = contentBase64
  else payload.content = content
  const res = await fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || "Upload failed")
  return data
}

export async function getNote(id) {
  const res = await fetch(`/api/notes/${id}`)
  if (!res.ok) throw new Error("Note not found")
  return res.json()
}

export async function deleteNote(id) {
  const res = await fetch(`/api/notes/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error("Delete failed")
}

export function noteDownloadUrl(id) {
  return `/api/notes/${id}/download`
}

export { ADMIN_EMAIL }
