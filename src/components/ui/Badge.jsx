export default function Badge({ children, tone = "accent", className = "" }) {
  const tones = {
    accent: "bg-accent-soft text-accent border-accent-line",
    neutral: "bg-surface-2 text-mut border-line",
    success: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    warn: "bg-amber-500/12 text-amber-600 dark:text-amber-400 border-amber-500/30",
    danger: "bg-red-500/12 text-red-600 dark:text-red-400 border-red-500/30",
    info: "bg-sky-500/12 text-sky-600 dark:text-sky-400 border-sky-500/30",
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
