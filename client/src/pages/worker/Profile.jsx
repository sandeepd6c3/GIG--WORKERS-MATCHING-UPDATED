import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';
import { Save } from 'lucide-react';

const WorkerProfile = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    title: user?.title || 'Professional Gig Specialist',
    hourlyRate: user?.hourlyRate || 45,
    bio: user?.bio || 'Certified specialist with proven local service experience.',
    skills: Array.isArray(user?.skills) ? user.skills.join(', ') : (user?.skills || 'Repairs, Installation, Maintenance'),
    location: user?.location || 'Downtown Sector'
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        title: user.title || 'Professional Gig Specialist',
        hourlyRate: user.hourlyRate || 45,
        bio: user.bio || 'Certified specialist with proven local service experience.',
        skills: Array.isArray(user.skills) ? user.skills.join(', ') : (user.skills || 'Repairs, Installation, Maintenance'),
        location: user.location || 'Downtown Sector'
      });
    }
  }, [user]);

  const handleSave = async () => {
    setError(null);
    try {
      const skillsArray = typeof formData.skills === 'string'
        ? formData.skills.split(',').map(s => s.trim()).filter(Boolean)
        : formData.skills;
      const updated = await api.put('/users/profile', {
        title: formData.title,
        hourlyRate: Number(formData.hourlyRate),
        bio: formData.bio,
        skills: skillsArray,
        location: formData.location
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
    <div className="section container" style={{ maxWidth: '650px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>Worker Public Profile</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Customize your public profile listing seen by hiring customers</p>

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
          ✓ Worker profile changes saved!
        </div>
      )}

      <form className="card-white" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Professional Title</label>
          <input
            type="text"
            className="form-control"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Hourly Rate ($ USD)</label>
          <input
            type="number"
            className="form-control"
            value={formData.hourlyRate}
            onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Skills (comma separated)</label>
          <input
            type="text"
            className="form-control"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Bio & Experience Summary</label>
          <textarea
            className="form-control"
            rows="4"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>

        <button type="button" onClick={handleSave} className="btn btn-primary btn-block" style={{ padding: '0.85rem' }}>
          <Save size={18} /> Save Worker Profile
        </button>
      </form>
    </div>
  );
};

export default WorkerProfile;

