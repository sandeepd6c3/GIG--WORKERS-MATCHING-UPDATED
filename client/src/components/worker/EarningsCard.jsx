import React from 'react';
import { DollarSign, TrendingUp, Briefcase, Award } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const EarningsCard = ({ totalEarnings = 1450, completedJobs = 34, pendingPayout = 210, rating = 4.9 }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
      <div className="card-white" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          background: 'var(--accent-green-soft)',
          border: '1px solid var(--accent-green-border)',
          color: 'var(--accent-green)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'
        }}>
          <DollarSign size={24} />
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Earnings</span>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '0.15rem', fontFamily: 'Sora, sans-serif' }}>{formatCurrency(totalEarnings)}</h3>
        </div>
      </div>

      <div className="card-white" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          background: 'rgba(59, 130, 246, 0.12)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          color: '#3b82f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)'
        }}>
          <Briefcase size={24} />
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Completed Jobs</span>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '0.15rem', fontFamily: 'Sora, sans-serif' }}>{completedJobs}</h3>
        </div>
      </div>

      <div className="card-white" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          color: '#fbbf24',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)'
        }}>
          <TrendingUp size={24} />
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pending Payout</span>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '0.15rem', fontFamily: 'Sora, sans-serif' }}>{formatCurrency(pendingPayout)}</h3>
        </div>
      </div>
    </div>
  );
};

export default EarningsCard;

