import React, { useState } from 'react';
import { ShieldCheck, Upload, CheckCircle2 } from 'lucide-react';

const WorkerVerification = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="section container" style={{ maxWidth: '620px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>Trust & Verification Badge</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Upload trade certification & identity documents to earn Gold / Silver Trust Badges</p>

      <div className="card-white" style={{ padding: '2rem' }}>
        {!submitted ? (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Government Issued ID / Passport</label>
              <input type="file" className="form-control" required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Trade License / Certification (PDF / JPG)</label>
              <input type="file" className="form-control" required />
            </div>

            <button type="submit" className="btn btn-primary btn-block" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', padding: '0.85rem' }}>
              <Upload size={18} /> Submit Documents for Verification
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
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
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Documents Under Review</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Our compliance team will verify your credentials within 24 hours to award your Gold Tier Trust Badge.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerVerification;

