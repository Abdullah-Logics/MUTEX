import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion as Motion } from "framer-motion"
import Icon from "../components/Icons.jsx"
import Button from "../components/ui/Button.jsx"
import Badge from "../components/ui/Badge.jsx"
import Card from "../components/ui/Card.jsx"
import { Reveal, Stagger, StaggerItem } from "../components/Reveal.jsx"
import SubjectCard from "../components/SubjectCard.jsx"
import DocumentCard from "../components/DocumentCard.jsx"
import StaggeredText from "../components/StaggeredText.jsx"
import CountUp from "../components/CountUp.jsx"
import Magnetic from "../components/Magnetic.jsx"
import { SUBJECTS, DOCUMENTS } from "../data/mock.js"
import { formatDate } from "../data/helpers.js"
import { useNotes } from "../lib/notesStore.js"
import { EASE } from "../lib/motion.js"

const STATS = [
  { value: 8, pad: 2, label: "Subjects" },
  { value: 246, label: "Documents" },
  { value: 312, label: "Downloads" },
  { value: 98, suffix: "%", label: "Fulfilled" },
]

const FEATURES = [
  {
    icon: "fileText",
    title: "Browse freely",
    body: "Every note, past paper, video and audio track is open to view and download — no account needed.",
  },
  {
    icon: "users",
    title: "Managed by admins",
    body: "Subject editors keep their archive fresh. Everything is reviewed and organized by the site admin.",
  },
  {
    icon: "send",
    title: "Request anything",
    body: "Missing a paper or notes? Send a request — admins get notified and fulfill it, fast.",
  },
  {
    icon: "shield",
    title: "Secure by design",
    body: "Role-based access with per-subject credentials. Only authorized editors can publish content.",
  },
]

function Hero() {
  const navigate = useNavigate()
  const [q, setQ] = useState("")

  const submit = (e) => {
    e.preventDefault()
    if (q.trim()) navigate(`/subjects?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: "var(--accent-soft)",
          animation: "aurora 9s ease-in-out infinite",
        }}
      />
      <Motion.div
        className="pointer-events-none absolute -left-24 top-40 hidden h-72 w-72 rounded-full blur-3xl lg:block"
        style={{ background: "var(--accent-soft-2)", animation: "float 11s ease-in-out infinite" }}
      />
      <Motion.div
        className="pointer-events-none absolute -right-24 bottom-0 hidden h-80 w-80 rounded-full blur-3xl lg:block"
        style={{ background: "var(--accent-soft)", animation: "float 9s ease-in-out infinite" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28 lg:pb-24">
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex justify-center"
        >
          <Badge tone="accent" className="px-3.5 py-1.5 text-xs">
            <Icon name="lock" size={13} />
            Unlocked archive · notes · past papers · media
          </Badge>
        </Motion.div>

        <h1 className="mx-auto mt-6 max-w-4xl text-center font-display text-[clamp(2.5rem,12.5vw,5rem)] font-bold leading-[1] tracking-tight sm:text-6xl lg:text-7xl">
          <StaggeredText text="Every subject." />
          <br />
          <StaggeredText text="Every paper." className="text-gradient" lineGap={0.45} />
          <br />
          <StaggeredText text="One archive." lineGap={0.9} />
        </h1>

        <Motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
          className="mx-auto mt-6 max-w-2xl text-center text-base text-mut sm:text-lg"
        >
          MUTEX is a community archive where study material lives forever. Browse, view and download
          anything — and request what&apos;s missing.
        </Motion.p>

        <Motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
          className="relative mx-auto mt-9 max-w-xl"
        >
          <div className="glow-ring flex items-center gap-2 rounded-2xl border border-line bg-surface p-2 pl-4 transition-colors focus-within:border-accent">
            <Icon name="search" className="shrink-0 text-mut" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search notes, papers, videos…"
              className="w-full bg-transparent py-2 text-sm text-ink outline-none placeholder:text-faint"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-all hover:bg-accent-lo active:scale-95"
            >
              Search
            </button>
          </div>
        </Motion.form>

        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38, ease: EASE }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic className="w-full sm:w-auto">
            <Button to="/subjects" size="lg" className="w-full sm:w-auto" icon={<Icon name="layers" size={17} />}>
              Browse Subjects
            </Button>
          </Magnetic>
          <Magnetic className="w-full sm:w-auto">
            <Button to="/requests" variant="outline" size="lg" className="w-full sm:w-auto" icon={<Icon name="send" size={16} />}>
              Request a Note
            </Button>
          </Magnetic>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <Card key={s.label} className="p-4 text-center">
              <p className="font-display text-2xl font-bold text-gradient sm:text-3xl">
                <CountUp value={s.value} suffix={s.suffix || ""} pad={s.pad || 0} />
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-mut">
                {s.label}
              </p>
            </Card>
          ))}
        </Motion.div>
      </div>
    </section>
  )
}

function Marquee() {
  const items = SUBJECTS.map((s) => s.name)
  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-line bg-base-2 py-4">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-base to-transparent"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-base to-transparent"
      />
      <div className="flex w-max gap-10" style={{ animation: "marquee 30s linear infinite" }}>
        {row.map((name, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-lg font-bold uppercase tracking-widest text-faint">
              {name}
            </span>
            <span className="text-accent">
              <Icon name="zap" size={14} />
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const notes = useNotes()
  const latest = [...notes, ...DOCUMENTS]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4)

  return (
    <>
      <Hero />
      <Marquee />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-accent">
              /explore
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-4xl">
              Featured subjects
            </h2>
          </div>
          <Button to="/subjects" variant="ghost" size="sm" icon={<Icon name="arrowRight" size={15} />}>
            View all
          </Button>
        </Reveal>

        <Stagger gap={0.06} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUBJECTS.slice(0, 8).map((s, i) => (
            <StaggerItem key={s.id} className="h-full">
              <SubjectCard subject={s} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="border-y border-line bg-base-2">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mb-10">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-accent">
              /why
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-4xl">
              Built to be used
            </h2>
          </Reveal>
          <Stagger gap={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <StaggerItem key={f.title} className="h-full">
                <Card hover className="h-full p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent-line bg-accent-soft text-accent">
                    <Icon name={f.icon} size={20} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mut">{f.body}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-accent">
              /latest
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-4xl">
              Fresh uploads
            </h2>
          </div>
          <span className="text-xs text-faint">Updated {formatDate(new Date().toISOString())}</span>
        </Reveal>

        <Stagger gap={0.06} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((d, i) => (
            <StaggerItem key={d.id} className="h-full">
              <DocumentCard doc={d} index={i} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10 text-center">
          <Button to="/subjects" variant="outline" icon={<Icon name="fileText" size={16} />}>
            Explore the full archive
          </Button>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-accent-line bg-accent-soft p-8 sm:p-14">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
              style={{ background: "var(--accent-soft-2)", animation: "float 8s ease-in-out infinite" }}
            />
            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-4xl">
                  Can&apos;t find what you need?
                </h2>
                <p className="mt-2 max-w-xl text-sm text-mut sm:text-base">
                  Submit a request and the archive team will source it — or point you to the exact
                  document that already covers it.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button to="/requests" size="lg" icon={<Icon name="send" size={16} />}>
                  Make a Request
                </Button>
                <Button to="/feedback" variant="outline" size="lg" icon={<Icon name="mail" size={16} />}>
                  Send Feedback
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
