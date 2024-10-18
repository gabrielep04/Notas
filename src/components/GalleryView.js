import React, { useState } from 'react';
import './GalleryView.css';
import NotePopup from './NotePopUp';
import { FaTrashAlt } from 'react-icons/fa';

const colors = ['color-1', 'color-2', 'color-3', 'color-4'];

const GalleryView = ({ notes, onSave, onSelectNote, onDeleteNote }) => {
  const sortedNotes = [...notes].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  const [selectedNote, setSelectedNote] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

  const handleOpenPopup = (note) => {
    setSelectedNote(note);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedNote(null);
  };

  const truncateTitle = (title) => {
    if (title.length > 40) {
      return title.substring(0, 40) + "...";
    }
    return title;
  };

  return (
    <div className="gallery-wrapper">
      <div className="gallery-container">
        {sortedNotes.map((note, index) => (
          <div
            key={note.id}
            className={`gallery-item ${colors[index % colors.length]}`}
            onClick={() => handleOpenPopup(note)}
            onMouseEnter={() => setHoveredIndex(index)} 
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="gallery-title">{truncateTitle(note.title) || 'Sin título'}</div>
            <div className="gallery-content">{note.content}</div>
            <div className="gallery-date">{formatRelativeDate(note.updated_at)}</div>


            {hoveredIndex === index && (
              <FaTrashAlt
                className="trash-icon-gallery" 
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note.id); 
                }}
              />
            )}
          </div>
        ))}
      </div>

      {isPopupOpen && (
        <NotePopup 
          note={selectedNote} 
          onSave={onSave} 
          onClose={handleClosePopup}
          onDeleteNote={onDeleteNote}
        />
      )}
    </div>
  );
};

export default GalleryView;
