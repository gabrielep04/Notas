import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import NoteViewer from './components/NoteViewer';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Heading from './components/Heading';
import GalleryView from './components/GalleryView';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);  // Estado para las notas
  const [activeNote, setActiveNote] = useState(null); // La nota seleccionada
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [isRegistering, setIsRegistering] = useState(false); //Estado de registro
  const [viewMode, setViewMode] = useState('list'); // Estado del modo de vista

  // Función para agregar una nota
  const addNote = async (note) => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(note),
    });
    const newNote = await response.json();
    setNotes([...notes, newNote]);
    setActiveNote(newNote);
  };

  // Función para eliminar una nota
  const deleteNote = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/notes/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNotes(notes.filter((note) => note.id !== id));
    setActiveNote(null); // Si borramos la nota activa, deseleccionarla
  };

  // Función para actualizar una nota
  const updateNote = async (updatedNote) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/notes/${updatedNote.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedNote),
    });
    const updated = await response.json();
    setNotes(notes.map((note) => (note.id === updated.id ? updated : note)));
    setActiveNote(updated);
  };

    // Manejar autenticación
    const handleLoginSuccess = async () => {
      setIsAuthenticated(true); // Cambia el estado a autenticado
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/notes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedNotes = await response.json();
      setNotes(fetchedNotes);
      setActiveNote(null);
    };

    //Manejar registro de usuario
    const handleRegisterSuccess = () => {
      setIsRegistering(false);
    };
    
    const handleToggleRegister = () => {
      setIsRegistering(!isRegistering);
    };

    // Manejar cambio de modo de vista
    const handleViewModeChange = (mode) => {
      setViewMode(mode);
    };

    // Verificar si hay un token
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
        handleLoginSuccess();
      }
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setNotes([]);
      setActiveNote(null);
    };

  return (
    <div className="app-container">
    {isAuthenticated ? (
      <>
        <Heading onAddNote={addNote} onLogout={handleLogout} onViewModeChange={handleViewModeChange} />
        {viewMode === 'list' && (
          <>
            <Sidebar notes={notes} activeNote={activeNote} onSelectNote={setActiveNote} onAddNote={addNote} onDeleteNote={deleteNote} onLogout={handleLogout} />
            <NoteViewer note={activeNote} onSave={updateNote} onDelete={deleteNote} />
          </>
        )}
        {viewMode === 'gallery' && (
          <>
            <GalleryView notes={notes} onSelectNote={setActiveNote} />
          </>
        )}
      </>
    ) : (
      isRegistering ? (
        <RegisterForm onToggleRegister={handleToggleRegister} onRegisterSuccess={handleRegisterSuccess} />
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} onToggleRegister={handleToggleRegister} />
      )
    )}
  </div>
);
}

export default App;
