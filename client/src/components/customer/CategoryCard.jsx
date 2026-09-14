import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

const CategoryCard = ({ category }) => {
  // Dynamically render icon component if present
  const IconComponent = Icons[category.icon] || Icons.Wrench;

  return (
    <Link to={`/workers?category=${category.slug || category.name.toLowerCase()}`} className="card-white card-white-hover" style={{
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
        border: '1px solid var(--accent-green-border)',
        color: 'var(--accent-green)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'
      }}>
        <IconComponent size={24} />
      </div>

      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem', color: 'var(--text-main)' }}>
        {category.name}
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
        {category.description || 'Verified gig specialists available near you.'}
      </p>

      <span style={{ marginTop: 'auto', fontSize: '0.825rem', fontWeight: 600, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        {category.count || 50}+ Workers Available →
      </span>
    </Link>
  );
};

export default CategoryCard;

