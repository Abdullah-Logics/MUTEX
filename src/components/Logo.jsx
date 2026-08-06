import { motion as Motion } from "framer-motion"

export default function Logo({ size = 34, withText = true, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <Motion.svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Motion.rect
          x="4"
          y="4"
          width="56"
          height="56"
          rx="14"
          fill="var(--surface)"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
          }}
        />
        <Motion.rect
          x="4"
          y="4"
          width="56"
          height="56"
          rx="14"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          variants={{
            hidden: { pathLength: 0 },
            show: { pathLength: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
          }}
        />
        <Motion.path
          d="M18 44 V20 L32 34 L46 20 V44"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0 },
            show: { pathLength: 1, transition: { duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        />
      </Motion.svg>
      {withText && (
        <span className="font-mono font-bold tracking-[0.18em] text-xl leading-none">
          <span className="text-gradient">MUT</span>
          <span>EX</span>
        </span>
      )}
    </span>
  )
}
