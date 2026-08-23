import React, { useState, useEffect } from 'react';
import bookingService from '../../services/bookingService';
import Loader from '../../components/common/Loader';
import { formatDate, formatTime, formatCurrency } from '../../utils/helpers';
import { Calendar, Clock, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingService.getMyBookings()
      .then(res => setBookings(res))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Fetching your gig bookings..." />;

  return (
    <div className="section container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>My Bookings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Track and manage your scheduled gig services</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {bookings.length > 0 ? (
          bookings.map((b) => (
            <div key={b._id} className="card-white" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {b.workerAvatar && (
                  <img src={b.workerAvatar} alt={b.workerName} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                )}
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-green)', textTransform: 'uppercase' }}>
                    {b.category}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', marginTop: '0.1rem' }}>{b.workerName}</h3>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={14} /> {formatDate(b.date)}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> {formatTime(b.time)}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> {b.address}</span>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'capitalize',
                  marginBottom: '0.5rem',
                  background: b.status === 'accepted' ? '#dcfce7' : b.status === 'pending' ? '#fef3c7' : '#f1f5f9',
                  color: b.status === 'accepted' ? '#15803d' : b.status === 'pending' ? '#b45309' : '#475569'
                }}>
                  {b.status}
                </span>
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{formatCurrency(b.totalAmount)}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="card-white" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <h3>No Bookings Found</h3>
            <p style={{ color: 'var(--text-muted)' }}>You haven't scheduled any gig services yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
