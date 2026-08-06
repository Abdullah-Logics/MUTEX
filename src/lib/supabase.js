import { createClient } from "@supabase/supabase-js"

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && anonKey ? createClient(url, anonKey) : null

export const isBackend = Boolean(supabase)

export async function getPublicDocuments() {
  if (!isBackend) return []
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("public", true)
    .order("created_at", { ascending: false })
  if (error) throw error
  return data
}

export async function getPublicSubjects() {
  if (!isBackend) return []
  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .eq("public", true)
    .order("name")
  if (error) throw error
  return data
}

export async function submitRequest({ subjectId, title, detail }) {
  if (!isBackend) throw new Error("Backend not connected")
  const { error } = await supabase.from("requests").insert({ subject_id: subjectId, title, detail })
  if (error) throw error
}

export async function submitFeedback(body) {
  if (!isBackend) throw new Error("Backend not connected")
  const { error } = await supabase.from("feedback").insert({ body })
  if (error) throw error
}
