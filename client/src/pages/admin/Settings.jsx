import React, { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { Save } from 'lucide-react';

const AdminSettings = () => {
  const [platformFee, setPlatformFee] = useState(10);
  const [saved, setSaved] = useState(false);

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: 'var(--bg-page)' }}>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Global Platform Settings</h1>

          {saved && (
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.75rem 1rem', borderRadius: 'var(--radius)', marginBottom: '1.25rem', maxWidth: '500px' }}>
              ✓ Settings updated!
            </div>
          )}

          <div className="card-white" style={{ maxWidth: '500px' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Platform Commission Fee (%)</label>
              <input
                type="number"
                className="form-control"
                value={platformFee}
                onChange={(e) => setPlatformFee(e.target.value)}
              />
            </div>

            <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }} className="btn btn-primary btn-block">
              <Save size={18} /> Save Settings
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;
