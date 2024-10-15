import React from 'react';
import { FaPlus } from 'react-icons/fa'; 
import "./Heading.css";
import Dropdown from './Dropdown';
import DropdownItem from './DropDownItem';

function Heading({ onAddNote, onLogout, onViewModeChange }) {
  const handleDropdownItemClick = (mode) => {
    console.log(`Modo cambiado a: ${mode}`);
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
            onAddNote(newNote);
          }}
          title="Nueva Nota"  
        >
          <FaPlus />
        </button>

        <button className="heading-mode-button">Cambiar Modo</button>

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
