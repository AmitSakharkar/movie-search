import React, { useState } from 'react';
import styles from './SearchBar.module.css';
interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder="Search for a movie..."
        className={styles.searchInput}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleSearch} className={styles.button}>Search</button>
    </div>
  );
};

export default SearchBar;
