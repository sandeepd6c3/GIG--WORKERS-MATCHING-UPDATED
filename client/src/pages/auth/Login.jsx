import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, Lock, AlertCircle, ArrowLeft, RefreshCw, KeyRound, Briefcase, UserCheck } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import GoogleAuthButton from '../../components/auth/GoogleAuthButton';

const Login = () => {
  const { login, sendOTP, verifyOTPAndAuthenticate, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Mode: 'otp' (default passwordless) or 'password' (for admin / legacy credentials)
  const [authMode, setAuthMode] = useState('otp');
  const [channel, setChannel] = useState('email'); // 'email' | 'sms'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  
  // OTP Step: 1 = Enter Identifier, 2 = Enter 6-digit OTP
  const [otpStep, setOtpStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Google Role Onboarding
  const [googleCredential, setGoogleCredential] = useState(null);
  const [googleProfile, setGoogleProfile] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  // Countdown timer for resend
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
        identifier: identifier.trim(),
        channel,
        purpose: 'login'
      });
      setOtpStep(2);
      setCountdown(res.resendCooldownSeconds || 45);
      setInfoMessage(res.message || 'OTP sent successfully!');
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await verifyOTPAndAuthenticate({
        identifier: identifier.trim(),
        channel,
        purpose: 'login',
        otp: otp.trim()
      });

      if (res.user.role === 'admin') navigate('/admin/dashboard');
      else if (res.user.role === 'worker') navigate('/worker/dashboard');
      else navigate('/');
    } catch (err) {
      setError(err.message || 'Verification failed. Please check the code.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login({ email: identifier.trim(), password });
      if (res.user.role === 'admin') navigate('/admin/dashboard');
      else if (res.user.role === 'worker') navigate('/worker/dashboard');
      else navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credential) => {
    setError('');
    setLoading(true);
    try {
      const res = await loginWithGoogle({ credential });
      if (res.requiresRoleSelection) {
        setGoogleCredential(credential);
        setGoogleProfile(res.googleProfile || {});
        setShowRoleModal(true);
        setLoading(false);
        return;
      }

      if (res.user?.role === 'admin') navigate('/admin/dashboard');
      else if (res.user?.role === 'worker') navigate('/worker/dashboard');
      else navigate('/');
    } catch (err) {
      setError(err.message || 'Google authentication failed. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleError = (err) => {
    setError(err?.message || 'Google authentication encountered an error.');
  };

  const handleCompleteGoogleSignup = async (selectedRole) => {
    setError('');
    setLoading(true);
    try {
      const res = await loginWithGoogle({ credential: googleCredential, role: selectedRole });
      setShowRoleModal(false);
      if (res.user?.role === 'worker') navigate('/worker/dashboard');
      else navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to complete registration with Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 140px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <div className="card-white" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Header */}
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
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {authMode === 'otp' ? 'Sign in passwordless with OTP' : 'Sign in using your account password'}
          </p>
        </div>

        {/* Role Selection Modal for New Google Users */}
        {showRoleModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div className="card-white" style={{ maxWidth: '420px', width: '100%', padding: '2rem', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--accent-green-soft)',
                color: 'var(--accent-green)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <UserCheck size={26} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Complete Your Profile
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                {googleProfile?.name ? `Hi ${googleProfile.name}! ` : ''}Select how you plan to use GigMatch:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleCompleteGoogleSignup('customer')}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '0.85rem' }}
                >
                  <UserCheck size={18} /> I want to Hire Gig Workers (Customer)
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleCompleteGoogleSignup('worker')}
                  className="btn btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '0.85rem' }}
                >
                  <Briefcase size={18} /> I want to Offer My Services (Worker)
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowRoleModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.82rem', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

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

        {/* MODE 1: PASSWORDLESS OTP */}
        {authMode === 'otp' && (
          <>
            {otpStep === 1 ? (
              <div>
                {/* Channel Selector: Email vs Mobile */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <button
                    type="button"
                    onClick={() => { setChannel('email'); setIdentifier(''); setError(''); }}
                    style={{
                      padding: '0.65rem',
                      borderRadius: 'var(--radius)',
                      border: `2px solid ${channel === 'email' ? 'var(--accent-green)' : 'var(--border-color)'}`,
                      background: channel === 'email' ? 'var(--accent-green-soft)' : 'var(--bg-surface-elevated)',
                      color: channel === 'email' ? 'var(--accent-green)' : 'var(--text-secondary)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Mail size={16} /> Email
                  </button>
                  <button
                    type="button"
                    onClick={() => { setChannel('sms'); setIdentifier(''); setError(''); }}
                    style={{
                      padding: '0.65rem',
                      borderRadius: 'var(--radius)',
                      border: `2px solid ${channel === 'sms' ? 'var(--accent-green)' : 'var(--border-color)'}`,
                      background: channel === 'sms' ? 'var(--accent-green-soft)' : 'var(--bg-surface-elevated)',
                      color: channel === 'sms' ? 'var(--accent-green)' : 'var(--text-secondary)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Phone size={16} /> Mobile Number
                  </button>
                </div>

                <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                      {channel === 'email' ? 'Email Address' : '10-digit Indian Mobile Number'}
                    </label>
                    <div style={{ position: 'relative' }}>
                      {channel === 'email' ? (
                        <>
                          <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                          <input
                            type="email"
                            required
                            className="form-control"
                            style={{ paddingLeft: '2.4rem' }}
                            placeholder="name@example.com"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
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
                            placeholder="9876543210"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value.replace(/\D/g, ''))}
                          />
                        </>
                      )}
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className="btn btn-primary btn-block" style={{ padding: '0.85rem' }}>
                    {loading ? 'Sending Code...' : 'Send OTP'}
                  </button>
                </form>

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
                  text="signin_with"
                />
              </div>
            ) : (
              /* OTP Verification Step */
              <div>
                <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    Enter the 6-digit code sent to
                  </p>
                  <p style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>
                    {identifier}
                  </p>
                </div>

                <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </form>

                {/* Resend OTP & Back */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem' }}>
                  <button
                    type="button"
                    onClick={() => { setOtpStep(1); setOtp(''); setError(''); }}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    <ArrowLeft size={14} /> Change {channel === 'email' ? 'Email' : 'Number'}
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

            {/* Mode switch for Admin / Password accounts */}
            <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
              <button
                type="button"
                onClick={() => { setAuthMode('password'); setError(''); setInfoMessage(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.82rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <KeyRound size={14} /> Sign in with Password / Admin Account
              </button>
            </div>
          </>
        )}

        {/* MODE 2: LEGACY / ADMIN PASSWORD LOGIN */}
        {authMode === 'password' && (
          <>
            <form onSubmit={handlePasswordLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    required
                    className="form-control"
                    style={{ paddingLeft: '2.4rem' }}
                    placeholder="admin@gigmatch.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Password</label>
                  <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--accent-green)' }}>Forgot password?</Link>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    required
                    className="form-control"
                    style={{ paddingLeft: '2.4rem' }}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary btn-block" style={{ padding: '0.85rem' }}>
                {loading ? 'Signing In...' : 'Log In with Password'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
              <button
                type="button"
                onClick={() => { setAuthMode('otp'); setOtpStep(1); setError(''); setInfoMessage(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--accent-green)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
              >
                &larr; Switch back to Passwordless OTP Login
              </button>
            </div>
          </>
        )}

        <p style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--accent-green)', fontWeight: 600 }}>Register Now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
