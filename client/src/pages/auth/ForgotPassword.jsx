import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle, KeyRound } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 140px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <div className="card-white" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
        {!submitted ? (
          <>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'var(--accent-green-soft)',
              border: '1px solid var(--accent-green-border)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-green)',
              marginBottom: '1rem',
              boxShadow: 'var(--accent-green-glow)'
            }}>
              <KeyRound size={28} />
            </div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>Reset Password</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
              Enter your account email to receive a password reset verification link.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  required
                  className="form-control"
                  style={{ paddingLeft: '2.4rem' }}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block" style={{ padding: '0.85rem' }}>
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <div>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--accent-green-soft)',
              border: '1px solid var(--accent-green-border)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-green)',
              marginBottom: '1.25rem',
              boxShadow: 'var(--accent-green-glow)'
            }}>
              <CheckCircle size={34} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Check Your Email</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
              We sent password reset instructions to <strong style={{ color: 'var(--text-main)' }}>{email}</strong>
            </p>
          </div>
        )}
        <Link to="/login" style={{ display: 'inline-block', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--accent-green)', fontWeight: 600 }}>
          ← Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;

