import React, { useState, useEffect } from 'react';
import bookingService from '../../services/bookingService';
import Loader from '../../components/common/Loader';
import { formatDate, formatTime, formatCurrency } from '../../utils/helpers';
import { Calendar, Clock, MapPin } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingService.getMyBookings()
      .then(res => setBookings(res))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Fetching your gig bookings..." />;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted': return { bg: 'rgba(16, 185, 129, 0.12)', text: '#34d399', border: 'rgba(16, 185, 129, 0.3)' };
      case 'pending': return { bg: 'rgba(245, 158, 11, 0.12)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' };
      case 'completed': return { bg: 'rgba(99, 102, 241, 0.12)', text: '#818cf8', border: 'rgba(99, 102, 241, 0.3)' };
      default: return { bg: 'var(--bg-surface-elevated)', text: 'var(--text-secondary)', border: 'var(--border-color)' };
    }
  };

  return (
    <div className="section container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>My Bookings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Track and manage your scheduled gig services</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {bookings.length > 0 ? (
          bookings.map((b) => {
            const badge = getStatusBadge(b.status);
            return (
              <div key={b._id} className="card-white card-white-hover" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {b.workerAvatar ? (
                    <img src={b.workerAvatar} alt={b.workerName} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }} />
                  ) : (
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--bg-surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-green)', fontWeight: 700 }}>
                      {b.workerName?.charAt(0) || 'W'}
                    </div>
                  )}
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-green)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {b.category}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', marginTop: '0.1rem', color: 'var(--text-main)' }}>{b.workerName}</h3>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Calendar size={14} color="var(--accent-green)" /> {formatDate(b.date)}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Clock size={14} color="var(--accent-green)" /> {formatTime(b.time)}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><MapPin size={14} color="var(--accent-green)" /> {b.address}</span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.3rem 0.85rem',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    marginBottom: '0.5rem',
                    background: badge.bg,
                    color: badge.text,
                    border: `1px solid ${badge.border}`
                  }}>
                    {b.status}
                  </span>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>{formatCurrency(b.totalAmount)}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="card-white" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>No Bookings Found</h3>
            <p style={{ color: 'var(--text-muted)' }}>You haven't scheduled any gig services yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

