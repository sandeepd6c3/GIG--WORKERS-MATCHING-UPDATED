import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const WorkerCard = ({ worker }) => {
  const {
    _id = '1',
    userId = {},
    categoryId = {},
    name = userId.name || worker.name || 'Ramesh Joshi',
    categoryName = categoryId.name || worker.category || 'Electrician',
    city = worker.location?.address?.city || worker.city || 'Hyderabad',
    trustTier = worker.trustTier || 'gold',
    averageRating = worker.averageRating || 5.0,
    completedJobs = worker.completedJobs || 307,
    experienceYears = worker.experienceYears || 11,
    isAvailable = worker.isAvailable !== undefined ? worker.isAvailable : true,
    basePrice = worker.basePrice || 714,
  } = worker || {};

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const getBadge = () => {
    if (trustTier === 'gold') {
      return <span className="trust-badge gold">✓ Gold Verified</span>;
    }
    if (trustTier === 'silver') {
      return <span className="trust-badge silver">✓ Silver Verified</span>;
    }
    return <span className="trust-badge bronze">✓ Bronze Verified</span>;
  };

  return (
    <div className="card-white card-white-hover" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.85rem' }}>
        <div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-color)',
            color: 'var(--accent-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '1.1rem',
            flexShrink: 0,
          }}
        >
          {initials}
        </div>

        <div>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.15rem' }}>{name}</h3>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>⚡ {categoryName}</span>
            <span>•</span>
            <span>{city}</span>
          </div>
        </div>
      </div>

      {/* Trust Badge */}
      <div style={{ marginBottom: '1rem' }}>
        {getBadge()}
      </div>

      {/* Rating & Exp Stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        <span style={{ color: '#fbbf24', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <Star size={14} fill="#fbbf24" /> {averageRating.toFixed(1)}
        </span>
        <span>{completedJobs} jobs done</span>
        <span>{experienceYears} yrs exp</span>
      </div>

      {/* Availability & Price */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: isAvailable ? 'var(--accent-green)' : 'var(--text-muted)', fontWeight: 500 }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isAvailable ? 'var(--accent-green)' : 'var(--text-muted)' }} />
          {isAvailable ? 'Available today' : 'Unavailable'}
        </div>

        <div>
          <strong style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>₹{basePrice}</strong>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>/visit</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ marginTop: 'auto', display: 'flex', gap: '0.65rem' }}>
        <Link to={`/workers/${_id}`} className="btn btn-outline btn-sm" style={{ flex: 1 }}>
          View profile
        </Link>
        <Link to={`/workers/${_id}`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
          Book now
        </Link>
      </div>
    </div>
  );
};

export default WorkerCard;

