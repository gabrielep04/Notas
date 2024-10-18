import React, { useState, useEffect } from 'react';
import './Switch.css';

function Switch({ onToggle }) {
  const [isChecked, setIsChecked] = useState(false);

  // Recuperar el estado del modo oscuro guardado al montar el componente
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('isDarkMode') === 'true';
    setIsChecked(savedDarkMode);
  }, []);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onToggle(!isChecked);  // Notificamos el cambio al componente padre
    localStorage.setItem('isDarkMode', !isChecked);  // Guardamos el estado en localStorage
  };

  return (
    <label className="apple-switch" title="Modo claro/oscuro">
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className="slider"></span>
    </label>
  );
}

export default Switch;
