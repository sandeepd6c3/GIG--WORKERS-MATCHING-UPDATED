import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';

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
    <form onSubmit={handleSearch} className="search-bar-container">
      {/* Category Selection Dropdown */}
      <div className="search-input-box">
        <Search size={20} color="var(--accent-green)" />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            border: 'none',
            background: 'transparent',
            color: 'var(--text-main)',
            width: '100%',
            outline: 'none',
            cursor: 'pointer',
            fontSize: '0.95rem'
          }}
        >
          <option value="" style={{ background: 'var(--bg-surface)' }}>All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id || cat.slug} value={cat.slug} style={{ background: 'var(--bg-surface)' }}>
              {cat.name}
            </option>
          ))}
          <option value="electrician" style={{ background: 'var(--bg-surface)' }}>Electrician</option>
          <option value="plumber" style={{ background: 'var(--bg-surface)' }}>Plumber</option>
          <option value="carpenter" style={{ background: 'var(--bg-surface)' }}>Carpenter</option>
          <option value="painter" style={{ background: 'var(--bg-surface)' }}>Painter</option>
          <option value="ac-repair" style={{ background: 'var(--bg-surface)' }}>AC Repair</option>
          <option value="cleaner" style={{ background: 'var(--bg-surface)' }}>Home Cleaner</option>
        </select>
      </div>

      <div className="search-divider" />

      {/* Location Input */}
      <div className="search-input-box">
        <MapPin size={20} color="var(--accent-green)" />
        <input
          type="text"
          placeholder="Enter your area or city"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Search Submit Button */}
      <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.6rem', borderRadius: 'var(--radius)' }}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;

