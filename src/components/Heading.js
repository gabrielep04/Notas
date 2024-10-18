import React from 'react';
import { FaPlus } from 'react-icons/fa'; 
import "./Heading.css";
import Dropdown from './Dropdown';
import DropdownItem from './DropDownItem';
import Switch from './Switch';

function Heading({ onAddNote, onLogout, onViewModeChange, onToggleDarkMode }) {
  const handleDropdownItemClick = (mode) => {
    onViewModeChange(mode);
  };

  return (
    <div className="heading">
      <div className="heading-top">
        <h2 className="heading-title">Notas</h2>
        <button className="heading-logout-button" onClick={onLogout}>Logout</button>
      </div>

      <div className="button-container">
        <button 
          className="heading-add-button" 
          onClick={() => {
            const newNote = { title: '', content: '' };
            onAddNote(newNote); // Crear nueva nota
          }}
          title="Nueva Nota"  
        >
          <FaPlus />
        </button>

        <Switch onToggle={onToggleDarkMode} />

        <div className="dropdown-container">
          <Dropdown
            buttonText={<span className="icon">☰</span>}
            content={
              <>
                <DropdownItem onClick={() => handleDropdownItemClick('list')}>Lista</DropdownItem>
                <DropdownItem onClick={() => handleDropdownItemClick('gallery')}>Galería</DropdownItem>
                <DropdownItem onClick={() => handleDropdownItemClick('compact')}>Compacto</DropdownItem>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Heading;
