import { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { AnimatePresence, motion as Motion } from "framer-motion"
import Logo from "./Logo.jsx"
import Icon from "./Icons.jsx"
import ThemeSwitcher from "./ThemeSwitcher.jsx"
import Button from "./ui/Button.jsx"

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/subjects", label: "Subjects" },
  { to: "/requests", label: "Requests" },
  { to: "/feedback", label: "Feedback" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-[80]" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="glass border-b border-line/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center" aria-label="MUTEX home">
            <Logo size={34} />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-accent" : "text-mut hover:text-ink"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <Motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ThemeSwitcher />
            </div>
            <div className="hidden md:block">
              <Button to="/login" variant="soft" size="sm" icon={<Icon name="shield" size={15} />}>
                Admin
              </Button>
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-xl border border-line p-2 text-ink md:hidden"
              aria-label="Menu"
            >
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[-1] bg-base/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col justify-center gap-2 px-8">
              {LINKS.map((l, i) => (
                <Motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 font-display text-4xl font-bold tracking-tight transition-colors ${
                        isActive ? "text-gradient" : "text-ink hover:text-accent"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </Motion.div>
              ))}
              <Motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex items-center gap-4"
              >
                <div className="sm:hidden">
                  <ThemeSwitcher />
                </div>
                <Button to="/login" onClick={() => setOpen(false)} icon={<Icon name="shield" size={15} />}>
                  Admin Login
                </Button>
              </Motion.div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
