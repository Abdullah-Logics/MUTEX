import { AnimatePresence, motion as Motion } from "framer-motion"
import { useEffect } from "react"
import { createPortal } from "react-dom"
import Icon from "../Icons.jsx"

export default function Modal({ open, onClose, title, children, className = "" }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <Motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <Motion.div
            className={`relative w-full max-w-lg max-h-[min(640px,90dvh)] overflow-y-auto rounded-t-3xl border border-line bg-surface p-5 shadow-2xl overscroll-contain sm:max-h-[85vh] sm:rounded-3xl sm:p-6 ${className}`}
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-mut transition-colors hover:bg-surface-2 hover:text-ink"
                aria-label="Close"
              >
                <Icon name="close" />
              </button>
            </div>
            {children}
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
