import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Morgan',
    email: user?.email || 'alex@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, Sector 4'
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="section container" style={{ maxWidth: '600px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>Account Profile</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Manage your personal details & contact preferences</p>

      {saved && (
        <div style={{
          background: 'var(--accent-green-soft)',
          border: '1px solid var(--accent-green-border)',
          color: 'var(--accent-green)',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius)',
          marginBottom: '1.25rem',
          fontWeight: 600,
          fontSize: '0.9rem'
        }}>
          ✓ Profile changes saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="card-white" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Full Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Email Address</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Phone Number</label>
          <input
            type="text"
            className="form-control"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Default Service Location</label>
          <input
            type="text"
            className="form-control"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', padding: '0.85rem' }}>
          <Save size={18} /> Update Profile Settings
        </button>
      </form>
    </div>
  );
};

export default Profile;

