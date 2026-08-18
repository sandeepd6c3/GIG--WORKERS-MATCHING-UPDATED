import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ categories = [], initialCategory = '', initialLocation = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [location, setLocation] = useState(initialLocation);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (selectedCategory) queryParams.set('category', selectedCategory);
    if (location) queryParams.set('city', location);

    navigate(`/workers?${queryParams.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '0.6rem 0.85rem',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap',
      }}
    >
      {/* Category Selection Dropdown */}
      <div style={{ flex: 1, minWidth: '180px' }}>
        <select
          className="form-control"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 500 }}
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat._id || cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
          <option value="electrician">Electrician</option>
          <option value="plumber">Plumber</option>
          <option value="carpenter">Carpenter</option>
          <option value="painter">Painter</option>
          <option value="ac-repair">AC Repair</option>
          <option value="cleaner">Home Cleaner</option>
        </select>
      </div>

      <div style={{ width: '1px', height: '24px', backgroundColor: '#e2e8f0' }} className="search-divider" />

      {/* Location Input */}
      <div style={{ flex: 1, minWidth: '180px' }}>
        <input
          type="text"
          placeholder="Enter your area or city"
          className="form-control"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ border: 'none', background: 'transparent' }}
        />
      </div>

      {/* Search Submit Button */}
      <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1.75rem' }}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
