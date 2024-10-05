import React from 'react';

function Sidebar({ notes, onSelectNote, onAddNote }) {
  return (
    <div className="sidebar">
      <h2>Notas</h2>
      <button onClick={() => onAddNote({ title: '', content: '' })}>Nueva Nota</button>
      <ul>
        {notes.map(note => (
          <li key={note.id} onClick={() => onSelectNote(note)}>
            {note.title || 'Sin título'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
