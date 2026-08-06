import { Link } from "react-router-dom"
import { motion as Motion } from "framer-motion"
import Icon from "./Icons.jsx"
import Badge from "./ui/Badge.jsx"
import Tilt from "./Tilt.jsx"
import { fileMeta, formatDate, subjectById } from "../data/helpers.js"

export default function DocumentCard({ doc }) {
  const meta = fileMeta(doc.type)
  const subject = subjectById(doc.subject)

  return (
    <Motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
      }}
      className="group relative"
    >
      <Tilt className="h-full">
      <div className="card-hover flex h-full flex-col rounded-2xl border border-line bg-surface p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-line bg-accent-soft text-accent">
            <Icon name={meta.icon} size={20} />
          </span>
          <Badge tone={meta.tone}>{meta.label}</Badge>
        </div>

        <h3 className="font-display text-[15px] font-semibold leading-snug text-ink">
          {doc.title}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-faint">
          <span className="flex items-center gap-1">
            <Icon name="clock" size={12} />
            {formatDate(doc.date)}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="file" size={12} />
            {doc.size}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="users" size={12} />
            {doc.author}
          </span>
        </div>

        {subject && (
          <Link
            to={`/subjects/${subject.id}`}
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-accent"
          >
            {subject.name}
            <Icon name="arrowRight" size={11} />
          </Link>
        )}

        <div className="mt-auto flex items-center gap-2 pt-5">
          <Link
            to={`/document/${doc.id}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-accent-soft px-3 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-on-accent"
          >
            <Icon name="eye" size={14} />
            View
          </Link>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            aria-label="Download"
            className="inline-flex items-center justify-center rounded-xl border border-line px-3 py-2 text-mut transition-all hover:border-accent hover:text-accent"
          >
            <Icon name="download" size={14} />
          </a>
        </div>
      </div>
      </Tilt>
    </Motion.div>
  )
}
