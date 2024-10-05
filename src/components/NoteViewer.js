import React, { useState } from 'react';
import NoteForm from './NoteForm';

function NoteViewer({ note, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  if (!note) {
    return <p>Selecciona una nota para ver su contenido</p>;
  }

  return (
    <div className="note-viewer">
      {isEditing ? (
        <NoteForm note={note} onSave={(updatedNote) => { onSave(updatedNote); setIsEditing(false); }} />
      ) : (
        <>
          <h2>{note.title || 'Sin título'}</h2>
          <p>{note.content}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={() => onDelete(note.id)}>Eliminar</button>
        </>
      )}
    </div>
  );
}

export default NoteViewer;
