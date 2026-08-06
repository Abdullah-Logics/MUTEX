import { useEffect, useState } from "react"
import { getNotes, createNote, deleteNote } from "./api.js"

let notes = []
let loaded = false
const listeners = new Set()

function emit() {
  listeners.forEach((fn) => fn(notes))
}

export const notesStore = {
  subscribe(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
  get() {
    return notes
  },
  async load(force = false) {
    if (loaded && !force) return notes
    notes = await getNotes()
    loaded = true
    emit()
    return notes
  },
  async add(payload) {
    const note = await createNote(payload)
    notes = [note, ...notes.filter((n) => n.id !== note.id)]
    loaded = true
    emit()
    return note
  },
  async remove(id) {
    await deleteNote(id)
    notes = notes.filter((n) => n.id !== id)
    emit()
  },
}

export function useNotes() {
  const [value, setValue] = useState(notesStore.get())
  useEffect(() => {
    let active = true
    notesStore
      .load()
      .then(() => active && setValue(notesStore.get()))
      .catch(() => {})
    const unsub = notesStore.subscribe(setValue)
    return () => {
      active = false
      unsub()
    }
  }, [])
  return value
}
