import { useState } from "react"
import { motion as Motion } from "framer-motion"
import Icon from "../components/Icons.jsx"
import Button from "../components/ui/Button.jsx"
import Badge from "../components/ui/Badge.jsx"
import Card from "../components/ui/Card.jsx"
import { Input, Textarea, Select } from "../components/ui/Input.jsx"
import Modal from "../components/ui/Modal.jsx"
import { Reveal, Stagger, StaggerItem } from "../components/Reveal.jsx"
import { REQUESTS, SUBJECTS } from "../data/mock.js"
import { subjectById, formatDate } from "../data/helpers.js"
import { pageTransition } from "../lib/motion.js"

const STATUS = {
  open: { label: "Open", tone: "warn" },
  fulfilled: { label: "Fulfilled", tone: "success" },
  redirected: { label: "Redirected", tone: "info" },
  closed: { label: "Closed", tone: "neutral" },
}

export default function Requests() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ subject: "", title: "", detail: "" })
  const [sent, setSent] = useState(false)

  const canSubmit = form.subject && form.title.trim().length > 2

  const submit = (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setSent(true)
    setOpen(false)
    setTimeout(() => setSent(false), 3200)
  }

  return (
    <Motion.div {...pageTransition} className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Reveal>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-accent">
          /requests
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-5xl">
          Request a note
        </h1>
        <p className="mt-3 max-w-xl text-mut">
          Can&apos;t find the material you need? Submit a request — the archive admins are notified
          and will fulfill, redirect, or respond to it.
        </p>
        <Button onClick={() => setOpen(true)} className="mt-6" icon={<Icon name="plus" size={16} />}>
          New Request
        </Button>
      </Reveal>

      <div className="mt-12">
        <Stagger gap={0.05} className="space-y-4">
          {REQUESTS.map((r) => {
            const st = STATUS[r.status]
            const sub = subjectById(r.subject)
            return (
              <StaggerItem key={r.id}>
                <Card hover className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone={st.tone}>{st.label}</Badge>
                        <span className="font-mono text-[11px] uppercase tracking-wide text-faint">
                          {sub?.name}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-lg font-bold leading-snug">{r.title}</h3>
                      <p className="mt-1.5 max-w-2xl text-sm text-mut">{r.detail}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5 text-xs text-faint">
                      <Icon name="clock" size={13} />
                      {formatDate(r.date)}
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Submit a request">
        <form onSubmit={submit} className="space-y-4">
          <Select
            label="Subject"
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            options={[
              { value: "", label: "Choose a subject…" },
              ...SUBJECTS.map((s) => ({ value: s.id, label: s.name })),
            ]}
          />
          <Input
            label="What do you need?"
            placeholder="e.g. Solved past papers 2019–2024"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
          <Textarea
            label="Details"
            placeholder="Describe what you're looking for — chapters, years, format…"
            value={form.detail}
            onChange={(e) => setForm((f) => ({ ...f, detail: e.target.value }))}
          />
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-faint">Admins will be notified immediately.</p>
            <Button type="submit" disabled={!canSubmit} className={!canSubmit ? "opacity-40" : ""}>
              Send Request
            </Button>
          </div>
        </form>
      </Modal>

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
            <p className="text-sm font-semibold text-ink">Request sent</p>
            <p className="text-xs text-mut">The archive team has been notified.</p>
          </div>
        </Motion.div>
      )}
    </Motion.div>
  )
}
