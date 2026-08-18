import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Register = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'worker' ? 'worker' : 'customer';

  const [role, setRole] = useState(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="section" style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '460px' }}>
        <div className="card-white" style={{ padding: '2.5rem 2rem', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>Create your account</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Join GigMatch AI as a customer or as a verified worker.</p>
          </div>

          {/* Role Toggle Tabs */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
              background: '#f1f5f9',
              padding: '0.3rem',
              borderRadius: 'var(--radius)',
              marginBottom: '1.5rem',
            }}
          >
            <button
              type="button"
              onClick={() => setRole('customer')}
              style={{
                padding: '0.65rem',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                background: role === 'customer' ? '#ffffff' : 'transparent',
                color: role === 'customer' ? 'var(--text-main)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                boxShadow: role === 'customer' ? 'var(--shadow-sm)' : 'none',
              }}
            >
              I need a service
            </button>

            <button
              type="button"
              onClick={() => setRole('worker')}
              style={{
                padding: '0.65rem',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                background: role === 'worker' ? '#ffffff' : 'transparent',
                color: role === 'worker' ? 'var(--text-main)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                boxShadow: role === 'worker' ? 'var(--shadow-sm)' : 'none',
              }}
            >
              I offer a service
            </button>
          </div>

          {/* Register Form */}
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Full name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Phone number
              </label>
              <input
                type="tel"
                className="form-control"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Conditional Worker Category Select */}
            {role === 'worker' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  Your service category
                </label>
                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="electrician">Electrician</option>
                  <option value="plumber">Plumber</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="painter">Painter</option>
                  <option value="ac-repair">AC Repair & Service</option>
                  <option value="cleaner">Home Cleaning</option>
                </select>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block" style={{ padding: '0.75rem', marginTop: '0.5rem' }}>
              Create account
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--accent-green)', fontWeight: 600 }}>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
