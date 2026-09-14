import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { Bell, CheckCheck } from 'lucide-react';

const CustomerNotifications = () => {
  const { notifications, markAllAsRead } = useNotification();

  return (
    <div className="section container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.3rem', color: 'var(--text-main)' }}>Notifications</h1>
          <p style={{ color: 'var(--text-muted)' }}>Stay updated on booking status changes & message alerts</p>
        </div>
        <button onClick={markAllAsRead} className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <CheckCheck size={16} /> Mark all as read
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div key={n._id || n.id} className="card-white" style={{ borderLeft: `4px solid ${n.read ? 'var(--border-color)' : 'var(--accent-green)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.25rem', color: 'var(--text-main)' }}>{n.title}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{n.date || (n.createdAt ? new Date(n.createdAt).toLocaleDateString() : 'Recent')}</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{n.message}</p>
            </div>
          ))
        ) : (
          <div className="card-white" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>No Notifications</h3>
            <p style={{ color: 'var(--text-muted)' }}>You're all caught up with alerts & booking updates.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerNotifications;

