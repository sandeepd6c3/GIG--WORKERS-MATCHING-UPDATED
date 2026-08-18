import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

const Profile = () => {
  const [name, setName] = useState('Ramesh Joshi');
  const [email, setEmail] = useState('ramesh.joshi@example.com');
  const [phone, setPhone] = useState('9876543210');
  const [city, setCity] = useState('Hyderabad');
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMsg('✓ Profile information updated successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div>
      <section style={{ background: '#ffffff', borderBottom: '1px solid var(--border-color)', padding: '2rem 0' }}>
        <div className="container">
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link> / Account Profile
          </div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.2rem' }}>Account Profile Settings</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Update personal contact info, credentials, and identity verification documents
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          
          {/* Identity Header Card */}
          <div className="card-white" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'var(--navy-dark)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                fontWeight: 800,
              }}
            >
              RJ
            </div>
            <div>
              <h2 style={{ fontSize: '1.45rem', marginBottom: '0.25rem' }}>{name}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="trust-badge gold">✓ Gold Verified Worker</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>ID: USR-98421</span>
              </div>
            </div>
          </div>

          {savedMsg && (
            <div style={{ background: '#dcfce7', border: '1px solid #86efac', color: '#166534', padding: '0.85rem 1rem', borderRadius: 'var(--radius)', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 600 }}>
              {savedMsg}
            </div>
          )}

          {/* Personal Info Form */}
          <div className="card-white" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
              Personal Information
            </h3>

            <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.35rem' }}>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.35rem' }}>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.35rem' }}>Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.35rem' }}>Primary City</label>
                <input
                  type="text"
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div style={{ gridColumn: 'span 2', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>

          {/* Identity Verification Document Box */}
          <div className="card-white">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Identity Compliance &amp; Verification</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              Your verification level determines which trust badge is visible to customers on your worker cards.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: '#f8fafc', borderRadius: 'var(--radius)' }}>
                <div>
                  <strong style={{ fontSize: '0.9rem', display: 'block' }}>Government Photo ID (Aadhaar / Passport)</strong>
                  <span style={{ color: 'var(--accent-green-hover)', fontSize: '0.8rem', fontWeight: 600 }}>✓ Verified on Jan 14, 2026</span>
                </div>
                <span className="trust-badge gold">✓ Approved</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: '#f8fafc', borderRadius: 'var(--radius)' }}>
                <div>
                  <strong style={{ fontSize: '0.9rem', display: 'block' }}>Electrical Trade Skill Certification</strong>
                  <span style={{ color: 'var(--accent-green-hover)', fontSize: '0.8rem', fontWeight: 600 }}>✓ Verified on Jan 15, 2026</span>
                </div>
                <span className="trust-badge gold">✓ Approved</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Profile;
