export const ACCENTS = [
  { id: "red", label: "Red", swatch: "#ff2d3f" },
  { id: "pink", label: "Pink", swatch: "#ff5fa8" },
  { id: "blue", label: "Blue", swatch: "#3d8bfd" },
  { id: "green", label: "Green", swatch: "#22c55e" },
  { id: "purple", label: "Purple", swatch: "#a855f7" },
  { id: "yellow", label: "Yellow", swatch: "#f5c518" },
  { id: "orange", label: "Orange", swatch: "#f97316" },
  { id: "teal", label: "Teal", swatch: "#14b8a6" },
]

export const THEMES = [
  { id: "dark", label: "Dark", icon: "moon" },
  { id: "light", label: "Light", icon: "sun" },
]

const KEY = "mutex.prefs"

export function loadPrefs() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY))
    if (raw) {
      return {
        theme: raw.theme === "light" ? "light" : "dark",
        accent: ACCENTS.some((a) => a.id === raw.accent) ? raw.accent : "red",
      }
    }
  } catch {
    /* ignore */
  }
  return { theme: "dark", accent: "red" }
}

export function applyPrefs(theme, accent) {
  const root = document.documentElement
  root.setAttribute("data-theme", theme)
  root.setAttribute("data-accent", accent)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute("content", theme === "dark" ? "#0a0a0a" : "#ffffff")
}
