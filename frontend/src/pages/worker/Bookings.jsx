import React, { useState, useEffect } from 'react';
import BookingCard from '../../components/worker/BookingCard';
import bookingService from '../../services/bookingService';
import Loader from '../../components/common/Loader';

const WorkerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingService.getMyBookings()
      .then(res => setBookings(res))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusUpdate = async (id, status) => {
    await bookingService.updateBookingStatus(id, status);
    setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
  };

  if (loading) return <Loader label="Loading bookings..." />;

  return (
    <div className="section container">
      <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>Job Bookings</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>All active, upcoming, and past customer requests</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {bookings.map(b => (
          <BookingCard key={b._id} booking={b} onStatusUpdate={handleStatusUpdate} />
        ))}
      </div>
    </div>
  );
};

export default WorkerBookings;
