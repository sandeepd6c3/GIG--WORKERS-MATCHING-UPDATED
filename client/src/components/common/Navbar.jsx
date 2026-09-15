import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, User, LogOut, Bell, Menu, X, LayoutDashboard, Calendar, Search, Sparkles } from 'lucide-react';
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
      background: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      color: 'var(--text-main)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'var(--transition)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#fff',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
          }}>
            <ShieldCheck size={22} />
          </div>
          <span style={{ fontSize: '1.35rem', fontWeight: 800, fontFamily: 'Sora, sans-serif', color: 'var(--text-white)', letterSpacing: '-0.03em' }}>
            Gig<span style={{ color: 'var(--accent-green)' }}>Match</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          <Link
            to="/"
            style={{
              color: isActive('/') ? 'var(--accent-green)' : 'var(--text-secondary)',
              fontWeight: 500,
              fontSize: '0.92rem',
              transition: 'var(--transition)'
            }}
          >
            Home
          </Link>
          <Link
            to="/categories"
            style={{
              color: isActive('/categories') ? 'var(--accent-green)' : 'var(--text-secondary)',
              fontWeight: 500,
              fontSize: '0.92rem',
              transition: 'var(--transition)'
            }}
          >
            Categories
          </Link>
          <Link
            to="/workers"
            style={{
              color: isActive('/workers') ? 'var(--accent-green)' : 'var(--text-secondary)',
              fontWeight: 500,
              fontSize: '0.92rem',
              transition: 'var(--transition)'
            }}
          >
            Find Workers
          </Link>

          {user && (
            <>
              {user.role === 'customer' && (
                <Link
                  to="/my-bookings"
                  style={{
                    color: isActive('/my-bookings') ? 'var(--accent-green)' : 'var(--text-secondary)',
                    fontWeight: 500,
                    fontSize: '0.92rem',
                    transition: 'var(--transition)'
                  }}
                >
                  My Bookings
                </Link>
              )}
              {user.role === 'worker' && (
                <Link
                  to="/worker/dashboard"
                  style={{
                    color: isActive('/worker/dashboard') ? 'var(--accent-green)' : 'var(--text-secondary)',
                    fontWeight: 500,
                    fontSize: '0.92rem',
                    transition: 'var(--transition)'
                  }}
                >
                  Worker Dashboard
                </Link>
              )}
              {user.role === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  style={{
                    color: isActive('/admin/dashboard') ? 'var(--accent-green)' : 'var(--text-secondary)',
                    fontWeight: 500,
                    fontSize: '0.92rem',
                    transition: 'var(--transition)'
                  }}
                >
                  Admin Panel
                </Link>
              )}
              <Link
                to={user.role === 'worker' ? '/worker/profile' : user.role === 'admin' ? '/admin/settings' : '/profile'}
                style={{
                  color: isActive('/profile') || isActive('/worker/profile') ? 'var(--accent-green)' : 'var(--text-secondary)',
                  fontWeight: 500,
                  fontSize: '0.92rem',
                  transition: 'var(--transition)'
                }}
              >
                Profile
              </Link>
            </>
          )}
        </div>

        {/* Right Action Icons & User Menu */}
        <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user ? (
            <>
              <Link
                to={user.role === 'worker' ? '/worker/notifications' : '/notifications'}
                title="Notifications"
                style={{
                  position: 'relative',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.45rem',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'var(--transition)'
                }}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    background: '#ef4444',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)'
                  }}>
                    {unreadCount}
                  </span>
                )}
              </Link>

              {/* Clickable User Profile Pill */}
              <Link
                to={user.role === 'worker' ? '/worker/profile' : user.role === 'admin' ? '/admin/settings' : '/profile'}
                title="View and Edit Profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  padding: '0.3rem 0.75rem 0.3rem 0.35rem',
                  borderRadius: 'var(--radius-full)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-green)';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(16, 185, 129, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* User Avatar Image or Initials */}
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || 'User'}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1.5px solid var(--accent-green)'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'var(--accent-green-soft)',
                    color: 'var(--accent-green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.78rem'
                  }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : <User size={15} />}
                  </div>
                )}

                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name}
                </span>

                <span style={{
                  fontSize: '0.7rem',
                  background: 'var(--accent-green-soft)',
                  border: '1px solid var(--accent-green-border)',
                  color: 'var(--accent-green)',
                  padding: '0.1rem 0.45rem',
                  borderRadius: '6px',
                  textTransform: 'capitalize',
                  fontWeight: 600
                }}>
                  {user.role}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                title="Logout"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#f87171',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.4rem',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/login" className="btn btn-outline btn-sm">Log In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--bg-surface)',
          padding: '1.25rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', padding: '0.5rem 0' }}>Home</Link>
          <Link to="/categories" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', padding: '0.5rem 0' }}>Categories</Link>
          <Link to="/workers" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', padding: '0.5rem 0' }}>Find Workers</Link>
          
          {user && user.role === 'customer' && (
            <Link to="/my-bookings" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', padding: '0.5rem 0' }}>My Bookings</Link>
          )}
          {user && user.role === 'worker' && (
            <Link to="/worker/dashboard" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', padding: '0.5rem 0' }}>Worker Dashboard</Link>
          )}
          {user && user.role === 'admin' && (
            <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', padding: '0.5rem 0' }}>Admin Panel</Link>
          )}

          {user && (
            <Link
              to={user.role === 'worker' ? '/worker/profile' : user.role === 'admin' ? '/admin/settings' : '/profile'}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: 'var(--accent-green)',
                padding: '0.5rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontWeight: 600
              }}
            >
              {user.avatar ? (
                <img src={user.avatar} alt="" style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <User size={18} />
              )}
              <span>My Profile ({user.name})</span>
            </Link>
          )}

          {!user ? (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline btn-block">Log In</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary btn-block">Register</Link>
            </div>
          ) : (
            <button onClick={handleLogout} className="btn btn-outline btn-block" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
              Log Out ({user.name})
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

