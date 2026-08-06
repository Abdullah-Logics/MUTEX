import { motion as Motion } from "framer-motion"
import { Link } from "react-router-dom"
import { SPRING_SOFT } from "../../lib/motion.js"

const SIZES = {
  sm: "px-3.5 py-2 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3.5 text-base gap-2.5",
}

const VARIANTS = {
  primary: "bg-accent text-on-accent hover:bg-accent-lo shadow-[0_8px_30px_-10px_var(--accent)]",
  soft: "bg-accent-soft text-accent hover:bg-accent-soft-2 border border-accent-line",
  ghost: "text-ink hover:bg-surface-2 border border-transparent",
  outline: "border border-line text-ink hover:border-accent-line hover:text-accent",
  danger: "bg-red-500/90 text-white hover:bg-red-600",
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  className = "",
  icon,
  whileTap,
  ...props
}) {
  const cls = `inline-flex items-center justify-center rounded-xl font-semibold transition-colors duration-300 ${SIZES[size]} ${VARIANTS[variant]} ${className}`

  const inner = (
    <>
      {icon}
      {children}
    </>
  )

  if (to) {
    return (
      <Motion.span whileTap={whileTap || { scale: 0.96 }} className="inline-flex">
        <Link to={to} className={cls} {...props}>
          {inner}
        </Link>
      </Motion.span>
    )
  }

  if (href) {
    return (
      <Motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        whileTap={whileTap || { scale: 0.96 }}
        className={cls}
        {...props}
      >
        {inner}
      </Motion.a>
    )
  }

  return (
    <Motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={whileTap || { scale: 0.96 }}
      transition={SPRING_SOFT}
      className={cls}
      {...props}
    >
      {inner}
    </Motion.button>
  )
}
