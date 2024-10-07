import React, { useEffect, useState } from 'react';

function NoteViewer({ note, onSave, onDelete }) {
  const [currentNote, setCurrentNote] = useState(note || { title: '', content: '', updated_at: new Date() });

  useEffect(() => {
    if (note) {
      setCurrentNote(note);
    }
  }, [note]);

  const handleContentChange = (field, value) => {
    if (!currentNote) return; 
    const updatedNote = { ...currentNote, [field]: value, updated_at: new Date() };
    setCurrentNote(updatedNote);
    onSave(updatedNote);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!note) {
    return (
      <div className="message-viewer">
        <h3>Selecciona una nota para ver su contenido</h3>
      </div>
    );
  }

  return (
    <div className="note-viewer">
      <input
        type="text"
        value={currentNote.title}
        onChange={(e) => handleContentChange('title', e.target.value)}
        placeholder="Escribe el título aquí"
      />
      <textarea
        value={currentNote.content}
        onChange={(e) => handleContentChange('content', e.target.value)}
        placeholder="Escribe la nota aquí"
      />
      <p>Última modificación: {formatDate(currentNote.updated_at)}</p>
      <button onClick={() => onDelete(note.id)}>Eliminar</button>
    </div>
  );
}

export default NoteViewer;
