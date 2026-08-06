import { useMemo, useRef, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { motion as Motion, AnimatePresence } from "framer-motion"
import Icon from "../components/Icons.jsx"
import Button from "../components/ui/Button.jsx"
import Badge from "../components/ui/Badge.jsx"
import Card from "../components/ui/Card.jsx"
import Modal from "../components/ui/Modal.jsx"
import { Input, Select, Textarea } from "../components/ui/Input.jsx"
import { SUBJECTS, DOCUMENTS, REQUESTS, FEEDBACK, EDITORS } from "../data/mock.js"
import { subjectById, formatDate, fileMeta } from "../data/helpers.js"
import { isAllowed, fileTypeOf, MAX_UPLOAD_BYTES } from "../data/fileRules.js"
import { pageTransition, EASE } from "../lib/motion.js"
import { isLoggedIn, logout } from "../lib/api.js"
import { useNotes, notesStore } from "../lib/notesStore.js"

const TABS = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "subjects", label: "Subjects", icon: "folder" },
  { id: "documents", label: "Documents", icon: "fileText" },
  { id: "editors", label: "Editors", icon: "users" },
  { id: "requests", label: "Requests", icon: "send" },
  { id: "feedback", label: "Feedback", icon: "mail" },
]

const REQ_STATUS = {
  open: { label: "Open", tone: "warn" },
  fulfilled: { label: "Fulfilled", tone: "success" },
  redirected: { label: "Redirected", tone: "info" },
  closed: { label: "Closed", tone: "neutral" },
}

function Overview({ data, notes, onNavigate }) {
  const stats = [
    { label: "Subjects", value: data.subjects.length, icon: "folder", to: "subjects" },
    { label: "Documents", value: data.documents.length + notes.length, icon: "fileText", to: "documents" },
    { label: "Editors", value: data.editors.filter((e) => e.active).length, icon: "users", to: "editors" },
    { label: "Open requests", value: data.requests.filter((r) => r.status === "open").length, icon: "send", to: "requests" },
  ]
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Motion.button
            key={s.label}
            onClick={() => onNavigate(s.to)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: EASE }}
            className="card-hover min-w-0 rounded-2xl border border-line bg-surface p-4 text-left sm:p-5"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent-line bg-accent-soft text-accent">
              <Icon name={s.icon} size={18} />
            </span>
            <p className="mt-4 font-display text-2xl font-bold sm:text-3xl">{s.value}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-mut sm:text-xs">{s.label}</p>
          </Motion.button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="min-w-0 p-5 sm:p-6">
          <h3 className="font-display text-lg font-bold">Latest requests</h3>
          <div className="mt-4 space-y-3">
            {data.requests.slice(0, 4).map((r) => {
              const st = REQ_STATUS[r.status]
              return (
                <div key={r.id} className="flex items-start justify-between gap-3 rounded-xl border border-line bg-base-2 p-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{r.title}</p>
                    <p className="mt-0.5 text-xs text-faint">
                      {subjectById(r.subject)?.name} · {formatDate(r.date)}
                    </p>
                  </div>
                  <Badge tone={st.tone}>{st.label}</Badge>
                </div>
              )
            })}
          </div>
        </Card>
        <Card className="min-w-0 p-5 sm:p-6">
          <h3 className="font-display text-lg font-bold">Recent uploads</h3>
          <div className="mt-4 space-y-3">
            {[...notes, ...data.documents].slice(0, 4).map((d) => (
              <div key={d.id} className="flex items-center gap-3 rounded-xl border border-line bg-base-2 p-3.5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon name={fileMeta(d.type).icon} size={16} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{d.title}</p>
                  <p className="text-xs text-faint">{fileMeta(d.type).label} · {d.size}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function SubjectsTab({ data, addSubject, deleteSubject }) {
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ name: "", tagline: "" })

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-bold">Subjects</h2>
        <Button onClick={() => setModal(true)} size="sm" icon={<Icon name="plus" size={15} />}>
          New Subject
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {data.subjects.map((s) => (
          <Card key={s.id} hover className="flex items-center justify-between p-5">
            <div className="min-w-0">
              <h3 className="font-display font-bold">{s.name}</h3>
              <p className="mt-0.5 text-xs text-mut">{s.tagline}</p>
              <p className="mt-2 text-[11px] text-faint">
                {data.documents.filter((d) => d.subject === s.id).length} documents
              </p>
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => deleteSubject(s.id)}
                className="rounded-lg border border-line p-2 text-mut transition-colors hover:border-red-500/40 hover:text-red-500"
                aria-label="Delete"
              >
                <Icon name="trash" size={15} />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Create subject">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (!form.name.trim()) return
            addSubject(form)
            setForm({ name: "", tagline: "" })
            setModal(false)
          }}
        >
          <Input
            label="Subject name"
            placeholder="e.g. Statistics"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <Input
            label="Tagline"
            placeholder="Short description"
            value={form.tagline}
            onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
          />
          <Button type="submit" className="w-full">Create Subject</Button>
        </form>
      </Modal>
    </div>
  )
}

function DocumentsTab({ data, notes, onDelete }) {
  const [q, setQ] = useState("")
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("")
  const [author, setAuthor] = useState("MUTEX Board")
  const [uploadError, setUploadError] = useState("")
  const [uploaded, setUploaded] = useState(false)
  const [busy, setBusy] = useState(false)
  const inputRef = useRef(null)

  const filtered = data.documents.filter((d) =>
    d.title.toLowerCase().includes(q.trim().toLowerCase())
  )

  const pickFile = (list) => {
    const f = list && list[0]
    if (!f) return
    if (!isAllowed(f.name)) {
      setUploadError("Only PDF, Markdown (.md), and code files can be uploaded.")
      return
    }
    if (f.size > MAX_UPLOAD_BYTES) {
      setUploadError("That file is too large — keep files under 10 MB.")
      return
    }
    setUploadError("")
    const base = { name: f.name, size: f.size }
    if (fileTypeOf(f.name) === "pdf") {
      const reader = new FileReader()
      reader.onload = () => {
        setFile({ ...base, contentBase64: String(reader.result || "").split(",")[1] || "" })
        setTitle(f.name.replace(/\.[a-z0-9]+$/i, "").trim())
      }
      reader.readAsDataURL(f)
    } else {
      const reader = new FileReader()
      reader.onload = () => {
        setFile({ ...base, content: String(reader.result || "") })
        setTitle(f.name.replace(/\.[a-z0-9]+$/i, "").trim())
      }
      reader.readAsText(f)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!file || !title.trim() || !subject || busy) return
    setBusy(true)
    setUploadError("")
    try {
      await notesStore.add({
        title: title.trim(),
        subject,
        author: author.trim() || "MUTEX Board",
        filename: file.name,
        content: file.content,
        contentBase64: file.contentBase64,
      })
      setFile(null)
      setTitle("")
      setSubject("")
      setAuthor("MUTEX Board")
      setUploaded(true)
      setTimeout(() => setUploaded(false), 3200)
    } catch (err) {
      setUploadError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-bold">All documents</h2>
        <div className="flex w-full items-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-2 sm:w-auto">
          <Icon name="search" size={15} className="shrink-0 text-mut" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search documents…"
            className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-faint sm:w-48"
          />
        </div>
      </div>

      <Card className="mb-6 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-bold">Upload a note</h3>
            <p className="mt-1 text-xs text-mut">PDF, Markdown, and code files land in the archive&apos;s file directory.</p>
          </div>
          <Badge tone="success">
            <Icon name="fileText" size={12} />
            PDF · MD · Code
          </Badge>
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            pickFile(e.dataTransfer.files)
          }}
          onClick={() => inputRef.current?.click()}
          className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line bg-base-2 px-6 py-10 text-center transition-colors hover:border-accent-line"
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.md,.markdown,.js,.jsx,.ts,.tsx,.html,.htm,.css,.scss,.sass,.less,.json,.vue,.svelte,.py,.sh,.bash,.zsh,.rb,.php,.pl,.lua,.r,.swift,.c,.h,.cpp,.hpp,.cc,.cxx,.cs,.java,.go,.rs,.kt,.kts,.scala,.dart,.zig,.nim,.ex,.exs,.erl,.hs,.yaml,.yml,.toml,.ini,.xml,.sql,.graphql,.gql,.asm,.s"
            className="hidden"
            onChange={(e) => {
              pickFile(e.target.files)
              e.target.value = ""
            }}
          />
          {file ? (
            <>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-accent-line bg-accent-soft text-accent">
                <Icon name={fileMeta(fileTypeOf(file.name)).icon} size={22} />
              </span>
              <p className="mt-3 max-w-md truncate text-sm font-semibold text-ink">{file.name}</p>
              <p className="mt-1 text-xs text-faint">
                {(file.size / 1024).toFixed(1)} KB · {fileMeta(fileTypeOf(file.name)).label}
                {file.content ? ` · ${file.content.split(/\s+/).filter(Boolean).length.toLocaleString()} words` : ""}
              </p>
              <span className="mt-3 text-xs font-semibold text-accent">Tap to choose a different file</span>
            </>
          ) : (
            <>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-accent-line bg-accent-soft text-accent">
                <Icon name="upload" size={22} />
              </span>
              <p className="mt-3 text-sm font-semibold text-ink">Drag a PDF, Markdown, or code file here or click to browse</p>
              <p className="mt-1 text-xs text-faint">Other file types are rejected.</p>
            </>
          )}
        </div>

        {uploadError && (
          <p className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-600 dark:text-red-400">
            {uploadError}
          </p>
        )}

        <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input
            label="Note title"
            placeholder="e.g. Chapter 3 — Functions notes"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: "", label: "Choose a subject…" },
              ...data.subjects.map((s) => ({ value: s.id, label: s.name })),
            ]}
          />
          <Input
            label="Author"
            placeholder="e.g. MUTEX Board"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="sm:col-span-2"
          />
          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-faint">Saved to the uploads directory and published instantly.</p>            <Button
              type="submit"
              disabled={!file || !title.trim() || !subject || busy}
              className={`${!file || !title.trim() || !subject || busy ? "opacity-40" : ""}`}
              icon={<Icon name="upload" size={16} />}
            >
              {busy ? "Uploading…" : "Upload note"}
            </Button>
          </div>
        </form>
      </Card>

      {uploaded && (
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 right-4 z-[95] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl border border-accent-line bg-surface px-5 py-4 shadow-2xl sm:bottom-6 sm:right-6"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
            <Icon name="check" size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">Note published</p>
            <p className="text-xs text-mut">It&apos;s now live in the archive.</p>
          </div>
        </Motion.div>
      )}

      <div className="mb-6">
        <h3 className="mb-3 font-display text-lg font-bold">
          Uploaded notes <span className="text-sm font-normal text-faint">({notes.length})</span>
        </h3>
        {notes.length > 0 ? (
          <Card className="divide-y divide-line">
            {notes.map((n) => (
              <div key={n.id} className="flex flex-wrap items-center gap-3 p-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon name={fileMeta(n.type).icon} size={17} />
                </span>
                <div className="min-w-0 flex-1 basis-40">
                  <p className="truncate text-sm font-semibold">{n.title}</p>
                  <p className="text-xs text-faint">
                    {subjectById(n.subject)?.name} · {formatDate(n.date)} · {n.size}
                  </p>
                </div>
                <Badge tone={fileMeta(n.type).tone}>{fileMeta(n.type).label}</Badge>
                <div className="flex gap-1.5">
                  <a
                    href={`/document/${n.id}`}
                    className="rounded-lg border border-line p-2 text-mut transition-colors hover:border-accent hover:text-accent"
                    aria-label="View"
                  >
                    <Icon name="eye" size={14} />
                  </a>
                  <button
                    onClick={() => onDelete(n.id)}
                    className="rounded-lg border border-line p-2 text-mut transition-colors hover:border-red-500/40 hover:text-red-500"
                    aria-label="Delete"
                  >
                    <Icon name="trash" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </Card>
        ) : (
          <p className="rounded-2xl border border-dashed border-line px-4 py-6 text-center text-sm text-mut">
            No notes uploaded yet — drop a PDF, Markdown, or code file above to start the archive.
          </p>
        )}
      </div>

      <h3 className="mb-3 font-display text-lg font-bold">Archive documents</h3>
      <Card className="divide-y divide-line">
        {filtered.map((d) => (
          <div key={d.id} className="flex flex-wrap items-center gap-3 p-4">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Icon name={fileMeta(d.type).icon} size={17} />
            </span>
            <div className="min-w-0 flex-1 basis-40">
              <p className="truncate text-sm font-semibold">{d.title}</p>
              <p className="text-xs text-faint">
                {subjectById(d.subject)?.name} · {formatDate(d.date)} · {d.size}
              </p>
            </div>
            <Badge tone="neutral">{fileMeta(d.type).label}</Badge>
            <div className="flex gap-1.5">
              <button className="rounded-lg border border-line p-2 text-mut transition-colors hover:border-accent hover:text-accent" aria-label="Edit">
                <Icon name="edit" size={14} />
              </button>
              <button className="rounded-lg border border-line p-2 text-mut transition-colors hover:border-red-500/40 hover:text-red-500" aria-label="Delete">
                <Icon name="trash" size={14} />
              </button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}

function EditorsTab({ data, addEditor, toggleEditor, deleteEditor }) {
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", subject: "" })

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-bold">Subject editors</h2>
        <Button onClick={() => setModal(true)} size="sm" icon={<Icon name="plus" size={15} />}>
          New Editor
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {data.editors.map((e) => (
          <Card key={e.id} hover className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft font-bold text-accent">
                  {e.name.slice(0, 1)}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate font-display font-bold">{e.name}</h3>
                  <p className="truncate text-xs text-mut">{e.email}</p>
                </div>
              </div>
              <Badge tone={e.active ? "success" : "neutral"}>{e.active ? "Active" : "Disabled"}</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {e.subjects.map((s) => (
                <Badge key={s} tone="accent">{subjectById(s)?.name}</Badge>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
              <span className="text-[11px] text-faint">Created {formatDate(e.created)}</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => toggleEditor(e.id)}
                  className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-mut transition-colors hover:border-accent hover:text-accent"
                >
                  {e.active ? "Disable" : "Enable"}
                </button>
                <button
                  onClick={() => deleteEditor(e.id)}
                  className="rounded-lg border border-line p-1.5 text-mut transition-colors hover:border-red-500/40 hover:text-red-500"
                  aria-label="Delete"
                >
                  <Icon name="trash" size={14} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Create editor profile">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (!form.name.trim() || !form.subject) return
            addEditor(form)
            setForm({ name: "", email: "", subject: "" })
            setModal(false)
          }}
        >
          <Input
            label="Full name"
            placeholder="e.g. Sara Khan"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <Input
            label="Email"
            type="email"
            placeholder="editor@example.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <Select
            label="Assigned subject"
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            options={[
              { value: "", label: "Choose a subject…" },
              ...data.subjects.map((s) => ({ value: s.id, label: s.name })),
            ]}
          />
          <p className="rounded-xl border border-accent-line bg-accent-soft px-4 py-3 text-xs text-mut">
            The editor&apos;s subject access key will be their email. Change it anytime from this panel.
          </p>
          <Button type="submit" className="w-full">Create Editor</Button>
        </form>
      </Modal>
    </div>
  )
}

function RequestsTab({ data, act }) {
  return (
    <div>
      <h2 className="mb-5 font-display text-2xl font-bold">Requests</h2>
      <div className="space-y-4">
        {data.requests.map((r) => {
          const st = REQ_STATUS[r.status]
          return (
            <Card key={r.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={st.tone}>{st.label}</Badge>
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-faint">
                      {subjectById(r.subject)?.name}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display font-bold">{r.title}</h3>
                  <p className="mt-1 text-sm text-mut">{r.detail}</p>
                  <p className="mt-2 text-xs text-faint">Requested {formatDate(r.date)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {r.status === "open" && (
                    <>
                      <Button size="sm" variant="soft" onClick={() => act(r.id, "fulfilled")} icon={<Icon name="check" size={14} />}>
                        Fulfill
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => act(r.id, "redirected")} icon={<Icon name="redirect" size={14} />}>
                        Redirect
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => act(r.id, "closed")} icon={<Icon name="close" size={14} />}>
                        Close
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function FeedbackTab({ data }) {
  return (
    <div>
      <h2 className="mb-5 font-display text-2xl font-bold">Feedback</h2>
      <div className="space-y-4">
        {data.feedback.map((f) => (
          <Card key={f.id} className="p-5">
            <p className="text-sm leading-relaxed">{f.body}</p>
            <p className="mt-3 text-xs text-faint">
              {f.by} · {formatDate(f.date)}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function Admin() {
  const navigate = useNavigate()
  const notes = useNotes()
  const [tab, setTab] = useState("overview")
  const [subjects, setSubjects] = useState(SUBJECTS)
  const [editors, setEditors] = useState(EDITORS)
  const [requests, setRequests] = useState(REQUESTS)

  const data = useMemo(() => ({ subjects, editors, requests, documents: DOCUMENTS, feedback: FEEDBACK }), [subjects, editors, requests])

  if (!isLoggedIn()) return <Navigate to="/login" replace />

  const addSubject = ({ name, tagline }) =>
    setSubjects((s) => [
      ...s,
      { id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), name, tagline: tagline || "New collection", icon: "folder", updated: new Date().toISOString().slice(0, 10) },
    ])
  const deleteSubject = (id) => setSubjects((s) => s.filter((x) => x.id !== id))

  const addEditor = ({ name, email, subject }) =>
    setEditors((e) => [
      ...e,
      { id: `e${Date.now()}`, name, email: email || `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`, subjects: [subject], created: new Date().toISOString().slice(0, 10), active: true },
    ])
  const toggleEditor = (id) => setEditors((e) => e.map((x) => (x.id === id ? { ...x, active: !x.active } : x)))
  const deleteEditor = (id) => setEditors((e) => e.filter((x) => x.id !== id))

  const act = (id, status) => setRequests((r) => r.map((x) => (x.id === id ? { ...x, status } : x)))

  const signOut = async () => {
    await logout()
    navigate("/", { replace: true })
  }

  return (
    <Motion.div {...pageTransition} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-accent">
            /admin
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Command center
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="accent">
            <Icon name="shield" size={12} />
            Site Admin
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            icon={<Icon name="logout" size={15} />}
          >
            Sign out
          </Button>
        </div>
      </div>

      <div className="mb-8 flex gap-1.5 overflow-x-auto pb-2 md:flex-wrap md:gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-4 ${
              tab === t.id
                ? "border-accent bg-accent text-on-accent"
                : "border-line bg-surface text-mut hover:text-ink"
            }`}
          >
            <Icon name={t.icon} size={15} />
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <Motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {tab === "overview" && <Overview data={data} notes={notes} onNavigate={setTab} />}
          {tab === "subjects" && <SubjectsTab data={data} addSubject={addSubject} deleteSubject={deleteSubject} />}
          {tab === "documents" && <DocumentsTab data={data} notes={notes} onDelete={(id) => notesStore.remove(id)} />}
          {tab === "editors" && <EditorsTab data={data} addEditor={addEditor} toggleEditor={toggleEditor} deleteEditor={deleteEditor} />}
          {tab === "requests" && <RequestsTab data={data} act={act} />}
          {tab === "feedback" && <FeedbackTab data={data} />}
        </Motion.div>
      </AnimatePresence>
    </Motion.div>
  )
}
