import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import NoteViewer from './components/NoteViewer';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);  // Estado para las notas
  const [activeNote, setActiveNote] = useState(null); // La nota seleccionada
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

  // Función para agregar una nota
  const addNote = (note) => {
    setNotes([...notes, { ...note, id: Date.now() }]);
  };

  // Función para eliminar una nota
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    setActiveNote(null); // Si borramos la nota activa, deseleccionarla
  };

  // Función para actualizar una nota
  const updateNote = (updatedNote) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
  };

    // Manejar autenticación
    const handleLoginSuccess = () => {
      setIsAuthenticated(true); // Cambia el estado a autenticado
    };

  return (
    <div className="app-container">
      {!isAuthenticated ? ( // Si no está autenticado, muestra el formulario de login
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        // Si está autenticado, muestra las notas
      <>
      <Sidebar notes={notes} onSelectNote={setActiveNote} onAddNote={addNote} />
      <NoteViewer
        note={activeNote}
        onSave={updateNote}
        onDelete={deleteNote}
      />
    </>
    )}
    </div>
  );
}

export default App;
