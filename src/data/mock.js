export const SUBJECTS = [
  { id: "math", slug: "mathematics", name: "Mathematics", tagline: "Calculus, algebra, stats & past papers", icon: "zap", docs: 42, updated: "2026-07-28" },
  { id: "phy", slug: "physics", name: "Physics", tagline: "Mechanics, waves, modern physics & labs", icon: "zap", docs: 36, updated: "2026-07-30" },
  { id: "cs", slug: "computer-science", name: "Computer Science", tagline: "Programming, DSA, databases & OS", icon: "layers", docs: 51, updated: "2026-08-01" },
  { id: "chem", slug: "chemistry", name: "Chemistry", tagline: "Organic, inorganic & physical chem", icon: "zap", docs: 28, updated: "2026-07-22" },
  { id: "eng", slug: "english", name: "English", tagline: "Literature, grammar & writing guides", icon: "fileText", docs: 24, updated: "2026-07-18" },
  { id: "bio", slug: "biology", name: "Biology", tagline: "Cell bio, genetics & ecosystems", icon: "zap", docs: 31, updated: "2026-07-25" },
  { id: "eco", slug: "economics", name: "Economics", tagline: "Micro, macro & past paper sets", icon: "zap", docs: 19, updated: "2026-07-10" },
  { id: "art", slug: "art-design", name: "Art & Design", tagline: "Reference work, portfolios & tutorials", icon: "image", docs: 15, updated: "2026-07-05" },
]

const daysAgo = (n) => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10)

export const DOCUMENTS = [
  { id: "d01", subject: "cs", title: "Data Structures — Complete Handwritten Notes", type: "pdf", size: "4.2 MB", date: daysAgo(2), author: "A. Rahman" },
  { id: "d02", subject: "cs", title: "Operating Systems Midterm Past Paper 2025", type: "pdf", size: "1.8 MB", date: daysAgo(5), author: "MUTEX Board" },
  { id: "d03", subject: "cs", title: "SQL & Database Design — Lecture Series", type: "video", size: "48 min", date: daysAgo(3), author: "Prof. N. Khan" },
  { id: "d04", subject: "cs", title: "Big-O Cheat Sheet — Quick Reference", type: "image", size: "620 KB", date: daysAgo(1), author: "M. Ali" },
  { id: "d05", subject: "math", title: "Calculus I — Chapter 1 to 4 Notes", type: "pdf", size: "6.5 MB", date: daysAgo(4), author: "S. Ahmed" },
  { id: "d06", subject: "math", title: "Probability & Statistics Formula Sheet", type: "pdf", size: "890 KB", date: daysAgo(6), author: "MUTEX Board" },
  { id: "d07", subject: "math", title: "Linear Algebra — Video Crash Course", type: "video", size: "72 min", date: daysAgo(7), author: "Prof. R. Lee" },
  { id: "d08", subject: "phy", title: "Mechanics Past Papers 2019–2024 (Solved)", type: "pdf", size: "9.1 MB", date: daysAgo(3), author: "MUTEX Board" },
  { id: "d09", subject: "phy", title: "Waves & Optics — Audio Summary", type: "audio", size: "21 min", date: daysAgo(8), author: "F. Hussain" },
  { id: "d10", subject: "chem", title: "Organic Chemistry Reaction Maps", type: "image", size: "2.3 MB", date: daysAgo(9), author: "L. Chen" },
  { id: "d11", subject: "eng", title: "Essay Writing — Structure & Samples", type: "pdf", size: "3.1 MB", date: daysAgo(2), author: "MUTEX Board" },
  { id: "d12", subject: "bio", title: "Genetics — Exam Notes & Diagrams", type: "pdf", size: "5.4 MB", date: daysAgo(4), author: "D. Patel" },
]

export const REQUESTS = [
  { id: "r01", subject: "cs", title: "Compiler Design complete notes", detail: "Looking for full course notes on compilers, especially parsing and code generation chapters.", by: "Guest", date: daysAgo(1), status: "open" },
  { id: "r02", subject: "math", title: "Differential Equations past papers", detail: "Need solved past papers for the last 5 years.", by: "Guest", date: daysAgo(2), status: "fulfilled" },
  { id: "r03", subject: "phy", title: "Quantum Physics lecture recordings", detail: "Any audio/video lectures on quantum topics would help a lot.", by: "Guest", date: daysAgo(3), status: "redirected" },
  { id: "r04", subject: "eco", title: "Macroeconomics graph summary", detail: "A single-page summary of all key graphs would be amazing.", by: "Guest", date: daysAgo(4), status: "open" },
  { id: "r05", subject: "cs", title: "DSA assignment solutions walkthrough", detail: "Walkthrough videos for common assignment problems.", by: "Guest", date: daysAgo(5), status: "closed" },
]

export const FEEDBACK = [
  { id: "f01", by: "Guest", date: daysAgo(1), body: "The video lectures are super clear. Would love more." },
  { id: "f02", by: "Guest", date: daysAgo(3), body: "Search works great on mobile now!" },
  { id: "f03", by: "Guest", date: daysAgo(6), body: "Add more past papers for English literature." },
]

export const EDITORS = [
  { id: "e01", name: "A. Rahman", email: "rahman@example.com", subjects: ["cs", "math"], created: "2026-06-12", active: true },
  { id: "e02", name: "L. Chen", email: "chen@example.com", subjects: ["chem"], created: "2026-07-01", active: true },
  { id: "e03", name: "D. Patel", email: "patel@example.com", subjects: ["bio"], created: "2026-05-20", active: false },
]
