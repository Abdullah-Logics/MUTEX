import Icon from "./Icons.jsx"

export default function EmptyState({ icon = "fileText", title, body, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-surface/50 px-6 py-16 text-center">
      <span className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-accent-line bg-accent-soft text-accent">
        <Icon name={icon} size={28} />
      </span>
      <h3 className="font-display text-xl font-bold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-mut">{body}</p>
      {action}
    </div>
  )
}
