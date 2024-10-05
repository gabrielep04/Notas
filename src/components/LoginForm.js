import React, { useState } from 'react';
import './LoginForm.css'; // Importa el CSS

const LoginForm = ({ onLoginSuccess }) => {
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
        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Mostrar el mensaje de error */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
