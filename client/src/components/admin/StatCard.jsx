import React from 'react';

const StatCard = ({ title, value, icon: Icon, change, color = 'var(--accent-green)' }) => {
  return (
    <div className="card-white" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 500 }}>{title}</span>
        <h3 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginTop: '0.25rem', marginBottom: '0.25rem', fontFamily: 'Sora, sans-serif' }}>{value}</h3>
        {change && (
          <span style={{ fontSize: '0.78rem', color: color, fontWeight: 600 }}>
            {change}
          </span>
        )}
      </div>
      {Icon && (
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-color)',
          color: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <Icon size={24} />
        </div>
      )}
    </div>
  );
};

export default StatCard;

