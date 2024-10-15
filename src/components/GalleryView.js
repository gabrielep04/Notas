import React from 'react';
import './GalleryView.css';

const GalleryView = ({ notes }) => {
  const formatDate = (updatedAt) => {
    const updatedDate = new Date(updatedAt);
    const now = new Date();
    const diffMilliseconds = now - updatedDate;
    const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));
    const diffHours = Math.floor(diffMilliseconds / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));

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

  return (
    <div className="gallery-container">
      {notes
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) // Ordenar por la fecha de modificación más reciente
        .map((note) => (
          <div key={note.id} className="gallery-item">
            <div className="gallery-title">{note.title}</div>
            <div className="gallery-content">{note.content}</div>
            <div className="gallery-date">{formatDate(note.updatedAt)}</div>
          </div>
        ))}
    </div>
  );
};

export default GalleryView;
