import React from 'react';
import { ShieldCheck, Bell, User } from 'lucide-react';

const AdminNavbar = () => {
  return (
    <header style={{
      height: '60px',
      background: '#ffffff',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ShieldCheck size={22} color="var(--accent-green)" />
        <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>Platform Control Center</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f1f5f9', padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>
          <User size={16} color="var(--accent-green)" />
          <span style={{ fontWeight: 600 }}>Super Admin</span>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
