import { useState } from "react"
import { AnimatePresence, motion as Motion } from "framer-motion"
import { useTheme } from "../theme/useTheme.js"
import Icon from "./Icons.jsx"

export default function ThemeSwitcher({ align = "right" }) {
  const { theme, setTheme, accent, setAccent, ACCENTS } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <div className="flex items-center gap-1 rounded-full border border-line bg-base-2 p-1">
        <button
          onClick={() => setTheme("dark")}
          aria-label="Dark mode"
          className={`relative rounded-full p-2 transition-colors ${
            theme === "dark" ? "text-accent" : "text-mut hover:text-ink"
          }`}
        >
          {theme === "dark" && (
            <Motion.span
              layoutId="theme-pill"
              className="absolute inset-0 rounded-full bg-accent-soft"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative">
            <Icon name="moon" size={17} />
          </span>
        </button>
        <button
          onClick={() => setTheme("light")}
          aria-label="Light mode"
          className={`relative rounded-full p-2 transition-colors ${
            theme === "light" ? "text-accent" : "text-mut hover:text-ink"
          }`}
        >
          {theme === "light" && (
            <Motion.span
              layoutId="theme-pill"
              className="absolute inset-0 rounded-full bg-accent-soft"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative">
            <Icon name="sun" size={17} />
          </span>
        </button>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Pick accent color"
          className="mt-1 flex w-full items-center justify-between gap-2 rounded-full border border-line bg-base-2 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-mut transition-colors hover:text-accent"
        >
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-3.5 w-3.5 rounded-full ring-2 ring-line"
              style={{ background: ACCENTS.find((a) => a.id === accent)?.swatch }}
            />
            Accent
          </span>
          <Icon name={open ? "close" : "palette"} size={14} />
        </button>

        <AnimatePresence>
          {open && (
            <Motion.div
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className={`absolute top-full z-50 mt-2 w-56 rounded-2xl border border-line bg-surface p-3 shadow-2xl ${
                align === "left" ? "left-0" : "right-0"
              }`}
            >
              <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-widest text-faint">
                Accent color
              </p>
              <div className="grid grid-cols-4 gap-2">
                {ACCENTS.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setAccent(a.id)
                      setOpen(false)
                    }}
                    className="group flex flex-col items-center gap-1.5 rounded-xl p-2 transition-colors hover:bg-base-2"
                    aria-label={a.label}
                  >
                    <span
                      className="relative h-7 w-7 rounded-full transition-transform group-hover:scale-110"
                      style={{
                        background: a.swatch,
                        boxShadow: accent === a.id ? `0 0 0 2px var(--base), 0 0 0 4px ${a.swatch}` : "none",
                      }}
                    />
                    <span
                      className={`text-[9px] font-semibold uppercase tracking-wide ${
                        accent === a.id ? "text-accent" : "text-mut"
                      }`}
                    >
                      {a.label}
                    </span>
                  </button>
                ))}
              </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
