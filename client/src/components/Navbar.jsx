import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav style={{ background: '#ffffff', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <Link to="/" style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-dark)', display: 'flex', alignItems: 'center' }}>
          GigMatch<span style={{ color: 'var(--accent-green)' }}>AI</span>
        </Link>

        {/* Navigation Links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '2rem', listStyle: 'none' }} className="desktop-links">
          <li>
            <NavLink to="/" style={({ isActive }) => ({ color: isActive ? 'var(--accent-green)' : 'var(--text-main)', fontWeight: 600, fontSize: '0.95rem' })}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" style={({ isActive }) => ({ color: isActive ? 'var(--accent-green)' : 'var(--text-main)', fontWeight: 600, fontSize: '0.95rem' })}>
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/workers" style={({ isActive }) => ({ color: isActive ? 'var(--accent-green)' : 'var(--text-main)', fontWeight: 600, fontSize: '0.95rem' })}>
              Find Workers
            </NavLink>
          </li>
          <li>
            <NavLink to="/register?role=worker" style={({ isActive }) => ({ color: isActive ? 'var(--accent-green)' : 'var(--text-main)', fontWeight: 600, fontSize: '0.95rem' })}>
              Work with us
            </NavLink>
          </li>
        </ul>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }} className="desktop-actions">
          <Link to="/login" className="btn btn-outline btn-sm">
            Log in
          </Link>
          <Link to="/register" className="btn btn-primary btn-sm">
            Sign up
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}
          aria-label="Toggle menu"
          className="mobile-toggle-btn"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{ background: '#ffffff', borderTop: '1px solid var(--border-color)', padding: '1rem 1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link to="/" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-main)', fontWeight: 600 }}>Home</Link>
          <Link to="/categories" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-main)', fontWeight: 600 }}>Categories</Link>
          <Link to="/workers" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-main)', fontWeight: 600 }}>Find Workers</Link>
          <Link to="/register?role=worker" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-main)', fontWeight: 600 }}>Work with us</Link>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <Link to="/login" onClick={() => setMobileOpen(false)} className="btn btn-outline btn-sm" style={{ flex: 1 }}>Log in</Link>
            <Link to="/register" onClick={() => setMobileOpen(false)} className="btn btn-primary btn-sm" style={{ flex: 1 }}>Sign up</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
