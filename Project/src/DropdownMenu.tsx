import React, { useState, useRef, useEffect } from 'react';
import './DropdownMenu.css';


interface DropdownMenuProps {
  value: number;
  onSelect: (value: number) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ value, onSelect }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setOpen(prev => !prev);
  };

  const handleSelect = (value: number) => {
    if (onSelect){
        onSelect(value);
    }
    setOpen(prev => !prev);
  };


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
          {[5, 10, 15, 20].map((item) => (
            <div
              className="dropdown-item"
              key={item}
              onClick={() => handleSelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
