import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, CheckCircle2, DollarSign, User, ShieldCheck, ArrowUpRight, Search, PlusCircle, Wrench } from 'lucide-react';

const Dashboard = () => {
  const [activeRole, setActiveRole] = useState('customer');

  const customerStats = [
    { title: 'Total Bookings', value: '12', change: '+2 this month', icon: Calendar, color: 'var(--accent-green)' },
    { title: 'Active Appointments', value: '2', change: '1 scheduled today', icon: Clock, color: '#0284c7' },
    { title: 'Total Service Spend', value: '₹5,480', change: 'Avg ₹450/visit', icon: DollarSign, color: '#d97706' },
  ];

  const workerStats = [
    { title: 'Total Earnings', value: '₹24,850', change: '+18% vs last month', icon: DollarSign, color: 'var(--accent-green)' },
    { title: 'Completed Jobs', value: '307', change: '100% completion rate', icon: CheckCircle2, color: '#0284c7' },
    { title: 'Worker Rating', value: '5.0 ★', change: '48 total reviews', icon: ShieldCheck, color: '#d97706' },
  ];

  const recentBookings = [
    {
      id: 'BK-20260818-001',
      worker: 'Ramesh Joshi',
      category: 'Electrician',
      date: 'Aug 20, 2026',
      time: '10:00 AM',
      amount: '₹714',
      status: 'Accepted',
    },
    {
      id: 'BK-20260815-004',
      worker: 'Suresh Patel',
      category: 'Plumber',
      date: 'Aug 15, 2026',
      time: '02:30 PM',
      amount: '₹650',
      status: 'Completed',
    },
  ];

  return (
    <div>
      {/* Dashboard Top Header */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid var(--border-color)', padding: '2rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link> / Dashboard
              </div>
              <h1 style={{ fontSize: '2.25rem', marginBottom: '0.2rem' }}>GigMatch Dashboard</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Manage active appointments, job earnings, and account metrics
              </p>
            </div>

            {/* Role View Switcher */}
            <div
              style={{
                display: 'inline-flex',
                background: '#f1f5f9',
                padding: '0.25rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border-color)',
              }}
            >
              <button
                onClick={() => setActiveRole('customer')}
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  background: activeRole === 'customer' ? '#ffffff' : 'transparent',
                  color: activeRole === 'customer' ? 'var(--text-main)' : 'var(--text-muted)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: activeRole === 'customer' ? 'var(--shadow-sm)' : 'none',
                }}
              >
                Customer View
              </button>
              <button
                onClick={() => setActiveRole('worker')}
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  background: activeRole === 'worker' ? '#ffffff' : 'transparent',
                  color: activeRole === 'worker' ? 'var(--text-main)' : 'var(--text-muted)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: activeRole === 'worker' ? 'var(--shadow-sm)' : 'none',
                }}
              >
                Worker View
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Body */}
      <section className="section">
        <div className="container">
          {/* Stat Cards Row */}
          <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
            {(activeRole === 'customer' ? customerStats : workerStats).map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div key={idx} className="card-white">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>{stat.title}</span>
                      <h2 style={{ fontSize: '2.25rem', marginTop: '0.2rem', color: 'var(--text-main)' }}>{stat.value}</h2>
                    </div>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: 'var(--radius)',
                        background: 'var(--accent-green-soft)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComp size={22} style={{ color: stat.color }} />
                    </div>
                  </div>
                  <span style={{ color: 'var(--accent-green-hover)', fontSize: '0.8rem', fontWeight: 600 }}>{stat.change}</span>
                </div>
              );
            })}
          </div>

          {/* Quick Actions Bar */}
          <div className="card-white" style={{ marginBottom: '2.5rem', padding: '1.25rem 1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Quick Actions</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/workers" className="btn btn-primary btn-sm">
                <Search size={16} /> Find &amp; Book Worker
              </Link>
              <Link to="/bookings" className="btn btn-outline btn-sm">
                <Calendar size={16} /> View All Bookings
              </Link>
              <Link to="/profile" className="btn btn-outline btn-sm">
                <User size={16} /> Edit Profile Info
              </Link>
            </div>
          </div>

          {/* Active Job Table */}
          <div className="card-white">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.15rem' }}>Recent Job Appointments</h3>
              <Link to="/bookings" style={{ color: 'var(--accent-green-hover)', fontSize: '0.85rem', fontWeight: 600 }}>
                View All →
              </Link>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Booking ID</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Worker / Job</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Date &amp; Time</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Callout Fee</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b) => (
                    <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.85rem 0.5rem', fontWeight: 600, color: 'var(--text-main)' }}>{b.id}</td>
                      <td style={{ padding: '0.85rem 0.5rem' }}>
                        <div style={{ fontWeight: 600 }}>{b.worker}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{b.category}</div>
                      </td>
                      <td style={{ padding: '0.85rem 0.5rem', color: 'var(--text-secondary)' }}>{b.date} • {b.time}</td>
                      <td style={{ padding: '0.85rem 0.5rem', fontWeight: 700, color: 'var(--text-main)' }}>{b.amount}</td>
                      <td style={{ padding: '0.85rem 0.5rem' }}>
                        <span
                          className="trust-badge"
                          style={{
                            background: b.status === 'Completed' ? '#dcfce7' : '#e0f2fe',
                            color: b.status === 'Completed' ? '#166534' : '#075985',
                          }}
                        >
                          ✓ {b.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 0.5rem', textAlign: 'right' }}>
                        <Link to="/bookings" className="btn btn-outline btn-sm">
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Dashboard;
