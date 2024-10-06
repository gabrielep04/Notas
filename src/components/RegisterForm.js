import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = ({ onRegisterSuccess, onToggleRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = (username, password, confirmPassword) => {
    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          onRegisterSuccess(); // Registro exitoso
        } else {
          setErrorMessage(data.message || 'Error en el registro');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('Error en la conexión');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(username, password, confirmPassword);
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Mostrar el mensaje de error */}
        <button type="submit">Registrarse</button>
        <button type="button" onClick={onToggleRegister}>¿Ya tienes una cuenta? Inicia sesión</button>
      </form>
    </div>
  );
};

export default RegisterForm;
