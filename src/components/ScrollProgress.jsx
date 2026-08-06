import { useScroll, useSpring, motion as Motion } from "framer-motion"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <Motion.div
      className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--accent-hi), var(--accent) 50%, var(--accent-lo))",
        boxShadow: "0 0 12px var(--accent)",
      }}
    />
  )
}
