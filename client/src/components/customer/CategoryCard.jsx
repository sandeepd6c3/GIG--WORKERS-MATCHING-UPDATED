import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

const CategoryCard = ({ category }) => {
  // Dynamically render icon component if present
  const IconComponent = Icons[category.icon] || Icons.Wrench;

  return (
    <Link to={`/workers?category=${category.slug}`} className="card-white card-white-hover" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      textDecoration: 'none',
      cursor: 'pointer'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: 'var(--accent-green-soft)',
        color: 'var(--accent-green)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem'
      }}>
        <IconComponent size={24} />
      </div>

      <h3 style={{ fontSize: '1.05rem', marginBottom: '0.35rem', color: 'var(--text-main)' }}>
        {category.name}
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.4 }}>
        {category.description || 'Verified gig specialists available near you.'}
      </p>

      <span style={{ marginTop: 'auto', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        {category.count || 50}+ Workers Available →
      </span>
    </Link>
  );
};

export default CategoryCard;
