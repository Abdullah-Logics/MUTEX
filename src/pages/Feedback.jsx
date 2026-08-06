import { useState } from "react"
import { motion as Motion } from "framer-motion"
import Icon from "../components/Icons.jsx"
import Button from "../components/ui/Button.jsx"
import Card from "../components/ui/Card.jsx"
import { Textarea } from "../components/ui/Input.jsx"
import { Reveal, Stagger, StaggerItem } from "../components/Reveal.jsx"
import { FEEDBACK } from "../data/mock.js"
import { formatDate } from "../data/helpers.js"
import { pageTransition } from "../lib/motion.js"

export default function Feedback() {
  const [body, setBody] = useState("")
  const [sent, setSent] = useState(false)

  const canSend = body.trim().length > 4

  const submit = (e) => {
    e.preventDefault()
    if (!canSend) return
    setSent(true)
    setBody("")
    setTimeout(() => setSent(false), 3200)
  }

  return (
    <Motion.div {...pageTransition} className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <Reveal>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-accent">
          /feedback
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Tell us what you think
        </h1>
        <p className="mt-3 max-w-xl text-mut">
          Praise, bugs, ideas — every message is read by the admins and shapes the archive.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <Card className="p-6 sm:p-8">
            <form onSubmit={submit} className="space-y-4">
              <Textarea
                label="Your feedback"
                rows={5}
                placeholder="What's on your mind?…"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-center gap-2 text-xs text-faint">
                  <Icon name="shield" size={13} className="text-accent" />
                  Sent anonymously — no account needed
                </span>
                <Button type="submit" disabled={!canSend} className={!canSend ? "opacity-40" : ""}>
                  Send Feedback
                </Button>
              </div>
            </form>
          </Card>
        </Reveal>

        <div>
          <Reveal delay={0.08}>
            <h2 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.25em] text-mut">
              Recent feedback
            </h2>
          </Reveal>
          <Stagger gap={0.06} className="space-y-4">
            {FEEDBACK.map((f) => (
              <StaggerItem key={f.id}>
                <Card hover className="p-5">
                  <div className="flex items-center gap-2 text-xs text-faint">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-[10px] font-bold text-accent">
                      {f.by.slice(0, 1)}
                    </span>
                    <span className="font-medium text-mut">{f.by}</span>
                    <span>·</span>
                    <span>{formatDate(f.date)}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink">{f.body}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      {sent && (
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 right-4 z-[95] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl border border-accent-line bg-surface px-5 py-4 shadow-2xl sm:bottom-6 sm:right-6"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
            <Icon name="check" size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">Feedback sent</p>
            <p className="text-xs text-mut">Thanks for helping improve MUTEX.</p>
          </div>
        </Motion.div>
      )}
    </Motion.div>
  )
}
