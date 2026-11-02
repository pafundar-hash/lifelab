import { useEffect, useState } from 'react'

const subjects = [
  'All Notes',
  'Microbiology',
  'Genetics',
  'Ecology',
  'Botany',
  'Zoology',
  'Anatomy',
  'Evolutionary Biology',
  'Research Drafts',
  'Personal Notes'
]

function NotesRoom() {
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lifelab-notes')) || []
    } catch {
      return []
    }
  })

  const [activeSubject, setActiveSubject] = useState('All Notes')
  const [search, setSearch] = useState('')
  const [activeNote, setActiveNote] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [subject, setSubject] = useState('Microbiology')

  useEffect(() => {
    localStorage.setItem('lifelab-notes', JSON.stringify(notes))
  }, [notes])

  const filteredNotes = notes.filter(note => {
    const matchesSubject =
      activeSubject === 'All Notes' || note.subject === activeSubject

    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())

    return matchesSubject && matchesSearch
  })

  function createNote() {
    setActiveNote(null)
    setTitle('')
    setContent('')
    setSubject(
      activeSubject === 'All Notes' ? 'Microbiology' : activeSubject
    )
  }

  function saveNote() {
    if (!title.trim() || !content.trim()) {
      alert('Please enter a title and some content.')
      return
    }

    if (activeNote !== null) {
      setNotes(notes.map(note =>
        note.id === activeNote
          ? { ...note, title, content, subject, updatedAt: Date.now() }
          : note
      ))
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
        subject,
        updatedAt: Date.now()
      }

      setNotes([newNote, ...notes])
      setActiveNote(newNote.id)
    }
  }

  function openNote(note) {
    setActiveNote(note.id)
    setTitle(note.title)
    setContent(note.content)
    setSubject(note.subject || 'Personal Notes')
  }

  function deleteNote(id) {
    if (!window.confirm('Delete this note?')) return

    setNotes(notes.filter(note => note.id !== id))

    if (activeNote === id) {
      createNote()
    }
  }

  return (
    <main className="notes-layout">
      <aside className="notes-sidebar">
        <div className="notes-brand">✳ LifeLab.</div>

        <p className="notes-sidebar-label">YOUR WORKSPACE</p>

        {subjects.map(item => (
          <button
            key={item}
            className={`subject-button ${activeSubject === item ? 'active' : ''}`}
            onClick={() => {
              setActiveSubject(item)
              setActiveNote(null)
              setTitle('')
              setContent('')
            }}
          >
            <span>{item === 'All Notes' ? '📚' : '📁'}</span>
            {item}
            {item === 'All Notes' && (
              <span className="subject-count">{notes.length}</span>
            )}
          </button>
        ))}

        <div className="notes-sidebar-footer">
          Explore. Understand. Discover.
        </div>
      </aside>

      <section className="notes-main">
        <div className="notes-header">
          <div>
            <span className="notes-eyebrow">YOUR DIGITAL NOTEBOOK</span>
            <h1>{activeSubject}</h1>
            <p>Collect your thoughts. Organize your discoveries.</p>
          </div>

          <button className="new-note-button" onClick={createNote}>
            + New Note
          </button>
        </div>

        <input
          className="notes-search"
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="Search your notes..."
        />

        <div className="notes-workspace">
          <div className="notes-list">
            <h3>MY NOTES ({filteredNotes.length})</h3>

            {filteredNotes.length === 0 ? (
              <p className="notes-empty">
                No notes here yet. Create your first note!
              </p>
            ) : (
              filteredNotes.map(note => (
                <button
                  key={note.id}
                  className={`note-list-item ${activeNote === note.id ? 'selected' : ''}`}
                  onClick={() => openNote(note)}
                >
                  <strong>{note.title}</strong>
                  <span>{note.subject}</span>
                  <small>
                    {new Date(note.updatedAt || note.id).toLocaleDateString()}
                  </small>
                </button>
              ))
            )}
          </div>

          <div className="note-editor">
            <div className="editor-top">
              <span>{activeNote ? 'EDITING NOTE' : 'NEW NOTE'}</span>

              {activeNote !== null && (
                <button
                  className="delete-note-button"
                  onClick={() => deleteNote(activeNote)}
                >
                  Delete
                </button>
              )}
            </div>

            <input
              className="note-title-input"
              value={title}
              onChange={event => setTitle(event.target.value)}
              placeholder="Untitled note..."
            />

            <select
              className="note-subject-select"
              value={subject}
              onChange={event => setSubject(event.target.value)}
            >
              {subjects.filter(item => item !== 'All Notes').map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <textarea
              className="note-content-input"
              value={content}
              onChange={event => setContent(event.target.value)}
              placeholder="Start writing your Biology notes here..."
            />

            <button className="save-note-button" onClick={saveNote}>
              Save Note
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default NotesRoom