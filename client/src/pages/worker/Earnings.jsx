import React from 'react';
import EarningsCard from '../../components/worker/EarningsCard';
import { DollarSign, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const WorkerEarnings = () => {
  const payouts = [
    { id: 'p1', date: '2026-08-20', amount: 450, status: 'Completed', method: 'Direct Deposit ****4920' },
    { id: 'p2', date: '2026-08-13', amount: 620, status: 'Completed', method: 'Direct Deposit ****4920' },
    { id: 'p3', date: '2026-08-06', amount: 380, status: 'Completed', method: 'Direct Deposit ****4920' }
  ];

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

