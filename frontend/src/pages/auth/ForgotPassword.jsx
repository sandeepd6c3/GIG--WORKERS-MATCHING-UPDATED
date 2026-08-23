import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 140px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div className="card-white" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem', textAlign: 'center' }}>
        {!submitted ? (
          <>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Reset Password</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Enter your account email to receive a password reset link.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <input
                type="email"
                required
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-block">Send Reset Link</button>
            </form>
          </>
        ) : (
          <div>
            <CheckCircle size={48} color="var(--accent-green)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Check Your Email</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              We sent password reset instructions to <strong>{email}</strong>
            </p>
          </div>
        )}
        <Link to="/login" style={{ display: 'inline-block', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--accent-green)', fontWeight: 600 }}>
          ← Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
