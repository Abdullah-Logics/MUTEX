import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { motion as Motion } from "framer-motion"
import Icon from "../components/Icons.jsx"
import Button from "../components/ui/Button.jsx"
import DocumentCard from "../components/DocumentCard.jsx"
import EmptyState from "../components/EmptyState.jsx"
import { Stagger, StaggerItem } from "../components/Reveal.jsx"
import { docsForSubject, subjectById, formatDate } from "../data/helpers.js"
import { useNotes } from "../lib/notesStore.js"
import { pageTransition } from "../lib/motion.js"

const FILTERS = [
  { id: "all", label: "All" },
  { id: "txt", label: "Notes" },
  { id: "pdf", label: "PDF & Docs" },
  { id: "video", label: "Videos" },
  { id: "audio", label: "Audio" },
  { id: "image", label: "Images" },
]

export default function SubjectDetail() {
  const { subjectId } = useParams()
  const subject = subjectById(subjectId)
  const notes = useNotes()
  const docs = useMemo(() => {
    const subjectDocs = docsForSubject(subjectId)
    const noteIds = new Set(subjectDocs.map((d) => d.id))
    const noteDocs = notes.filter((n) => !noteIds.has(n.id) && n.subject === subjectById(subjectId)?.id)
    return [...noteDocs, ...subjectDocs]
  }, [notes, subjectId])

  const [filter, setFilter] = useState("all")
  const [q, setQ] = useState("")

  const filtered = useMemo(() => {
    let list = docs
    if (filter === "txt") list = list.filter((d) => d.type === "md" || d.type === "code")
    if (filter === "pdf") list = list.filter((d) => d.type === "pdf" || d.type === "doc")
    if (filter !== "all" && filter !== "txt" && filter !== "pdf") list = list.filter((d) => d.type === filter)
    if (q.trim()) {
      const term = q.trim().toLowerCase()
      list = list.filter((d) => d.title.toLowerCase().includes(term))
    }
    return list
  }, [docs, filter, q])

  if (!subject) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <EmptyState
          icon="folder"
          title="Subject not found"
          body="This collection may have been renamed or removed by the admin."
          action={
            <Link
              to="/subjects"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent"
            >
              <Icon name="arrowLeft" size={15} />
              Back to subjects
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <Motion.div {...pageTransition}>
      <div className="relative overflow-hidden border-b border-line bg-base-2">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div
          className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "var(--accent-soft)" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <Motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/subjects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-mut transition-colors hover:text-accent"
            >
              <Icon name="arrowLeft" size={14} />
              All subjects
            </Link>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
                    {subject.name}
                  </h1>
                  <span className="hidden font-mono text-sm text-faint sm:inline">
                    {docs.length.toString().padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-2 max-w-lg text-mut">{subject.tagline}</p>
                <p className="mt-3 text-xs text-faint">
                  Last updated {formatDate(subject.updated)} · curated by MUTEX editors
                </p>
              </div>
              <Button to="/requests" variant="soft" icon={<Icon name="send" size={15} />}>
                Request in this subject
              </Button>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <div className="-mx-4 flex items-center gap-1.5 overflow-x-auto border-y border-line bg-base-2 p-3 sm:mx-0 sm:overflow-visible sm:rounded-full sm:border sm:p-1">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                    filter === f.id
                      ? "bg-accent text-on-accent"
                      : "text-mut hover:text-ink"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-2 sm:ml-auto sm:w-64">
              <Icon name="search" size={15} className="shrink-0 text-mut" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Filter documents…"
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-faint"
              />
            </div>
          </Motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {filtered.length > 0 ? (
          <Stagger gap={0.05} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((d, i) => (
              <StaggerItem key={d.id} className="h-full">
                <DocumentCard doc={d} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <EmptyState
            icon="fileText"
            title="Nothing here yet"
            body={
              q
                ? `No documents match "${q}" in ${subject.name}.`
                : `No ${filter} documents in ${subject.name} yet — request it and we'll source it.`
            }
            action={
              <Button to="/requests" variant="soft" className="mt-5" icon={<Icon name="send" size={15} />}>
                Request it
              </Button>
            }
          />
        )}
      </div>
    </Motion.div>
  )
}
