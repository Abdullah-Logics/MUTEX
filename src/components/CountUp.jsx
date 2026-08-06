import { useEffect, useRef } from "react"
import { animate, useInView, useMotionValue, motion as Motion } from "framer-motion"

export default function CountUp({ value, suffix = "", pad = 0, className = "" }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const mv = useMotionValue(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = Math.round(v).toString().padStart(pad, "0") + suffix
        }
      },
    })
    return controls.stop
  }, [inView, mv, value, suffix, pad])

  return (
    <Motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      {"0".padStart(pad, "0") + suffix}
    </Motion.span>
  )
}
