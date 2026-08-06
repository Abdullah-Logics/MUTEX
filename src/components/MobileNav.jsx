import { NavLink } from "react-router-dom"
import { motion as Motion } from "framer-motion"
import Icon from "./Icons.jsx"

const ITEMS = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/subjects", label: "Subjects", icon: "layers" },
  { to: "/requests", label: "Requests", icon: "send" },
  { to: "/feedback", label: "Feedback", icon: "mail" },
]

export default function MobileNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-base/90 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-4">
        {ITEMS.map((i) => (
          <NavLink
            key={i.to}
            to={i.to}
            end={i.to === "/"}
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold transition-colors ${
                isActive ? "text-accent" : "text-mut"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="relative flex h-7 w-12 items-center justify-center">
                  {isActive && (
                    <Motion.span
                      layoutId="mobile-nav-pill"
                      className="absolute inset-0 rounded-full bg-accent-soft"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative">
                    <Icon name={i.icon} size={20} />
                  </span>
                </span>
                {i.label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
