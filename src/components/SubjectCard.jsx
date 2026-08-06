import { Link } from "react-router-dom"
import { motion as Motion } from "framer-motion"
import Icon from "./Icons.jsx"
import Tilt from "./Tilt.jsx"
import { countDocs, formatDate } from "../data/helpers.js"

export default function SubjectCard({ subject, index = 0 }) {
  const count = subject.docs || countDocs(subject.id)
  return (
    <Motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative h-full"
    >
      <Tilt className="h-full">
        <Link
          to={`/subjects/${subject.id}`}
          className="card-hover relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6"
        >
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent-soft opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative mb-5 flex items-center justify-between">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent-line bg-accent-soft text-accent">
            <Icon name="folder" size={22} />
          </span>
          <span className="font-mono text-[11px] text-faint">0{index + 1}</span>
        </div>
        <h3 className="font-display text-xl font-bold tracking-tight text-ink">{subject.name}</h3>
        <p className="mt-1.5 flex-1 text-sm text-mut">{subject.tagline}</p>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <div className="flex items-center gap-3 text-xs text-faint">
            <span className="flex items-center gap-1">
              <Icon name="fileText" size={13} className="text-accent" />
              {count} docs
            </span>
            <span className="flex items-center gap-1">
              <Icon name="clock" size={13} />
              {formatDate(subject.updated)}
            </span>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-mut transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
            <Icon name="arrowRight" size={15} />
          </span>
        </div>
        </Link>
      </Tilt>
    </Motion.div>
  )
}
