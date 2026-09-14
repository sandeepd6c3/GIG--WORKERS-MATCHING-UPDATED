import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--navy-dark)',
      color: 'var(--text-secondary)',
      paddingTop: '4rem',
      paddingBottom: '2.5rem',
      borderTop: '1px solid var(--border-color)',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}>
                <ShieldCheck size={20} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-white)', fontFamily: 'Sora, sans-serif' }}>
                Gig<span style={{ color: 'var(--accent-green)' }}>Match</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '280px' }}>
              Connecting customers with verified, top-rated local gig experts with instant AI matching.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '1.25rem', fontSize: '0.95rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Platform</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li><Link to="/categories" style={{ color: 'var(--text-secondary)', transition: 'var(--transition)' }}>Browse Categories</Link></li>
              <li><Link to="/workers" style={{ color: 'var(--text-secondary)', transition: 'var(--transition)' }}>Find Gig Workers</Link></li>
              <li><Link to="/register" style={{ color: 'var(--text-secondary)', transition: 'var(--transition)' }}>Become a Gig Worker</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '1.25rem', fontSize: '0.95rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li><a href="#help" style={{ color: 'var(--text-secondary)', transition: 'var(--transition)' }}>Help Center & FAQ</a></li>
              <li><a href="#trust" style={{ color: 'var(--text-secondary)', transition: 'var(--transition)' }}>Trust & Safety</a></li>
              <li><a href="#terms" style={{ color: 'var(--text-secondary)', transition: 'var(--transition)' }}>Terms of Service</a></li>
            </ul>
          </div>

        </div>

        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div>© {new Date().getFullYear()} GigMatch Inc. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Built with <Heart size={14} color="#ef4444" fill="#ef4444" /> for modern gig marketplaces.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

