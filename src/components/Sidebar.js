import React, { useState, useEffect } from 'react';
import './Sidebar.css'; 

function Sidebar({ notes, activeNote, onSelectNote, onAddNote }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    if (activeNote) {
      const index = notes.findIndex(note => note.id === activeNote.id);
      setSelectedIndex(index); // Actualiza el índice seleccionado si cambia la nota activa
    }
  }, [activeNote, notes]);

  const formatRelativeDate = (date) => {
    const now = new Date();
    const updatedDate = new Date(date);
    const diffMs = now - updatedDate;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
      return `${diffMinutes} minutos`;
    } else if (diffHours < 24) {
      return `${diffHours} horas`;
    } else if (diffDays <= 5) {
      return `${diffDays} días`;
    } else {
      // Mostrar la fecha completa si han pasado más de 5 días
      return updatedDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }
  };

  return (
    <div className="sidebar">
      <h2>Notas</h2>
      <button onClick={() => {
        const newNote = { title: '', content: '' };
        onAddNote(newNote);
        setSelectedIndex(notes.length); // Establece el índice para la nueva nota
      }}>
        Nueva Nota
      </button>
      <ul>
        {notes.map((note, index) => (
          <li 
            key={note.id} 
            className={selectedIndex === index ? "list-group-item active" : "list-group-item"}
            onClick={() => {
              onSelectNote(note);
              setSelectedIndex(index); // Actualizar el índice seleccionado
            }}
          >
            <div>{note.title || 'Sin título'}</div>
            <div className="note-date">{formatRelativeDate(note.updated_at)}</div> {/* Fecha formateada */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
