import React from 'react';
import { DollarSign, TrendingUp, Briefcase, Award } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const EarningsCard = ({ totalEarnings = 1450, completedJobs = 34, pendingPayout = 210, rating = 4.9 }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
      <div className="card-white" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(32, 180, 134, 0.15)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DollarSign size={24} />
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Earnings</span>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginTop: '0.1rem' }}>{formatCurrency(totalEarnings)}</h3>
        </div>
      </div>

      <div className="card-white" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Briefcase size={24} />
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Completed Jobs</span>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginTop: '0.1rem' }}>{completedJobs}</h3>
        </div>
      </div>

      <div className="card-white" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TrendingUp size={24} />
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pending Payout</span>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginTop: '0.1rem' }}>{formatCurrency(pendingPayout)}</h3>
        </div>
      </div>
    </div>
  );
};

export default EarningsCard;
