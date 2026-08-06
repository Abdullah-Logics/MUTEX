import { motion as Motion } from "framer-motion"
import Button from "../components/ui/Button.jsx"
import Logo from "../components/Logo.jsx"
import { pageTransition } from "../lib/motion.js"

export default function NotFound() {
  return (
    <Motion.div
      {...pageTransition}
      className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-20 text-center"
    >
      <Logo size={72} withText={false} />
      <h1 className="mt-8 font-display text-7xl font-bold tracking-tight">
        <span className="text-gradient">404</span>
      </h1>
      <p className="mt-3 font-mono text-sm text-mut">
        // this page doesn&apos;t exist in the archive
      </p>
      <Button to="/" className="mt-8">
        Back to home
      </Button>
    </Motion.div>
  )
}
