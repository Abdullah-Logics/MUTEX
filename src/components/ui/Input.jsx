export function Input({ label, icon, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      {label && (
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mut">
          {label}
        </span>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mut">
            {icon}
          </span>
        )}
        <input
          className={`w-full rounded-xl border border-line bg-base-2 px-4 py-3 text-sm text-ink placeholder:text-faint outline-none transition-all duration-300 focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent-soft ${
            icon ? "pl-11" : ""
          }`}
          {...props}
        />
      </div>
    </label>
  )
}

export function Textarea({ label, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      {label && (
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mut">
          {label}
        </span>
      )}
      <textarea
        className="w-full rounded-xl border border-line bg-base-2 px-4 py-3 text-sm text-ink placeholder:text-faint outline-none transition-all duration-300 focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent-soft"
        rows={4}
        {...props}
      />
    </label>
  )
}

export function Select({ label, options = [], className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      {label && (
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mut">
          {label}
        </span>
      )}
      <div className="relative">
        <select
          className="w-full appearance-none rounded-xl border border-line bg-base-2 px-4 py-3 pr-10 text-sm text-ink outline-none transition-all duration-300 focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent-soft"
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-mut"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </label>
  )
}
