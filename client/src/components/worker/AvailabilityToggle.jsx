import React, { useState } from 'react';
import workerService from '../../services/workerService';

const AvailabilityToggle = ({ initialAvailable = true }) => {
  const [isAvailable, setIsAvailable] = useState(initialAvailable);
  const [updating, setUpdating] = useState(false);

  const handleToggle = async () => {
    setUpdating(true);
    try {
      const nextState = !isAvailable;
      await workerService.updateAvailability(nextState);
      setIsAvailable(nextState);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div style={{
      background: isAvailable ? 'var(--accent-green-soft)' : 'var(--bg-surface)',
      border: `1px solid ${isAvailable ? 'var(--accent-green-border)' : 'var(--border-color)'}`,
      borderRadius: 'var(--radius)',
      padding: '0.75rem 1.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      maxWidth: '380px',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div>
        <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.15rem' }}>
          {isAvailable ? '🟢 Online & Accepting Jobs' : '⚪ Offline / Unavailable'}
        </h4>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {isAvailable ? 'Visible to customers in instant search' : 'Hidden from active job matching'}
        </span>
      </div>

      <button
        onClick={handleToggle}
        disabled={updating}
        style={{
          width: '48px',
          height: '26px',
          borderRadius: '13px',
          background: isAvailable ? 'var(--accent-green)' : '#334155',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          transition: 'var(--transition)',
          flexShrink: 0
        }}
      >
        <div style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: '#ffffff',
          position: 'absolute',
          top: '3px',
          left: isAvailable ? '25px' : '3px',
          transition: 'var(--transition)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
        }} />
      </button>
    </div>
  );
};

export default AvailabilityToggle;

