import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, CheckCircle, Shield } from 'lucide-react';
import { formatCurrency, getBadgeColorClass } from '../../utils/helpers';

const WorkerCard = ({ worker }) => {
  const badgeClass = getBadgeColorClass(worker.trustTier);

  return (
    <div className="card-white card-white-hover" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <img
          src={worker.avatar}
          alt={worker.name}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid var(--border-color)',
            background: 'var(--bg-surface-elevated)'
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.15rem', color: 'var(--text-main)' }}>{worker.name}</h3>
            <span className={`trust-badge ${badgeClass}`}>
              <Shield size={12} /> {worker.trustTier || 'Silver Tier'}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>{worker.title}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24', fontWeight: 600 }}>
              <Star size={14} fill="#fbbf24" /> {worker.rating} ({worker.reviewsCount})
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <MapPin size={13} color="var(--text-muted)" /> {worker.distance || worker.location}
            </span>
          </div>
        </div>
      </div>

      <p style={{
        fontSize: '0.875rem',
        color: 'var(--text-secondary)',
        marginBottom: '1.25rem',
        flex: 1,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        lineHeight: 1.5
      }}>
        {worker.bio}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
        {worker.skills?.slice(0, 3).map((skill, idx) => (
          <span key={idx} style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            fontSize: '0.75rem',
            fontWeight: 500,
            padding: '0.2rem 0.55rem',
            borderRadius: 'var(--radius-sm)'
          }}>
            {skill}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{formatCurrency(worker.hourlyRate)}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/hr</span>
        </div>
        <Link to={`/workers/${worker._id}`} className="btn btn-primary btn-sm">
          View & Book
        </Link>
      </div>
    </div>
  );
};

export default WorkerCard;

