import React, { useState, useEffect } from 'react';
import './NotePopUp.css';

function NotePopup({ note, onSave, onClose }) {
  const [currentNote, setCurrentNote] = useState(note || { title: '', content: '' });

  useEffect(() => {
    if (note) {
      setCurrentNote(note);
    }
  }, [note]);

  const handleContentChange = (field, value) => {
    const updatedNote = { ...currentNote, [field]: value, updated_at: new Date() };
    setCurrentNote(updatedNote);
    if (onSave) {
      onSave(updatedNote);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <input
          className="popup-title"
          type="text"
          value={currentNote.title}
          onChange={(e) => handleContentChange('title', e.target.value)}
          placeholder="Escribe el título aquí"
        />
        <textarea
          className="popup-textarea"
          value={currentNote.content}
          onChange={(e) => handleContentChange('content', e.target.value)}
          placeholder="Escribe la nota aquí"
        />
        <button className="popup-close-button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default NotePopup;
