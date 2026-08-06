import { motion as Motion } from "framer-motion"
import { EASE } from "../lib/motion.js"

export default function StaggeredText({ text, className = "", lineGap = 0 }) {
  const words = text.split(" ")
  return (
    <span
      className={`inline-block ${className}`}
      style={{ perspective: 800 }}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" style={{ marginRight: "0.28em" }}>
          {word.split("").map((ch, ci) => (
            <Motion.span
              key={ci}
              className="inline-block will-change-transform"
              initial={{ opacity: 0, y: "0.55em", rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: lineGap + 0.045 * (wi * 2 + ci),
                duration: 0.55,
                ease: EASE,
              }}
            >
              {ch}
            </Motion.span>
          ))}
        </span>
      ))}
    </span>
  )
}
