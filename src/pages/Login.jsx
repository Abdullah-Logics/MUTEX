import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion as Motion } from "framer-motion"
import Icon from "../components/Icons.jsx"
import Button from "../components/ui/Button.jsx"
import Card from "../components/ui/Card.jsx"
import Badge from "../components/ui/Badge.jsx"
import { Input } from "../components/ui/Input.jsx"
import Logo from "../components/Logo.jsx"
import { pageTransition, EASE } from "../lib/motion.js"
import { login, isLoggedIn } from "../lib/api.js"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  const canSubmit = email.includes("@") && password.length >= 6 && !busy

  const submit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setBusy(true)
    setError("")
    try {
      await login(email, password)
      navigate("/admin", { replace: true })
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <Motion.div
      {...pageTransition}
      className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-lg flex-col justify-center px-4 py-14 sm:px-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo size={52} withText={false} />
          <h1 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Archive access
          </h1>
          <p className="mt-2 text-sm text-mut">Sign in to manage the MUTEX note archive.</p>
          <Badge tone="accent" className="mt-4">
            <Icon name="shield" size={12} />
            Restricted to the site admin
          </Badge>
        </div>

        <Card className="p-5 sm:p-8">
          <form onSubmit={submit} className="space-y-4">
            <Input
              label="Admin email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Icon name="mail" size={16} />}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Icon name="lock" size={16} />}
            />

            {error && (
              <Motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400"
              >
                <Icon name="lock" size={15} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </Motion.div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={!canSubmit}
              className={`w-full ${!canSubmit ? "opacity-40" : ""}`}
              icon={<Icon name="arrowRight" size={16} />}
            >
              {busy ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </Card>

        <p className="mt-6 text-center text-xs text-faint">
          Only the site administrator can access the command center.
        </p>

        {isLoggedIn() && (
          <button
            onClick={() => navigate("/admin")}
            className="mx-auto mt-4 block text-xs font-semibold text-accent hover:underline"
          >
            Already signed in — continue to admin →
          </button>
        )}
      </Motion.div>
    </Motion.div>
  )
}
