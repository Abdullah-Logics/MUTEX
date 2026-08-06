import { useEffect, useState } from "react"
import { AnimatePresence, motion as Motion } from "framer-motion"
import Icon from "./Icons.jsx"

export default function ScrollTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const on = () => setShow(window.scrollY > 700)
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <Motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-24 right-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-accent text-on-accent shadow-[0_10px_30px_-10px_var(--accent)] md:bottom-8 md:right-8"
          aria-label="Back to top"
        >
          <Icon name="arrowRight" size={20} className="rotate-[-90deg]" />
        </Motion.button>
      )}
    </AnimatePresence>
  )
}
