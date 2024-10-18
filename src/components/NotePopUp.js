import React, { useState, useEffect } from 'react';
import './NotePopUp.css';
import { FaTrashAlt } from 'react-icons/fa';

function NotePopup({ note, onSave, onClose, onDeleteNote }) {
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

  const handleClose = () => {
    if (currentNote.title.trim() === '' && currentNote.content.trim() === '') {
      onDeleteNote(currentNote.id);
    }
    onClose();
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
          maxLength={50}
        />
        <textarea
          className="popup-textarea"
          value={currentNote.content}
          onChange={(e) => handleContentChange('content', e.target.value)}
          placeholder="Escribe la nota aquí"
          maxLength={50000}
        />

          <div className="popup-footer">
          <FaTrashAlt
            className="trash-icon-gallery"
            onClick={(e) => {
              e.stopPropagation();
              if (note?.id) {
                onDeleteNote(note.id);
              }
              onClose();
            }}
          />
        <button className="popup-close-button" onClick={handleClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default NotePopup;
