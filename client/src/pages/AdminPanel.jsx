import React from 'react';
import { ShieldCheck, Users, Briefcase, DollarSign } from 'lucide-react';

const AdminPanel = () => {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <div className="ui-badge ui-badge-ai" style={{ marginBottom: '0.6rem' }}>
          <ShieldCheck size={14} /> Platform Control Panel
        </div>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.4rem' }}>Admin Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>System analytics, identity compliance verification, and category management</p>
      </div>

      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <div className="ui-card">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Platform Users</p>
          <h2 style={{ fontSize: '2.25rem', marginTop: '0.25rem', color: 'var(--text-primary)' }}>142</h2>
        </div>

        <div className="ui-card">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Verified Workers</p>
          <h2 style={{ fontSize: '2.25rem', marginTop: '0.25rem', color: 'var(--accent)' }}>38</h2>
        </div>

        <div className="ui-card">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Job Bookings</p>
          <h2 style={{ fontSize: '2.25rem', marginTop: '0.25rem', color: 'var(--ai-accent)' }}>215</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
