import React, { useState, useEffect } from 'react';
import AvailabilityToggle from '../../components/worker/AvailabilityToggle';
import EarningsCard from '../../components/worker/EarningsCard';
import BookingCard from '../../components/worker/BookingCard';
import bookingService from '../../services/bookingService';
import Loader from '../../components/common/Loader';

const WorkerDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    bookingService.getMyBookings()
      .then(res => setBookings(res))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    await bookingService.updateBookingStatus(id, status);
    setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
  };

  if (loading) return <Loader label="Loading worker portal..." />;

  return (
    <div className="section container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.3rem' }}>Worker Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage incoming job requests, service availability & earnings</p>
        </div>
        <AvailabilityToggle initialAvailable={true} />
      </div>

      <EarningsCard totalEarnings={1850} completedJobs={42} pendingPayout={320} />

      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Recent Job Requests</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {bookings.map(b => (
            <BookingCard key={b._id} booking={b} onStatusUpdate={handleStatusUpdate} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
