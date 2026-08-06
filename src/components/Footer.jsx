import { Link } from "react-router-dom"
import Logo from "./Logo.jsx"
import Icon from "./Icons.jsx"

const SECTIONS = [
  { title: "Browse", links: [["Home", "/"], ["Subjects", "/subjects"], ["Requests", "/requests"], ["Feedback", "/feedback"]] },
  { title: "Access", links: [["Admin Login", "/login"], ["Submit a Request", "/requests"], ["Send Feedback", "/feedback"]] },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-base-2">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo size={38} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mut">
            A curated archive of notes, past papers, documents, videos and audio — free to browse and
            download. Managed by a dedicated team, unlocked for everyone.
          </p>
          <div className="mt-5 flex items-center gap-2 text-xs text-faint">
            <Icon name="lock" size={14} className="text-accent" />
            <span>Secure access · role-based management</span>
          </div>
        </div>

        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              {s.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {s.links.map(([label, to]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="group inline-flex items-center gap-1 text-sm text-mut transition-colors hover:text-ink"
                  >
                    {label}
                    <Icon
                      name="arrowRight"
                      size={13}
                      className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-faint sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} MUTEX Archive. All rights reserved.</span>
          <span className="font-mono">
            <span className="text-accent">mutex</span>
            <span className="animate-blink">_</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
