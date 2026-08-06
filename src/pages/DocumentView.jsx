import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { motion as Motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Icon from "../components/Icons.jsx"
import Button from "../components/ui/Button.jsx"
import Badge from "../components/ui/Badge.jsx"
import Card from "../components/ui/Card.jsx"
import { fileMeta, formatDate, subjectById } from "../data/helpers.js"
import { DOCUMENTS } from "../data/mock.js"
import { getNote, noteDownloadUrl } from "../lib/api.js"
import { pageTransition, SPRING_SOFT } from "../lib/motion.js"

function NoteView({ noteId }) {
  const [note, setNote] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    getNote(noteId)
      .then((n) => active && setNote(n))
      .catch((e) => active && setError(e.message))
    return () => {
      active = false
    }
  }, [noteId])

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <Icon name="fileText" size={40} className="mx-auto text-faint" />
        <h1 className="mt-4 font-display text-2xl font-bold">Note not found</h1>
        <p className="mt-2 text-mut">It may have been removed by the admin.</p>
        <Button to="/subjects" className="mt-6">
          Back to subjects
        </Button>
      </div>
    )
  }

  if (!note) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <p className="mt-4 text-sm text-mut">Loading note…</p>
      </div>
    )
  }

  const subject = subjectById(note.subject)
  const meta = fileMeta(note.type)
  const format = (note.extension || note.type).toUpperCase()

  return (
    <Motion.div {...pageTransition} className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        to={subject ? `/subjects/${subject.id}` : "/subjects"}
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-mut transition-colors hover:text-accent"
      >
        <Icon name="arrowLeft" size={14} />
        {subject ? subject.name : "All subjects"}
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <Motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING_SOFT}>
          <div className="overflow-hidden rounded-2xl border border-line bg-base-2">
            <div className="flex items-center justify-between gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-faint">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {note.filename}
              </span>
              <Badge tone={meta.tone}>{meta.label}</Badge>
            </div>
            {note.type === "pdf" ? (
              <iframe
                src={noteDownloadUrl(note.id)}
                title={note.filename}
                className="h-[72vh] w-full"
              />
            ) : note.type === "md" ? (
              <div className="md-body max-h-[72vh] overflow-auto px-5 py-6 sm:px-8">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content || ""}</ReactMarkdown>
              </div>
            ) : (
              <pre className="max-h-[72vh] overflow-auto whitespace-pre-wrap break-words px-5 py-6 font-mono text-sm leading-relaxed text-ink">
                {note.content}
              </pre>
            )}
          </div>
        </Motion.div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <Badge tone={meta.tone}>{meta.label}</Badge>
              <Badge tone="neutral">{note.size}</Badge>
            </div>
            <h1 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {note.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-mut">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent-line bg-accent-soft font-semibold text-accent">
                {note.author.slice(0, 1)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{note.author}</p>
                <p className="text-xs text-faint">{formatDate(note.date)}</p>
              </div>
            </div>
          </div>

          <Card className="divide-y divide-line">
            {[
              ["Type", meta.label],
              ["Subject", subject?.name || "—"],
              ["Size", note.size],
              ["Format", format],
              ["Access", "Public — no login needed"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                <span className="text-mut">{k}</span>
                <span className="text-right font-medium text-ink">{v}</span>
              </div>
            ))}
          </Card>

          <div className="flex flex-col gap-3">
            <Button href={noteDownloadUrl(note.id)} size="lg" icon={<Icon name="download" size={17} />}>
              Download {meta.label}
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="md" icon={<Icon name="share" size={15} />} className="!gap-1.5">
                Share
              </Button>
              <Button variant="soft" to="/requests" size="md" icon={<Icon name="redirect" size={15} />}>
                Request similar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Motion.div>
  )
}

function MediaPlaceholder({ doc }) {
  const meta = fileMeta(doc.type)
  return (
    <div className="relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-2xl border border-line bg-base-2">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span
          className="absolute left-1/2 top-0 h-24 w-1/3 rounded-full blur-2xl"
          style={{ background: "var(--accent-soft)", animation: "scan 3.4s ease-in-out infinite" }}
        />
      </div>
      <Motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={SPRING_SOFT}
        className="relative flex flex-col items-center"
      >
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-accent-line bg-accent-soft text-accent">
          <Icon name={meta.icon} size={30} />
        </span>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-faint">
          {meta.label} archive
        </p>
        <p className="mt-1 text-sm text-mut">Preview available once storage is connected</p>
      </Motion.div>
    </div>
  )
}

export default function DocumentView() {
  const { docId } = useParams()

  if (docId?.startsWith("note-")) return <NoteView noteId={docId} />

  const doc = DOCUMENTS.find((d) => d.id === docId)

  if (!doc) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <Icon name="fileText" size={40} className="mx-auto text-faint" />
        <h1 className="mt-4 font-display text-2xl font-bold">Document not found</h1>
        <p className="mt-2 text-mut">It may have been moved or removed by an editor.</p>
        <Button to="/subjects" className="mt-6">
          Back to subjects
        </Button>
      </div>
    )
  }

  const meta = fileMeta(doc.type)
  const subject = subjectById(doc.subject)
  const related = DOCUMENTS.filter((d) => d.subject === doc.subject && d.id !== doc.id).slice(0, 3)

  return (
    <Motion.div {...pageTransition} className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        to={subject ? `/subjects/${subject.id}` : "/subjects"}
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-mut transition-colors hover:text-accent"
      >
        <Icon name="arrowLeft" size={14} />
        {subject ? subject.name : "All subjects"}
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <Motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING_SOFT}>
          <MediaPlaceholder doc={doc} />
        </Motion.div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <Badge tone={meta.tone}>{meta.label}</Badge>
              <Badge tone="neutral">{doc.size}</Badge>
            </div>
            <h1 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {doc.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-mut">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent-line bg-accent-soft font-semibold text-accent">
                {doc.author.slice(0, 1)}
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{doc.author}</p>
                <p className="text-xs text-faint">{formatDate(doc.date)}</p>
              </div>
            </div>
          </div>

          <Card className="divide-y divide-line">
            {[
              ["Type", meta.label],
              ["Subject", subject?.name || "—"],
              ["Size", doc.size],
              ["Format", doc.type.toUpperCase()],
              ["Access", "Public — no login needed"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between px-5 py-3 text-sm">
                <span className="text-mut">{k}</span>
                <span className="font-medium text-ink">{v}</span>
              </div>
            ))}
          </Card>

          <div className="flex flex-col gap-3">
            <Button size="lg" icon={<Icon name="download" size={17} />}>
              Download {meta.label}
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="md" icon={<Icon name="share" size={15} />} className="!gap-1.5">
                Share
              </Button>
              <Button variant="soft" to="/requests" size="md" icon={<Icon name="redirect" size={15} />}>
                Request similar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="mb-4 font-display text-lg font-bold">More in {subject?.name}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((d) => (
              <Link
                key={d.id}
                to={`/document/${d.id}`}
                className="card-hover group flex min-w-0 items-center gap-3 rounded-2xl border border-line bg-surface p-4"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent-line bg-accent-soft text-accent">
                  <Icon name={fileMeta(d.type).icon} size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-ink">{d.title}</span>
                  <span className="block text-xs text-faint">{d.size} · {fileMeta(d.type).label}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Motion.div>
  )
}
