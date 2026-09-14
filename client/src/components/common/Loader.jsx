import React from 'react';

const Loader = ({ label = 'Loading GigMatch...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '260px', padding: '2rem' }}>
      <div style={{
        width: '44px',
        height: '44px',
        border: '3px solid rgba(16, 185, 129, 0.15)',
        borderTop: '3px solid var(--accent-green)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        boxShadow: 'var(--accent-green-glow)'
      }} />
      <span style={{ marginTop: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.92rem', fontWeight: 500 }}>
        {label}
      </span>
    </div>
  );
};

export default Loader;

