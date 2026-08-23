import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';
import workerService from '../../services/workerService';
import bookingService from '../../services/bookingService';
import { formatCurrency } from '../../utils/helpers';
import Loader from '../../components/common/Loader';

const Booking = () => {
  const { workerId } = useParams();
  const navigate = useNavigate();

  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '10:00',
    address: '',
    notes: '',
    hours: 2
  });

  useEffect(() => {
    workerService.getWorkerById(workerId)
      .then(res => setWorker(res))
      .finally(() => setLoading(false));
  }, [workerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookingService.createBooking({
        workerId: worker._id,
        workerName: worker.name,
        category: worker.category,
        totalAmount: worker.hourlyRate * formData.hours,
        ...formData
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loader label="Preparing booking details..." />;
  if (!worker) return <div className="container section">Worker not found</div>;

  const total = worker.hourlyRate * formData.hours;

  if (submitted) {
    return (
      <div className="section container" style={{ textAlign: 'center', maxWidth: '500px' }}>
        <div className="card-white" style={{ padding: '3rem 2rem' }}>
          <CheckCircle size={60} color="var(--accent-green)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Booking Request Sent!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Your request has been dispatched to <strong>{worker.name}</strong>. You will receive a notification as soon as they accept.
          </p>
          <button onClick={() => navigate('/my-bookings')} className="btn btn-primary btn-block">
            View My Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="section container">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Book Gig Worker</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Complete details for hiring <strong>{worker.name}</strong></p>

        <form onSubmit={handleSubmit} className="card-white" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Scheduled Date</label>
            <input
              type="date"
              required
              className="form-control"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Start Time</label>
              <input
                type="time"
                required
                className="form-control"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Estimated Hours</label>
              <input
                type="number"
                min="1"
                max="8"
                required
                className="form-control"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Service Address</label>
            <input
              type="text"
              required
              className="form-control"
              placeholder="Full street address & apartment/unit #"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Job Notes & Instructions</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Describe the job requirements, tools needed, or access codes..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estimated Cost ({formData.hours} hrs @ {formatCurrency(worker.hourlyRate)}/hr)</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>{formatCurrency(total)}</div>
            </div>
            <span style={{ fontSize: '0.75rem', background: '#e0e7ff', color: '#4338ca', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
              Pay After Job Completion
            </span>
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ padding: '0.85rem' }}>
            Confirm & Send Booking Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
