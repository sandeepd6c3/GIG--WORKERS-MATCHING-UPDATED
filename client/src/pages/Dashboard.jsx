import React from 'react';
import { Calendar, Clock, CheckCircle2, User } from 'lucide-react';

const Dashboard = () => {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.4rem' }}>User Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Overview of your account activity, active bookings, and quick actions</p>
      </div>

      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <div className="ui-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Active Bookings</p>
              <h2 style={{ fontSize: '2.25rem', marginTop: '0.25rem', color: 'var(--text-primary)' }}>2</h2>
            </div>
            <div style={{ background: 'var(--ai-soft)', padding: '0.85rem', borderRadius: 'var(--radius)', border: '1px solid rgba(108, 124, 255, 0.25)' }}>
              <Clock style={{ color: 'var(--ai-accent)' }} size={24} />
            </div>
          </div>
        </div>

        <div className="ui-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Completed Jobs</p>
              <h2 style={{ fontSize: '2.25rem', marginTop: '0.25rem', color: 'var(--success)' }}>8</h2>
            </div>
            <div style={{ background: 'rgba(34, 197, 94, 0.12)', padding: '0.85rem', borderRadius: 'var(--radius)', border: '1px solid rgba(34, 197, 94, 0.25)' }}>
              <CheckCircle2 style={{ color: 'var(--success)' }} size={24} />
            </div>
          </div>
        </div>

        <div className="ui-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Account Role</p>
              <h2 style={{ fontSize: '1.65rem', marginTop: '0.25rem', color: 'var(--accent)' }}>Customer</h2>
            </div>
            <div style={{ background: 'var(--accent-soft)', padding: '0.85rem', borderRadius: 'var(--radius)', border: '1px solid rgba(32, 180, 134, 0.25)' }}>
              <User style={{ color: 'var(--accent)' }} size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
