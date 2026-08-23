import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Save, Shield } from 'lucide-react';

const WorkerProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: 'Master Electrician & Smart Home Specialist',
    hourlyRate: 45,
    bio: 'Licensed electrician with 8+ years experience specializing in high-efficiency residential wiring and smart home automation.',
    skills: 'Wiring, EV Chargers, Circuit Panels, Smart Lighting',
    location: 'Downtown, Sector 14'
  });

  return (
    <div className="section container" style={{ maxWidth: '650px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>Worker Public Profile</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Customize your public profile listing seen by hiring customers</p>

      <form className="card-white" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Professional Title</label>
          <input
            type="text"
            className="form-control"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Hourly Rate ($ USD)</label>
          <input
            type="number"
            className="form-control"
            value={formData.hourlyRate}
            onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Skills (comma separated)</label>
          <input
            type="text"
            className="form-control"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Bio & Experience Summary</label>
          <textarea
            className="form-control"
            rows="4"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>

        <button type="button" className="btn btn-primary btn-block">
          <Save size={18} /> Save Worker Profile
        </button>
      </form>
    </div>
  );
};

export default WorkerProfile;
