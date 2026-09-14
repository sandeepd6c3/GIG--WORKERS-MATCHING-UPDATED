import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Shield, CheckCircle2, Calendar, Clock, DollarSign, Award } from 'lucide-react';
import workerService from '../../services/workerService';
import { formatCurrency, getBadgeColorClass } from '../../utils/helpers';
import Loader from '../../components/common/Loader';

const WorkerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    workerService.getWorkerById(id)
      .then(res => setWorker(res))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader label="Loading worker profile..." />;
  if (!worker) return <div className="container section">Worker not found</div>;

  const badgeClass = getBadgeColorClass(worker.trustTier);

  return (
    <div className="section container">
      <div className="profile-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Left Column: Info & Details */}
        <div>
          <div className="card-white" style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <img
              src={worker.avatar}
              alt={worker.name}
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--accent-green)',
                background: 'var(--bg-surface-elevated)'
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>{worker.name}</h1>
                <span className={`trust-badge ${badgeClass}`}>
                  <Shield size={14} /> {worker.trustTier || 'Silver Tier'}
                </span>
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>{worker.title}</p>
              
              <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24', fontWeight: 700 }}>
                  <Star size={16} fill="#fbbf24" /> {worker.rating} ({worker.reviewsCount} reviews)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={16} color="var(--text-muted)" /> {worker.location}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-green)', fontWeight: 600 }}>
                  <CheckCircle2 size={16} /> {worker.completedJobs || 120} Jobs Done
                </span>
              </div>
            </div>
          </div>

          <div className="card-white" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-main)' }}>About Me</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>{worker.bio}</p>
          </div>

          <div className="card-white">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Skills & Expertise</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {worker.skills?.map((skill, i) => (
                <span key={i} style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}>
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Booking Box */}
        <div>
          <div className="card-white" style={{ position: 'sticky', top: '90px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hourly Rate</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {formatCurrency(worker.hourlyRate)}<span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/hr</span>
                </div>
              </div>
              <span style={{
                background: worker.isAvailable ? 'var(--accent-green-soft)' : 'rgba(239, 68, 68, 0.12)',
                border: `1px solid ${worker.isAvailable ? 'var(--accent-green-border)' : 'rgba(239, 68, 68, 0.3)'}`,
                color: worker.isAvailable ? 'var(--accent-green)' : '#f87171',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                {worker.isAvailable ? 'Available Now' : 'Busy'}
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Instant booking with transparent pricing & customer protection policy.
            </p>

            <button
              onClick={() => navigate(`/booking/${worker._id}`)}
              className="btn btn-primary btn-block"
              style={{ padding: '0.85rem' }}
            >
              Book Service Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WorkerProfile;

