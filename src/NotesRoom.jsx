import { useEffect, useState } from "react";
import "./NotesRoom.css";

const subjects = [
  "General Biology",
  "Microbiology",
  "Genetics",
  "Botany",
  "Zoology",
  "Ecology",
  "Anatomy",
  "Parasitology",
  "Evolutionary Biology",
  "Biochemistry"
];

function NotesRoom({ onBack }) {
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("lifelab-notes")) || [];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("General Biology");
  const [content, setContent] = useState("");
  const [reference, setReference] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Subjects");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("lifelab-notes", JSON.stringify(notes));
  }, [notes]);

  function clearForm() {
    setTitle("");
    setSubject("General Biology");
    setContent("");
    setReference("");
    setEditingId(null);
  }

  function handleSave(event) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    const newNote = {
      id: editingId || Date.now(),
      title: title.trim(),
      subject: subject,
      content: content.trim(),
      reference: reference.trim(),
      date: new Date().toLocaleDateString()
    };

    if (editingId !== null) {
      setNotes(notes.map(note =>
        note.id === editingId ? newNote : note
      ));
    } else {
      setNotes([newNote, ...notes]);
    }

    clearForm();
  }

  function handleEdit(note) {
    setTitle(note.title);
    setSubject(note.subject);
    setContent(note.content);
    setReference(note.reference || "");
    setEditingId(note.id);
    window.scrollTo(0, 0);
  }

  function handleDelete(id) {
    const confirmed = window.confirm("Delete this note?");

    if (confirmed) {
      setNotes(notes.filter(note => note.id !== id));

      if (editingId === id) {
        clearForm();
      }
    }
  }

  const filteredNotes = notes.filter(note => {
    const matchesSubject =
      filter === "All Subjects" || note.subject === filter;

    const searchText = (
      note.title + " " + note.content + " " + note.subject
    ).toLowerCase();

    const matchesSearch = searchText.includes(search.toLowerCase());

    return matchesSubject && matchesSearch;
  });

  return (
    <main className="notes-page">

      <header className="notes-top">
        <button className="notes-back" onClick={onBack}>
          ← Back to LifeLab
        </button>

        <span className="notes-brand">✳ LifeLab.</span>
      </header>

      <section className="notes-intro">
        <span className="notes-eyebrow">
          YOUR PERSONAL KNOWLEDGE SPACE
        </span>

        <h1>Notes <em>Room.</em></h1>

        <p>
          Keep your Biology notes, research ideas, discoveries,
          and learning materials in one organized space.
        </p>

        <div className="notes-stat">
          <strong>{notes.length}</strong>
          <span>Saved notes</span>
        </div>
      </section>

      <section className="notes-workspace">

        <div className="notes-editor">
          <span className="notes-eyebrow">
            {editingId !== null ? "EDIT YOUR NOTE" : "CREATE SOMETHING NEW"}
          </span>

          <h2>
            {editingId !== null ? "Update your note" : "Write a new note"}
          </h2>

          <form onSubmit={handleSave}>

            <label>Note title</label>
            <input
              type="text"
              value={title}
              onChange={event => setTitle(event.target.value)}
              placeholder="Enter your note title"
              required
            />

            <label>Biology subject</label>
            <select
              value={subject}
              onChange={event => setSubject(event.target.value)}
            >
              {subjects.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <label>Your notes</label>
            <textarea
              value={content}
              onChange={event => setContent(event.target.value)}
              placeholder="Write your definitions, observations, ideas, and discoveries..."
              rows={8}
              required
            />

            <label>Reference link (optional)</label>
            <input
              type="url"
              value={reference}
              onChange={event => setReference(event.target.value)}
              placeholder="https://..."
            />

            <div className="notes-form-actions">
              <button type="submit" className="notes-save">
                {editingId !== null ? "Update Note" : "Save Note"} ↗
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="notes-cancel"
                  onClick={clearForm}
                >
                  Cancel
                </button>
              )}
            </div>

          </form>
        </div>

        <div className="notes-library">

          <div className="notes-library-heading">
            <div>
              <span className="notes-eyebrow">YOUR COLLECTION</span>
              <h2>My Notebook</h2>
            </div>

            <span>{filteredNotes.length} notes</span>
          </div>

          <input
            className="notes-search"
            type="search"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search your notes..."
          />

          <select
            className="notes-filter"
            value={filter}
            onChange={event => setFilter(event.target.value)}
          >
            <option value="All Subjects">All Subjects</option>

            {subjects.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {filteredNotes.length === 0 ? (

            <div className="notes-empty">
              <span>📖</span>
              <h3>Your notebook starts here.</h3>
              <p>
                Create your first note and build your personal
                Biology knowledge library.
              </p>
            </div>

          ) : (

            <div className="notes-list">

              {filteredNotes.map(note => (
                <article className="note-card" key={note.id}>

                  <span className="note-subject">
                    {note.subject}
                  </span>

                  <h3>{note.title}</h3>

                  <p className="note-preview">
                    {note.content}
                  </p>

                  {note.reference && (
                    <a
                      href={note.reference}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Reference ↗
                    </a>
                  )}

                  <span className="note-date">
                    Saved: {note.date}
                  </span>

                  <div className="note-actions">
                    <button onClick={() => handleEdit(note)}>
                      Edit
                    </button>

                    <button onClick={() => handleDelete(note.id)}>
                      Delete
                    </button>
                  </div>

                </article>
              ))}

            </div>

          )}

        </div>
      </section>

      <footer className="notes-footer">
        <span>LifeLab. — Explore. Understand. Discover.</span>
        <span>Your notes are saved in this browser.</span>
      </footer>

    </main>
  );
}

export default NotesRoom;