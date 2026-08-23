import React, { useState } from 'react';
import { ShieldCheck, Upload, CheckCircle2 } from 'lucide-react';

const WorkerVerification = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="section container" style={{ maxWidth: '600px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>Trust & Verification Badge</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Upload trade certification & identity documents to earn Gold / Silver Trust Badges</p>

      <div className="card-white">
        {!submitted ? (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Government Issued ID / Passport</label>
              <input type="file" className="form-control" required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Trade License / Certification (PDF / JPG)</label>
              <input type="file" className="form-control" required />
            </div>

            <button type="submit" className="btn btn-primary btn-block" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
              <Upload size={18} /> Submit Documents for Admin Verification
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle2 size={54} color="var(--accent-green)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Documents Under Review</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Our admin compliance team will verify your credentials within 24 hours to award your Gold Tier Trust Badge.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerVerification;
