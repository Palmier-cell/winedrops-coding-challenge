import React from 'react';
import './style.css'; 

type SearchComponentProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

const SearchComponent: React.FC<SearchComponentProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="🔍 Search"
        value={searchTerm}
        className="search-input" 
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchComponent;
