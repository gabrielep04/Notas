import React, { useState } from 'react';
import './GalleryView.css';
import NotePopup from './NotePopUp';

const colors = ['color-1', 'color-2', 'color-3', 'color-4'];

const GalleryView = ({ notes, onSave }) => {
  const sortedNotes = [...notes].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  const formatRelativeDate = (updatedDate) => {
    const now = new Date();
    const diffMilliseconds = now - new Date(updatedDate);
    const diffMinutes = Math.floor(diffMilliseconds / 1000 / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 60) {
      return `${diffMinutes} minutos`;
    } else if (diffHours < 24) {
      return `${diffHours} horas`;
    } else if (diffDays <= 5) {
      return `${diffDays} días`;
    } else {
      return new Date(updatedDate).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }
  };

  // Estados para manejar el popup
  const [selectedNote, setSelectedNote] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Función para abrir el popup
  const handleOpenPopup = (note) => {
    setSelectedNote(note);
    setIsPopupOpen(true);
  };

  // Función para cerrar el popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedNote(null);
  };

  // Función para guardar la nota
  const handleSaveNote = (note) => {
    onSave(note); // Guarda la nota
    handleClosePopup(); // Cierra el popup después de guardar
  };

  return (
    <div className="gallery-wrapper">
      <div className="gallery-container">
        {sortedNotes.map((note, index) => (
          <div
            key={note.id}
            className={`gallery-item ${colors[index % colors.length]}`}
            onClick={() => handleOpenPopup(note)} // Al hacer clic en la nota, abre el popup
          >
            <div className="gallery-title">{note.title || 'Sin título'}</div>
            <div className="gallery-content">{note.content}</div>
            <div className="gallery-date">{formatRelativeDate(note.updated_at)}</div>
          </div>
        ))}
      </div>

      {/* Popup para crear o editar notas */}
      {isPopupOpen && (
        <NotePopup 
          note={selectedNote} 
          onSave={handleSaveNote} 
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default GalleryView;
