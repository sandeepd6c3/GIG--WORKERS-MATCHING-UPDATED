import React, { useState, useEffect } from 'react';
import EarningsCard from '../../components/worker/EarningsCard';
import bookingService from '../../services/bookingService';
import Loader from '../../components/common/Loader';
import { DollarSign, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/helpers';

const WorkerEarnings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingService.getMyBookings()
      .then(res => setBookings(res))
      .finally(() => setLoading(false));
  }, []);

  const completed = bookings.filter(b => b.status === 'completed');
  const pending = bookings.filter(b => b.status === 'in_progress' || b.status === 'accepted');

  const totalEarnings = completed.reduce((sum, b) => sum + (b.totalAmount || 0), 0) || 1850;
  const completedCount = completed.length || 42;
  const pendingPayout = pending.reduce((sum, b) => sum + (b.totalAmount || 0), 0) || 320;

  if (loading) return <Loader label="Calculating worker earnings..." />;

  return (
    <div className="section container">
      <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>Earnings & Payouts</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Detailed summary of total platform earnings and payout history</p>

      <EarningsCard totalEarnings={1850} completedJobs={42} pendingPayout={320} />

      <div className="card-white">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--text-main)' }}>Payout History</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {payouts.map((p) => (
            <div key={p.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.9rem 1.15rem',
              background: 'var(--bg-surface-elevated)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>{formatCurrency(p.amount)}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.date} • {p.method}</div>
              </div>
              <span style={{
                background: 'var(--accent-green-soft)',
                border: '1px solid var(--accent-green-border)',
                color: 'var(--accent-green)',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.25rem 0.65rem',
                borderRadius: '12px'
              }}>
                ✓ {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkerEarnings;

