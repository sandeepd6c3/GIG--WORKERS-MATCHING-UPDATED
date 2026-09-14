import React from 'react';
import { ShieldCheck, User } from 'lucide-react';

const AdminNavbar = () => {
  return (
    <header style={{
      height: '64px',
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.75rem',
      position: 'sticky',
      top: 0,
      zIndex: 90
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'var(--accent-green-soft)',
          border: '1px solid var(--accent-green-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-green)'
        }}>
          <ShieldCheck size={20} />
        </div>
        <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)', fontFamily: 'Sora, sans-serif' }}>
          Platform Control Center
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-color)',
          padding: '0.35rem 0.85rem',
          borderRadius: '20px',
          fontSize: '0.85rem',
          color: 'var(--text-main)'
        }}>
          <User size={16} color="var(--accent-green)" />
          <span style={{ fontWeight: 600 }}>Super Admin</span>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;

