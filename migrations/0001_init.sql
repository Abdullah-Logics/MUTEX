CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  author TEXT NOT NULL,
  filename TEXT NOT NULL,
  extension TEXT NOT NULL,
  type TEXT NOT NULL,
  mime TEXT NOT NULL,
  size TEXT NOT NULL,
  date TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notes_subject ON notes (subject);
CREATE INDEX IF NOT EXISTS idx_notes_date ON notes (date);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  created_at TEXT NOT NULL
);
