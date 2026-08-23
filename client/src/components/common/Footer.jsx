import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--navy-hero)', color: '#cbd5e1', paddingTop: '3.5rem', paddingBottom: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{ background: 'var(--accent-green)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <ShieldCheck size={20} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', fontFamily: 'Sora, sans-serif' }}>
                Gig<span style={{ color: 'var(--accent-green)' }}>Match</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.5 }}>
              Connecting customers with verified, top-rated local gig experts with instant AI matching.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1rem' }}>Platform</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <li><Link to="/categories" style={{ color: '#94a3b8' }}>Browse Categories</Link></li>
              <li><Link to="/workers" style={{ color: '#94a3b8' }}>Find Gig Workers</Link></li>
              <li><Link to="/register" style={{ color: '#94a3b8' }}>Become a Gig Worker</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1rem' }}>Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <li><a href="#help" style={{ color: '#94a3b8' }}>Help Center & FAQ</a></li>
              <li><a href="#trust" style={{ color: '#94a3b8' }}>Trust & Safety</a></li>
              <li><a href="#terms" style={{ color: '#94a3b8' }}>Terms of Service</a></li>
            </ul>
          </div>

        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
          <div>© {new Date().getFullYear()} GigMatch Inc. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Built with <Heart size={14} color="#ef4444" fill="#ef4444" /> for modern gig marketplaces.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
