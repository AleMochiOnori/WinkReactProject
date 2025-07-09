import React, { useState } from 'react';
import './SearchBarComponent.css';
interface Props {
  setSearchTerm: (term: string) => void;
}

const SearchBarComponent: React.FC<Props> = ({ setSearchTerm }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(input);
  };

  return (
    <form className='search-input' onSubmit={handleSubmit}>
      <input className='barraRicerca'
        type="text"
        placeholder="Cerca libri..."
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ marginRight: '0.5rem' }}
      />
      <button type="submit">Cerca</button>
    </form>
  );
};

export default SearchBarComponent;
