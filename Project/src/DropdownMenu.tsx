import React, { useState, useRef, useEffect } from 'react';
import './DropdownMenu.css';

const DropdownMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setOpen(prev => !prev);
  };

  // Chiude il menu cliccando fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dropdown-container" ref={menuRef}>
      <button className="dropdown-toggle" onClick={toggleMenu}>
        Elementi nella pagina ▼
      </button>
      {open && (
        <div className="dropdown-menu">
          <div className="dropdown-item">5</div>
          <div className="dropdown-item">10</div>
          <div className="dropdown-item">15</div>
          <div className="dropdown-item">20</div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
