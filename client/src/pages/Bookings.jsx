import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';

const Bookings = () => {
  const [filter, setFilter] = useState('all');

  const bookingsList = [
    {
      id: 'BK-20260818-001',
      workerName: 'Ramesh Joshi',
      category: 'Electrician',
      status: 'Accepted',
      amount: 714,
      date: 'Aug 20, 2026',
      time: '10:00 AM',
      city: 'Hyderabad',
    },
    {
      id: 'BK-20260815-004',
      workerName: 'Suresh Patel',
      category: 'Plumber',
      status: 'Completed',
      amount: 650,
      date: 'Aug 15, 2026',
      time: '02:30 PM',
      city: 'Mumbai',
    },
  ];

  return (
    <div>
      <section style={{ background: '#ffffff', borderBottom: '1px solid var(--border-color)', padding: '2rem 0' }}>
        <div className="container">
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link> / Bookings
          </div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>My Bookings</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Track service appointments, active callouts, and completed jobs
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setFilter('all')}
              className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
            >
              All Bookings
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`btn btn-sm ${filter === 'active' ? 'btn-primary' : 'btn-outline'}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`btn btn-sm ${filter === 'completed' ? 'btn-primary' : 'btn-outline'}`}
            >
              Completed
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {bookingsList.map((bk) => (
              <div key={bk.id} className="card-white" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>{bk.id}</span>
                      <span
                        className="trust-badge"
                        style={{
                          background: bk.status === 'Completed' ? '#dcfce7' : '#e0f2fe',
                          color: bk.status === 'Completed' ? '#166534' : '#075985',
                        }}
                      >
                        ✓ {bk.status}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{bk.category} Service Callout</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      Worker: <strong>{bk.workerName}</strong>
                    </p>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'Sora' }}>
                      ₹{bk.amount}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Callout Price</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '1.75rem',
                    marginTop: '1.25rem',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid #f1f5f9',
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={15} style={{ color: 'var(--accent-green)' }} /> {bk.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={15} style={{ color: 'var(--accent-green)' }} /> {bk.time}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={15} style={{ color: 'var(--text-muted)' }} /> {bk.city}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bookings;
