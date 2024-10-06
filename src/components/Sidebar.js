import React, { useState } from 'react';
import './Sidebar.css'; 

function Sidebar({ notes, onSelectNote, onAddNote }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <div className="sidebar">
      <h2>Notas</h2>
      <button onClick={() => onAddNote({ title: '', content: '' })}>Nueva Nota</button>
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
            {note.title || 'Sin título'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
