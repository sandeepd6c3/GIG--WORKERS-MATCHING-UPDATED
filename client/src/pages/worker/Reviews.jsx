import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';
import Loader from '../../components/common/Loader';
import { Star } from 'lucide-react';

const WorkerReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const id = user?.workerId || user?._id;
        const res = await api.get(`/reviews/worker/${id}`);
        setReviews(res.data || res || []);
      } catch (err) {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchReviews();
    else setLoading(false);
  }, [user]);

  if (loading) return <Loader label="Loading customer reviews..." />;

  return (
    <div className="section container">
      <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>Customer Reviews</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Feedback and ratings submitted by hiring clients</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev._id || rev.id} className="card-white card-white-hover">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>{rev.customerId?.name || rev.customer || 'Valued Customer'}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24', fontWeight: 700 }}>
                  <Star size={16} fill="#fbbf24" /> {rev.rating}.0
                </div>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '0.65rem', lineHeight: 1.6 }}>{rev.comment}</p>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : (rev.date || 'Recent')}</span>
            </div>
          ))
        ) : (
          <div className="card-white" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>No Reviews Yet</h3>
            <p style={{ color: 'var(--text-muted)' }}>Completed jobs will display customer ratings and feedback here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerReviews;

