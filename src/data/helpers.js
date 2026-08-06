import { DOCUMENTS, SUBJECTS } from "./mock.js"

export const FILE_META = {
  pdf: { label: "PDF", icon: "fileText", tone: "accent" },
  md: { label: "Markdown", icon: "fileText", tone: "info" },
  code: { label: "Code", icon: "code", tone: "warn" },
  doc: { label: "Doc", icon: "fileText", tone: "accent" },
  txt: { label: "Text", icon: "fileText", tone: "success" },
  video: { label: "Video", icon: "video", tone: "info" },
  audio: { label: "Audio", icon: "audio", tone: "success" },
  image: { label: "Image", icon: "image", tone: "warn" },
  other: { label: "File", icon: "file", tone: "neutral" },
}

export function typeOf(file) {
  const n = (file.name || "").toLowerCase()
  const t = (file.type || "").toLowerCase()
  if (/\.(md|markdown)$/.test(n)) return "md"
  if (/\.(pdf)$/.test(n)) return "pdf"
  if (t.includes("video") || /\.(mp4|webm|mov|mkv)$/.test(n)) return "video"
  if (t.includes("audio") || /\.(mp3|wav|ogg|m4a)$/.test(n)) return "audio"
  if (t.includes("image") || /\.(png|jpg|jpeg|gif|webp|svg)$/.test(n)) return "image"
  if (/\.(docx?|odt)$/.test(n)) return "doc"
  if (/(\.(js|jsx|ts|tsx|html|css|json|py|java|c|cpp|h|go|rs|rb|php|sh|sql|xml|yaml|yml|toml|ini)$)/.test(n)) return "code"
  return "other"
}

export function fileMeta(type) {
  return FILE_META[type] || FILE_META.other
}

export function formatDate(iso) {
  if (!iso) return ""
  const d = new Date(iso)
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

export function subjectById(id) {
  return SUBJECTS.find((s) => s.id === id) || SUBJECTS.find((s) => s.slug === id)
}

export function docsForSubject(id) {
  const subject = subjectById(id)
  return DOCUMENTS.filter((d) => d.subject === (subject && subject.id))
}

export function countDocs(id) {
  const subject = subjectById(id)
  return subject ? DOCUMENTS.filter((d) => d.subject === subject.id).length : 0
}

export function statTotals() {
  return {
    subjects: SUBJECTS.length,
    docs: DOCUMENTS.length,
    requests: REQUESTS_STUB.length,
  }
}

const REQUESTS_STUB = []
