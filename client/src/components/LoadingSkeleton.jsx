import React from 'react';

const LoadingSkeleton = ({ count = 3, type = 'card' }) => {
  return (
    <div className="grid-3">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="ui-card" style={{ opacity: 0.6, animation: 'pulse 1.5s infinite ease-in-out' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--border)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ width: '60%', height: '16px', backgroundColor: 'var(--border)', borderRadius: '4px', marginBottom: '0.5rem' }} />
              <div style={{ width: '40%', height: '12px', backgroundColor: 'var(--border)', borderRadius: '4px' }} />
            </div>
          </div>
          <div style={{ width: '100%', height: '40px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius)', marginBottom: '1rem' }} />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ flex: 1, height: '36px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius)' }} />
            <div style={{ flex: 1, height: '36px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius)' }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
