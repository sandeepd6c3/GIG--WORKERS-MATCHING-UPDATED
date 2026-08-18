import React from 'react';
import { User, Mail, Phone, ShieldCheck } from 'lucide-react';

const Profile = () => {
  return (
    <div style={{ maxWidth: '580px', margin: '1rem auto' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.4rem' }}>Account Profile</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your personal details, credentials, and contact info</p>
      </div>

      <div className="ui-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)' }}>
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent) 0%, #06b6d4 100%)',
              color: '#07111F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              fontWeight: 800,
            }}
          >
            RJ
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.2rem' }}>Ramesh Joshi</h2>
            <span className="ui-badge ui-badge-accent">
              <ShieldCheck size={14} /> Active Verified User
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Full Name</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.95rem' }}>Ramesh Joshi</span>
          </div>

          <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Email Address</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.95rem' }}>ramesh.joshi@example.com</span>
          </div>

          <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Phone Number</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.95rem' }}>+91 9876543210</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
