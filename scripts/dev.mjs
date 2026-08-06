import { spawn, execSync } from "node:child_process"
import { fileURLToPath } from "node:url"
import path from "node:path"

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const ENV = { ...process.env, WRANGLER_SEND_METRICS: "false" }

function migrate() {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      execSync("npx wrangler d1 execute mutex-db --local --file=migrations/0001_init.sql", {
        cwd: ROOT,
        stdio: "inherit",
        env: ENV,
      })
      return
    } catch (e) {
      console.error(`Local D1 migration failed (attempt ${attempt}/4): ${e.message}`)
      if (attempt === 4) process.exit(1)
    }
  }
}

migrate()

function run(name, bin, args) {
  const child = spawn(bin, args, {
    cwd: ROOT,
    stdio: "inherit",
    env: ENV,
    shell: process.platform === "win32",
  })
  child.on("exit", (code) => {
    console.log(`[${name}] exited with code ${code}`)
    if (code !== 0) process.exit(code)
  })
  return child
}

const api = run("api", "npx", ["wrangler", "dev", "--port", "8787", "--local"])
const web = run("web", process.execPath, [
  path.join(ROOT, "node_modules", "vite", "bin", "vite.js"),
])

const shutdown = () => {
  api.kill()
  web.kill()
  process.exit(0)
}
process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)
