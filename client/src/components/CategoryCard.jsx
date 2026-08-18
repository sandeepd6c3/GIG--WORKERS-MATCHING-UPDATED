import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Droplet, Hammer, Paintbrush, Wind, Tv, Sparkles, Bug, Wrench } from 'lucide-react';

const iconMap = {
  electrician: { Icon: Zap, desc: 'Wiring, switchboards, fittings' },
  plumber: { Icon: Droplet, desc: 'Leak fix, pipe fitting, tank work' },
  carpenter: { Icon: Hammer, desc: 'Furniture, doors, repairs' },
  painter: { Icon: Paintbrush, desc: 'Interior & exterior painting' },
  'ac-repair': { Icon: Wind, desc: 'Installation, gas fill, servicing' },
  'appliance-repair': { Icon: Tv, desc: 'Washing machine, fridge, oven' },
  cleaner: { Icon: Sparkles, desc: 'Deep clean, sofa & carpet wash' },
  pest: { Icon: Bug, desc: 'Cockroach, termite, rodent control' },
};

const CategoryCard = ({ category }) => {
  const { name = 'Service Category', slug = 'electrician', description } = category || {};

  const info = iconMap[slug] || { Icon: Wrench, desc: description || 'Professional verified services' };
  const IconComponent = info.Icon;

  return (
    <Link
      to={`/workers?category=${slug}`}
      className="card-white card-white-hover"
      style={{ display: 'block', textDecoration: 'none', padding: '1.25rem' }}
    >
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '8px',
          background: 'var(--accent-green-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <IconComponent size={22} style={{ color: 'var(--accent-green)' }} />
      </div>

      <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>{name}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem', lineHeight: '1.4' }}>{info.desc}</p>
    </Link>
  );
};

export default CategoryCard;
