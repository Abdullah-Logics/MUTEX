export const CODE_EXTENSIONS = [
  "js", "jsx", "ts", "tsx", "html", "htm", "css", "scss", "sass", "less", "json", "vue", "svelte",
  "py", "sh", "bash", "zsh", "rb", "php", "pl", "lua", "r", "swift", "m",
  "c", "h", "cpp", "hpp", "cc", "cxx", "cs", "java", "go", "rs", "kt", "kts", "scala", "dart", "zig", "nim", "ex", "exs", "erl", "hs",
  "yaml", "yml", "toml", "ini", "xml", "sql", "graphql", "gql", "asm", "s",
]

export const ALLOWED_EXTENSIONS = [...new Set(["pdf", "md", "markdown", ...CODE_EXTENSIONS])]

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024

export function extOf(filename) {
  const m = /\.([a-z0-9]+)$/i.exec(String(filename || ""))
  return m ? m[1].toLowerCase() : ""
}

export function isAllowed(filename) {
  return ALLOWED_EXTENSIONS.includes(extOf(filename))
}

export function fileTypeOf(filename) {
  const ext = extOf(filename)
  if (ext === "pdf") return "pdf"
  if (ext === "md" || ext === "markdown") return "md"
  if (CODE_EXTENSIONS.includes(ext)) return "code"
  return "other"
}

export function typeLabel(type) {
  return type === "pdf" ? "PDF" : type === "md" ? "Markdown" : type === "code" ? "Code" : type || "File"
}
