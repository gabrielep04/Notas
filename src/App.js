import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import NoteViewer from './components/NoteViewer';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);  // Estado para las notas
  const [activeNote, setActiveNote] = useState(null); // La nota seleccionada
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [isRegistering, setIsRegistering] = useState(false); //Estado de registro

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

    //Manejar registro de usuario
    const handleToggleRegister = () => {
      setIsRegistering(!isRegistering);
    }

    //Verificar si hay un token
    useEffect(() => {
      const token = localStorage.getItem("token")
      if (token) {
        setIsAuthenticated(true);
      }
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    };

  return (
    <div className="app-container">
      {/* Si el usuario está autenticado, mostramos la app de notas */}
      {isAuthenticated ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Sidebar notes={notes} onSelectNote={setActiveNote} onAddNote={addNote} />
          <NoteViewer note={activeNote} onSave={updateNote} onDelete={deleteNote} />
        </>
      ) : (
        // Si no está autenticado, mostramos la pantalla de login o registro
        isRegistering ? (
          <RegisterForm onToggleRegister={handleToggleRegister} onRegisterSuccess={() => setIsRegistering(false)} />
        ) : (
          <LoginForm onLoginSuccess={handleLoginSuccess} onToggleRegister={handleToggleRegister} />
        )
      )}
    </div>
  );
}

export default App;
