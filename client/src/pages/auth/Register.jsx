import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Mail, Phone, AlertCircle, ArrowLeft, RefreshCw, Briefcase } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import GoogleAuthButton from '../../components/auth/GoogleAuthButton';

const Register = () => {
  const { sendOTP, verifyOTPAndAuthenticate, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Registration form state
  const [formData, setFormData] = useState({
    name: '',
    role: 'customer', // 'customer' | 'worker'
    channel: 'email', // 'email' | 'sms'
    identifier: ''
  });

  // Step 1 = Details + Send OTP, Step 2 = Enter 6-digit OTP
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setInfoMessage('');
    setLoading(true);

    try {
      const res = await sendOTP({
        identifier: formData.identifier.trim(),
        channel: formData.channel,
        purpose: 'signup',
        name: formData.name.trim(),
        role: formData.role
      });
      setStep(2);
      setCountdown(res.resendCooldownSeconds || 45);
      setInfoMessage(res.message || 'Verification code sent successfully!');
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndCreateAccount = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await verifyOTPAndAuthenticate({
        identifier: formData.identifier.trim(),
        channel: formData.channel,
        purpose: 'signup',
        otp: otp.trim()
      });

      if (res.user?.role === 'worker') {
        navigate('/worker/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Verification failed. Please check the code.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credential) => {
    setError('');
    setLoading(true);
    try {
      const res = await loginWithGoogle({ credential, role: formData.role });
      if (res.user?.role === 'worker') {
        navigate('/worker/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Google registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = (err) => {
    setError(err?.message || 'Google authentication encountered an error.');
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 140px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <div className="card-white" style={{ width: '100%', maxWidth: '480px', padding: '2.5rem', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            background: 'var(--accent-green-soft)',
            border: '1px solid var(--accent-green-border)',
            color: 'var(--accent-green)',
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            boxShadow: 'var(--accent-green-glow)'
          }}>
            <ShieldCheck size={30} />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>Create Your Account</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {step === 1 ? 'Passwordless verification with Email or Mobile' : 'Verify OTP to activate your account'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius)',
            fontSize: '0.875rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Info Alert */}
        {infoMessage && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: 'var(--accent-green)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius)',
            fontSize: '0.875rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>{infoMessage}</span>
          </div>
        )}

        {/* STEP 1: Enter Info & Send OTP */}
        {step === 1 ? (
          <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Account Type Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>I want to...</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'customer' })}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius)',
                    border: `2px solid ${formData.role === 'customer' ? 'var(--accent-green)' : 'var(--border-color)'}`,
                    background: formData.role === 'customer' ? 'var(--accent-green-soft)' : 'var(--bg-surface-elevated)',
                    color: formData.role === 'customer' ? 'var(--accent-green)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    transition: 'var(--transition)'
                  }}
                >
                  Hire Gig Workers
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'worker' })}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius)',
                    border: `2px solid ${formData.role === 'worker' ? 'var(--accent-green)' : 'var(--border-color)'}`,
                    background: formData.role === 'worker' ? 'var(--accent-green-soft)' : 'var(--bg-surface-elevated)',
                    color: formData.role === 'worker' ? 'var(--accent-green)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    transition: 'var(--transition)'
                  }}
                >
                  Offer My Services
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  required
                  className="form-control"
                  style={{ paddingLeft: '2.4rem' }}
                  placeholder="Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            {/* Verification Channel Toggle: Email vs Mobile */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Sign Up With</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, channel: 'email', identifier: '' })}
                  style={{
                    padding: '0.6rem',
                    borderRadius: 'var(--radius)',
                    border: `2px solid ${formData.channel === 'email' ? 'var(--accent-green)' : 'var(--border-color)'}`,
                    background: formData.channel === 'email' ? 'var(--accent-green-soft)' : 'var(--bg-surface-elevated)',
                    color: formData.channel === 'email' ? 'var(--accent-green)' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Mail size={15} /> Email Address
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, channel: 'sms', identifier: '' })}
                  style={{
                    padding: '0.6rem',
                    borderRadius: 'var(--radius)',
                    border: `2px solid ${formData.channel === 'sms' ? 'var(--accent-green)' : 'var(--border-color)'}`,
                    background: formData.channel === 'sms' ? 'var(--accent-green-soft)' : 'var(--bg-surface-elevated)',
                    color: formData.channel === 'sms' ? 'var(--accent-green)' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Phone size={15} /> Mobile Number
                </button>
              </div>

              {/* Identifier Input */}
              <div style={{ position: 'relative' }}>
                {formData.channel === 'email' ? (
                  <>
                    <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="email"
                      required
                      className="form-control"
                      style={{ paddingLeft: '2.4rem' }}
                      placeholder="name@example.com"
                      value={formData.identifier}
                      onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                    />
                  </>
                ) : (
                  <>
                    <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      className="form-control"
                      style={{ paddingLeft: '2.4rem' }}
                      placeholder="9876543210 (10-digit Indian Number)"
                      value={formData.identifier}
                      onChange={(e) => setFormData({ ...formData, identifier: e.target.value.replace(/\D/g, '') })}
                    />
                  </>
                )}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary btn-block" style={{ padding: '0.85rem' }}>
              {loading ? 'Sending Code...' : 'Send OTP'}
            </button>

            {/* Google OAuth Button */}
            <div style={{ margin: '1.5rem 0', textAlign: 'center', position: 'relative' }}>
              <div style={{ borderTop: '1px solid var(--border-color)', position: 'absolute', width: '100%', top: '50%' }}></div>
              <span style={{ background: 'var(--bg-surface)', padding: '0 0.75rem', position: 'relative', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                OR
              </span>
            </div>

            <GoogleAuthButton
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              disabled={loading}
              text="signup_with"
            />
          </form>
        ) : (
          /* STEP 2: Verify 6-digit OTP */
          <div>
            <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Enter the 6-digit code sent to
              </p>
              <p style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>
                {formData.identifier}
              </p>
            </div>

            <form onSubmit={handleVerifyAndCreateAccount} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <input
                  type="text"
                  required
                  autoFocus
                  maxLength={6}
                  className="form-control"
                  style={{
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    letterSpacing: '0.4rem',
                    fontWeight: 700
                  }}
                  placeholder="••••••"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                />
              </div>

              <button type="submit" disabled={loading || otp.length !== 6} className="btn btn-primary btn-block" style={{ padding: '0.85rem' }}>
                {loading ? 'Verifying...' : 'Verify & Create Account'}
              </button>
            </form>

            {/* Resend & Change Identifier */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem' }}>
              <button
                type="button"
                onClick={() => { setStep(1); setOtp(''); setError(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                <ArrowLeft size={14} /> Back
              </button>

              <button
                type="button"
                disabled={countdown > 0 || loading}
                onClick={() => handleSendOTP()}
                style={{
                  background: 'none',
                  border: 'none',
                  color: countdown > 0 ? 'var(--text-muted)' : 'var(--accent-green)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: countdown > 0 ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <RefreshCw size={14} className={loading ? 'spin' : ''} />
                {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
              </button>
            </div>
          </div>
        )}

        <p style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent-green)', fontWeight: 600 }}>Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
