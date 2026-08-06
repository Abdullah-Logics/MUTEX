export default function Card({ children, className = "", hover = false }) {
  return (
    <div
      className={`rounded-2xl border border-line bg-surface ${hover ? "card-hover" : ""} ${className}`}
    >
      {children}
    </div>
  )
}
