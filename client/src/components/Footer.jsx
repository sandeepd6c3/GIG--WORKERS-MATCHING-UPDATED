import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--navy-dark)', color: '#ffffff', padding: '3.5rem 0 1.5rem', marginTop: 'auto' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.85rem' }}>
              GigMatch<span style={{ color: 'var(--accent-green)' }}>AI</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
              AI-powered platform connecting verified skilled workers across 20+ categories with customers who need reliable, on-time service.
            </p>
          </div>

          {/* Company Column */}
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '1rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link to="/" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>About us</Link></li>
              <li><Link to="/" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>How it works</Link></li>
              <li><Link to="/" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Careers</Link></li>
            </ul>
          </div>

          {/* For Workers Column */}
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '1rem' }}>For workers</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link to="/register?role=worker" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Join as a worker</Link></li>
              <li><Link to="/" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Trust badges</Link></li>
              <li><Link to="/" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Payouts</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '1rem' }}>Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link to="/" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Help center</Link></li>
              <li><Link to="/" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Safety</Link></li>
              <li><Link to="/" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Contact us</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright Bottom */}
        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: '#64748b', fontSize: '0.85rem' }}>
          <span>© 2026 GigMatch AI. Built as an industrial MERN stack application.</span>
          <span>Made with Node.js, Express &amp; React</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
