import { handle } from "../src/worker/api.js"

export default {
  async fetch(request, env) {
    return handle(request, env)
  },
}
