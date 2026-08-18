import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Wrench, DollarSign, CheckCircle2, XCircle, Plus } from 'lucide-react';

const AdminPanel = () => {
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [catList, setCatList] = useState([
    { name: 'Electrician', slug: 'electrician', count: 1420 },
    { name: 'Plumber', slug: 'plumber', count: 980 },
    { name: 'Carpenter', slug: 'carpenter', count: 650 },
    { name: 'Painter', slug: 'painter', count: 420 },
  ]);

  const [verificationQueue, setVerificationQueue] = useState([
    { id: '1', name: 'Suresh Patel', category: 'Plumber', city: 'Mumbai', docStatus: 'Aadhaar Verified', targetTier: 'Gold' },
    { id: '2', name: 'Venkatesh Rao', category: 'Carpenter', city: 'Bengaluru', docStatus: 'Voter ID Verified', targetTier: 'Silver' },
  ]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName) return;
    const slug = newCatSlug || newCatName.toLowerCase().replace(/\s+/g, '-');
    setCatList([...catList, { name: newCatName, slug, count: 0 }]);
    setNewCatName('');
    setNewCatSlug('');
  };

  const handleApproveWorker = (id) => {
    setVerificationQueue(verificationQueue.filter((w) => w.id !== id));
  };

  return (
    <div>
      {/* Admin Header */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid var(--border-color)', padding: '2rem 0' }}>
        <div className="container">
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link> / Admin Control Panel
          </div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.2rem' }}>Platform Administration</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Verification compliance review, category catalog, and system stats
          </p>
        </div>
      </section>

      {/* Main Admin Content */}
      <section className="section">
        <div className="container">
          {/* Stat Cards */}
          <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
            <div className="card-white">
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Platform Users</span>
              <h2 style={{ fontSize: '2.1rem', marginTop: '0.2rem' }}>12,450</h2>
            </div>
            <div className="card-white">
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Verified Workers</span>
              <h2 style={{ fontSize: '2.1rem', marginTop: '0.2rem', color: 'var(--accent-green-hover)' }}>8,920</h2>
            </div>
            <div className="card-white">
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Active Categories</span>
              <h2 style={{ fontSize: '2.1rem', marginTop: '0.2rem' }}>{catList.length}</h2>
            </div>
            <div className="card-white">
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Platform Revenue</span>
              <h2 style={{ fontSize: '2.1rem', marginTop: '0.2rem', color: '#d97706' }}>₹1.84L</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(300px, 360px)', gap: '2rem', alignItems: 'flex-start' }}>
            
            {/* Left Queue: Worker Verification Approval */}
            <div className="card-white">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                Pending Worker Verifications ({verificationQueue.length})
              </h3>

              {verificationQueue.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  All worker verification requests have been approved!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {verificationQueue.map((worker) => (
                    <div key={worker.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <strong style={{ fontSize: '1rem' }}>{worker.name}</strong>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          {worker.category} • {worker.city}
                        </div>
                        <div style={{ marginTop: '0.25rem' }}>
                          <span className="trust-badge gold">{worker.docStatus}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleApproveWorker(worker.id)} className="btn btn-primary btn-sm">
                          <CheckCircle2 size={14} /> Approve
                        </button>
                        <button onClick={() => handleApproveWorker(worker.id)} className="btn btn-outline btn-sm" style={{ color: '#dc2626', borderColor: '#fecaca' }}>
                          <XCircle size={14} /> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Panel: Category Manager */}
            <div className="card-white">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Category Manager</h3>

              <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Pest Control"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Slug (optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. pest-control"
                    value={newCatSlug}
                    onChange={(e) => setNewCatSlug(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-sm btn-block">
                  <Plus size={16} /> Add Service Category
                </button>
              </form>

              <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>Existing Categories ({catList.length})</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {catList.map((cat, idx) => (
                  <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', background: '#f8fafc', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem' }}>
                    <span><strong>{cat.name}</strong> <small style={{ color: 'var(--text-muted)' }}>({cat.slug})</small></span>
                    <span style={{ color: 'var(--text-muted)' }}>{cat.count} workers</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
