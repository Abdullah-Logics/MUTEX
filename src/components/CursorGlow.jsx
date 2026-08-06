import { useEffect, useState } from "react"
import { motion as Motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false)
  const mx = useMotionValue(-600)
  const my = useMotionValue(-600)
  const sx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.6 })
  const x = useTransform(sx, (v) => v - 280)
  const y = useTransform(sy, (v) => v - 280)

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)")
    setEnabled(mq.matches)
    const onMove = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [mx, my])

  if (!enabled) return null

  return (
    <Motion.div
      className="pointer-events-none fixed left-0 top-0 z-[2] h-[560px] w-[560px] rounded-full"
      style={{
        x,
        y,
        background: "radial-gradient(circle, var(--accent-soft) 0%, var(--accent-soft-2) 32%, transparent 62%)",
      }}
      aria-hidden="true"
    />
  )
}
