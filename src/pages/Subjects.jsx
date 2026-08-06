import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { motion as Motion } from "framer-motion"
import Icon from "../components/Icons.jsx"
import { Reveal, Stagger, StaggerItem } from "../components/Reveal.jsx"
import SubjectCard from "../components/SubjectCard.jsx"
import DocumentCard from "../components/DocumentCard.jsx"
import EmptyState from "../components/EmptyState.jsx"
import { SUBJECTS, DOCUMENTS } from "../data/mock.js"
import { useNotes } from "../lib/notesStore.js"
import { pageTransition } from "../lib/motion.js"

function searchScore(subject, q) {
  const hay = `${subject.name} ${subject.tagline}`.toLowerCase()
  if (!q) return 0
  if (hay.startsWith(q)) return 3
  if (hay.includes(q)) return 2
  if (subject.tagline.toLowerCase().includes(q)) return 1
  return -1
}

export default function Subjects() {
  const [params, setParams] = useSearchParams()
  const notes = useNotes()
  const query = params.get("q") || ""
  const [term, setTerm] = useState(query)

  const results = useMemo(() => {
    const q = term.trim().toLowerCase()
    if (!q) return { matches: SUBJECTS, others: [], hasTerm: false }
    const matches = SUBJECTS.map((s) => ({ s, score: searchScore(s, q) }))
      .filter((r) => r.score >= 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.s)
    const docHits = [...notes, ...DOCUMENTS].filter((d) =>
      d.title.toLowerCase().includes(q) && !matches.some((s) => s.id === d.subject)
    )
    return { matches, docHits, hasTerm: true }
  }, [term, notes])

  const updateSearch = (value) => {
    setTerm(value)
    if (value.trim()) setParams({ q: value.trim() }, { replace: true })
    else setParams({}, { replace: true })
  }

  return (
    <Motion.div {...pageTransition} className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <Reveal>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-accent">
          /subjects
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-5xl">
          The archive
        </h1>
        <p className="mt-3 max-w-xl text-mut">
          Eight collections, thousands of documents. Pick a subject and dive in.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-line bg-surface p-2 pl-4 transition-colors focus-within:border-accent">
          <Icon name="search" className="shrink-0 text-mut" />
          <input
            value={term}
            onChange={(e) => updateSearch(e.target.value)}
            placeholder="Search subjects or documents…"
            className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-faint"
          />
          {term && (
            <button
              onClick={() => updateSearch("")}
              className="rounded-full p-1.5 text-mut transition-colors hover:bg-surface-2 hover:text-ink"
              aria-label="Clear search"
            >
              <Icon name="close" size={15} />
            </button>
          )}
        </div>
      </Reveal>

      <div className="mt-12">
        {results.hasTerm && (
          <p className="mb-6 text-sm text-mut">
            {results.matches.length === 0 && results.docHits.length === 0 ? (
              <span>
                No results for <strong className="text-ink">&quot;{term}&quot;</strong>.
              </span>
            ) : (
              <span>
                <strong className="text-ink">{results.matches.length + results.docHits.length}</strong>{" "}
                {results.matches.length + results.docHits.length === 1 ? "result" : "results"} for{" "}
                <strong className="text-ink">&quot;{term}&quot;</strong>
              </span>
            )}
          </p>
        )}

        {results.matches.length > 0 && (
          <>
            <Stagger gap={0.06} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {results.matches.map((s, i) => (
                <StaggerItem key={s.id} className="h-full">
                  <SubjectCard subject={s} index={i} />
                </StaggerItem>
              ))}
            </Stagger>
            {results.docHits.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.25em] text-mut">
                  Documents found
                </h2>
                <Stagger gap={0.05} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {results.docHits.map((d, i) => (
                    <StaggerItem key={d.id} className="h-full">
                      <DocumentCard doc={d} index={i} />
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            )}
          </>
        )}

        {results.matches.length === 0 && (
          <EmptyState
            icon="search"
            title="Nothing found"
            body={`No subjects or documents match "${term}". Try a different keyword.`}
            action={
              <button
                onClick={() => updateSearch("")}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <Icon name="refresh" size={15} />
                Clear search
              </button>
            }
          />
        )}
      </div>
    </Motion.div>
  )
}
