import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onLoginSuccess, onToggleRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

  const handleLogin = (username, password) => {
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem("token", data.token); //Guarda el token en la memoria local
        onLoginSuccess(); // Llama a la función de éxito de login
        setErrorMessage(''); // Limpia el mensaje de error
      } else {
        setErrorMessage(data.message || 'Usuario o contraseña incorrectos'); // Muestra el mensaje de error
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setErrorMessage('Error en la conexión'); // Mensaje para error de conexión
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={25}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={25}
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>} 
        <button type="submit">Login</button>
        <p>¿No tienes una cuenta?<button type='button' onClick={onToggleRegister}>Regístrate</button></p>
      </form>
    </div>
  );
};

export default LoginForm;
