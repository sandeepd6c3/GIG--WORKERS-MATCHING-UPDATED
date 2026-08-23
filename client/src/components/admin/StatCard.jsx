import React from 'react';

const StatCard = ({ title, value, icon: Icon, change, color = '#20b486' }) => {
  return (
    <div className="card-white" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 500 }}>{title}</span>
        <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginTop: '0.2rem', marginBottom: '0.2rem' }}>{value}</h3>
        {change && (
          <span style={{ fontSize: '0.78rem', color: color, fontWeight: 600 }}>
            {change}
          </span>
        )}
      </div>
      {Icon && (
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: `${color}15`,
          color: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon size={24} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
