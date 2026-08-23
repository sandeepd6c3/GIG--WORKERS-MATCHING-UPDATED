import React from 'react';

const Loader = ({ label = 'Loading GigMatch...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', padding: '2rem' }}>
      <div style={{
        width: '44px',
        height: '44px',
        border: '4px solid rgba(32, 180, 134, 0.15)',
        borderTop: '4px solid var(--accent-green)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <span style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>
        {label}
      </span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
