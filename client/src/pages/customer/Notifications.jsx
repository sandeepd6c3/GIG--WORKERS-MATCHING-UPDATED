import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { Bell, CheckCheck } from 'lucide-react';

const CustomerNotifications = () => {
  const { notifications, markAllAsRead } = useNotification();

  return (
    <div className="section container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>Notifications</h1>
          <p style={{ color: 'var(--text-muted)' }}>Stay updated on booking status changes & message alerts</p>
        </div>
        <button onClick={markAllAsRead} className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <CheckCheck size={16} /> Mark all as read
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {notifications.map((n) => (
          <div key={n.id} className="card-white" style={{ borderLeft: `4px solid ${n.read ? '#cbd5e1' : 'var(--accent-green)'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.2rem' }}>{n.title}</h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{n.date}</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{n.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerNotifications;
