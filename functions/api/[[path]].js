import { handle } from "../../src/worker/api.js"

export async function onRequest(ctx) {
  return handle(ctx.request, ctx.env)
}
