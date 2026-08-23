import React, { useState } from 'react';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';

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
    <form onSubmit={handleSubmit} style={{
      background: '#ffffff',
      borderRadius: 'var(--radius-lg)',
      padding: '0.6rem 0.75rem',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      flexWrap: 'wrap',
      border: '1px solid var(--border-color)',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0 0.5rem' }}>
        <Search size={20} color="var(--accent-green)" />
        <input
          type="text"
          placeholder="What gig or service do you need? (e.g. Electrician)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.95rem', color: 'var(--text-main)' }}
        />
      </div>

      <div className="search-divider" style={{ width: '1px', height: '28px', background: '#cbd5e1' }} />

      <div style={{ flex: 1, minWidth: '180px', display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0 0.5rem' }}>
        <MapPin size={20} color="var(--accent-green)" />
        <input
          type="text"
          placeholder="Location / Postal Code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.95rem', color: 'var(--text-main)' }}
        />
      </div>

      <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius)' }}>
        Find Matches
      </button>
    </form>
  );
};

export default SearchBar;
