import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchBar = ({ onSearch, initialQuery = '', initialLocation = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ search: query, location });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar-container">
      <div className="search-input-box">
        <Search size={20} color="var(--accent-green)" />
        <input
          type="text"
          placeholder="What gig service do you need? (e.g. Electrician)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="search-divider" />

      <div className="search-input-box">
        <MapPin size={20} color="var(--accent-green)" />
        <input
          type="text"
          placeholder="Location / Area code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.6rem', borderRadius: 'var(--radius)' }}>
        Find Matches
      </button>
    </form>
  );
};

export default SearchBar;

