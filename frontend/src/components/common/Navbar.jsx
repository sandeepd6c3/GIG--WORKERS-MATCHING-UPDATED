import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, User, LogOut, Bell, Menu, X, LayoutDashboard, Calendar, Search } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useNotification } from '../../context/NotificationContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      background: 'var(--navy-hero)',
      color: '#ffffff',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #20b486 0%, #15803d 100%)',
            color: '#fff',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(32, 180, 134, 0.3)'
          }}>
            <ShieldCheck size={24} />
          </div>
          <span style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'Sora, sans-serif', color: '#fff' }}>
            Gig<span style={{ color: 'var(--accent-green)' }}>Match</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/" style={{ color: isActive('/') ? 'var(--accent-green)' : '#cbd5e1', fontWeight: 500, transition: 'var(--transition)' }}>Home</Link>
          <Link to="/categories" style={{ color: isActive('/categories') ? 'var(--accent-green)' : '#cbd5e1', fontWeight: 500 }}>Categories</Link>
          <Link to="/workers" style={{ color: isActive('/workers') ? 'var(--accent-green)' : '#cbd5e1', fontWeight: 500 }}>Find Workers</Link>

          {user && (
            <>
              {user.role === 'customer' && (
                <Link to="/my-bookings" style={{ color: isActive('/my-bookings') ? 'var(--accent-green)' : '#cbd5e1', fontWeight: 500 }}>My Bookings</Link>
              )}
              {user.role === 'worker' && (
                <Link to="/worker/dashboard" style={{ color: isActive('/worker/dashboard') ? 'var(--accent-green)' : '#cbd5e1', fontWeight: 500 }}>Worker Dashboard</Link>
              )}
              {user.role === 'admin' && (
                <Link to="/admin/dashboard" style={{ color: isActive('/admin/dashboard') ? 'var(--accent-green)' : '#cbd5e1', fontWeight: 500 }}>Admin Panel</Link>
              )}
            </>
          )}
        </div>

        {/* Right Action Icons & User Menu */}
        <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {user ? (
            <>
              <Link to={user.role === 'worker' ? '/worker/notifications' : '/notifications'} style={{ position: 'relative', color: '#cbd5e1' }}>
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: '#ef4444',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {unreadCount}
                  </span>
                )}
              </Link>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255, 255, 255, 0.08)', padding: '0.4rem 0.8rem', borderRadius: '20px' }}>
                <User size={18} style={{ color: 'var(--accent-green)' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user.name}</span>
                <span style={{ fontSize: '0.75rem', background: 'var(--accent-green)', color: '#fff', padding: '0.1rem 0.4rem', borderRadius: '6px', textTransform: 'capitalize' }}>
                  {user.role}
                </span>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: '0.5rem' }}>
                  <LogOut size={16} />
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/login" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255, 255, 255, 0.3)' }}>Log In</Link>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{ background: 'var(--navy-dark)', padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff' }}>Home</Link>
          <Link to="/categories" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff' }}>Categories</Link>
          <Link to="/workers" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff' }}>Find Workers</Link>
          {!user ? (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline btn-block" style={{ color: '#fff' }}>Log In</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary btn-block">Register</Link>
            </div>
          ) : (
            <button onClick={handleLogout} className="btn btn-outline btn-block" style={{ color: '#ef4444', borderColor: '#ef4444' }}>
              Log Out ({user.name})
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
