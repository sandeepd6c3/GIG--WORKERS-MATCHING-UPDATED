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
          style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #e2e8f0' }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.15rem' }}>{worker.name}</h3>
            <span className={`trust-badge ${badgeClass}`}>
              <Shield size={12} /> {worker.trustTier || 'Silver Tier'}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>{worker.title}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#d97706', fontWeight: 600 }}>
              <Star size={14} fill="#d97706" /> {worker.rating} ({worker.reviewsCount})
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <MapPin size={13} /> {worker.distance || worker.location}
            </span>
          </div>
        </div>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {worker.bio}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
        {worker.skills?.slice(0, 3).map((skill, idx) => (
          <span key={idx} style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.75rem', fontWeight: 500, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
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
          View Profile & Book
        </Link>
      </div>
    </div>
  );
};

export default WorkerCard;
