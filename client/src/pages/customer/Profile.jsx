import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const updated = await api.put('/users/profile', {
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      });
      if (updated.data) {
        setUser(updated.data);
        localStorage.setItem('gigmatch_user', JSON.stringify(updated.data));
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
  };

  return (
    <div className="section container" style={{ maxWidth: '640px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>Account Profile</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Manage your personal details & contact preferences</p>

      {/* User Identity Header Card */}
      <div className="card-white" style={{
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
        padding: '1.5rem',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius)',
        background: 'var(--bg-surface)'
      }}>
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || 'User'}
            style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid var(--accent-green)',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)'
            }}
          />
        ) : (
          <div style={{
            width: '76px',
            height: '76px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-green) 0%, #059669 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 800,
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)'
          }}>
            {user?.name ? user.name.charAt(0).toUpperCase() : <User size={36} />}
          </div>
        )}

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
              {user?.name || 'User Profile'}
            </h2>
            <span style={{
              fontSize: '0.72rem',
              background: 'var(--accent-green-soft)',
              border: '1px solid var(--accent-green-border)',
              color: 'var(--accent-green)',
              padding: '0.15rem 0.55rem',
              borderRadius: '6px',
              fontWeight: 700,
              textTransform: 'capitalize'
            }}>
              {user?.role || 'Customer'}
            </span>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0 0 0.5rem 0' }}>
            {user?.email || 'No email associated'}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--accent-green)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontWeight: 600
            }}>
              ✓ Active GigMatch Member
            </span>
          </div>
        </div>
      </div>

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

