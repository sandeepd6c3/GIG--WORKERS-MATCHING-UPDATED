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
      <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>Earnings & Payouts</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Detailed summary of total platform earnings and payout history</p>

      <EarningsCard totalEarnings={1850} completedJobs={42} pendingPayout={320} />

      <div className="card-white">
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Payout History</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {payouts.map((p) => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: '#f8fafc', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{formatCurrency(p.amount)}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.date} • {p.method}</div>
              </div>
              <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
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
