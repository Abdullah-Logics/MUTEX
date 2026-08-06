import { useEffect, useMemo, useState, useCallback } from "react"
import { ThemeContext } from "./context.js"
import { ACCENTS, THEMES, loadPrefs, applyPrefs } from "./theme.js"

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => loadPrefs().theme)
  const [accent, setAccentState] = useState(() => loadPrefs().accent)

  useEffect(() => {
    applyPrefs(theme, accent)
  }, [theme, accent])

  const setTheme = useCallback((t) => {
    setThemeState(t)
    localStorage.setItem("mutex.prefs", JSON.stringify({ theme: t, accent }))
  }, [accent])

  const setAccent = useCallback((a) => {
    setAccentState(a)
    localStorage.setItem("mutex.prefs", JSON.stringify({ theme, accent: a }))
  }, [theme])

  const cycleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  const value = useMemo(
    () => ({ theme, accent, setTheme, setAccent, cycleTheme, ACCENTS, THEMES }),
    [theme, accent, setTheme, setAccent, cycleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
