import React, { useState, useEffect } from 'react';
import './Sidebar.css'; 
import { FaTrashAlt } from 'react-icons/fa';

function Sidebar({ notes, activeNote, onSelectNote, onAddNote, onDeleteNote }) {
  const [hoveredIndex, setHoveredIndex] = useState(null); 

  useEffect(() => {
    setHoveredIndex(null);
  }, [activeNote]);

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
      return updatedDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }
  };

  const sortedNotes = [...notes].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  return (
    <div className="sidebar">
      <h2>Notas</h2>
      <button onClick={() => {
        const newNote = { title: '', content: '' };
        onAddNote(newNote);
      }}>
        Nueva Nota
      </button>
      <ul className="notes-list">
        {sortedNotes.map((note, index) => (
          <li 
            key={note.id} 
            className={activeNote && activeNote.id === note.id ? "list-group-item active" : "list-group-item"}
            onMouseEnter={() => setHoveredIndex(index)} 
            onMouseLeave={() => setHoveredIndex(null)}  
            onClick={() => onSelectNote(note)} 
          >
            <div className="note-content">
              <div>{note.title || 'Sin título'}</div>
              <div className="note-date">{formatRelativeDate(note.updated_at)}</div>
            </div>

            {hoveredIndex === index && (
              <FaTrashAlt 
                className="trash-icon" 
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note.id);
                }} 
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
