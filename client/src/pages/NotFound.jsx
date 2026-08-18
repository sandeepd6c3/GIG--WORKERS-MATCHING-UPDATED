import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <div
        style={{
          width: '76px',
          height: '76px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}
      >
        <AlertCircle size={36} style={{ color: 'var(--danger)' }} />
      </div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>404 - Page Not Found</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '450px', margin: '0 auto 2rem' }}>
        The requested resource or page path does not exist on GigMatch AI.
      </p>
      <Link to="/" className="ui-btn ui-btn-primary">
        <Home size={18} /> Return to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
