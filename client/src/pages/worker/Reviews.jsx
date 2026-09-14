import React from 'react';
import { Star } from 'lucide-react';

const WorkerReviews = () => {
  const reviews = [
    { id: 'r1', customer: 'Alex Morgan', rating: 5, date: '3 days ago', comment: 'Sarah did an exceptional job installing smart switches throughout our house. Punctual, polite, and extremely clean work!' },
    { id: 'r2', customer: 'Robert Chen', rating: 5, date: '1 week ago', comment: 'Diagnosed a tricky short circuit problem in under 30 minutes. Highly recommended Gold Tier electrician!' }
  ];

  return (
    <div className="section container">
      <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>Customer Reviews</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Feedback and ratings submitted by hiring clients</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {reviews.map((rev) => (
          <div key={rev.id} className="card-white card-white-hover">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>{rev.customer}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24', fontWeight: 700 }}>
                <Star size={16} fill="#fbbf24" /> {rev.rating}.0
              </div>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '0.65rem', lineHeight: 1.6 }}>{rev.comment}</p>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{rev.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerReviews;

