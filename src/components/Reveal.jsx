import { motion as Motion } from "framer-motion"
import { fadeUp, stagger } from "../lib/motion.js"

export function Reveal({ children, className, delay = 0, as = "div" }) {
  const Comp = Motion[as] || Motion.div
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      custom={delay}
      transition={{ delay }}
    >
      {children}
    </Comp>
  )
}

export function Stagger({ children, className, delay = 0, gap = 0.08 }) {
  return (
    <Motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={stagger(delay, gap)}
    >
      {children}
    </Motion.div>
  )
}

export function StaggerItem({ children, className }) {
  return (
    <Motion.div className={className} variants={fadeUp}>
      {children}
    </Motion.div>
  )
}
