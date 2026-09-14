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
      <div className="section container" style={{ textAlign: 'center', maxWidth: '520px' }}>
        <div className="card-white" style={{ padding: '3.5rem 2rem' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'var(--accent-green-soft)',
            border: '1px solid var(--accent-green-border)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
            color: 'var(--accent-green)',
            boxShadow: 'var(--accent-green-glow)'
          }}>
            <CheckCircle size={38} />
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.65rem', color: 'var(--text-main)' }}>Booking Request Sent!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Your request has been dispatched to <strong style={{ color: 'var(--text-main)' }}>{worker.name}</strong>. You will receive a notification as soon as they accept.
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
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Book Gig Worker</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Complete details for hiring <strong style={{ color: 'var(--text-main)' }}>{worker.name}</strong></p>

        <form onSubmit={handleSubmit} className="card-white" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Scheduled Date</label>
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
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Start Time</label>
              <input
                type="time"
                required
                className="form-control"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Estimated Hours</label>
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
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Service Address</label>
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
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Job Notes & Instructions</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Describe the job requirements, tools needed, or access codes..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div style={{
            background: 'var(--bg-surface-elevated)',
            padding: '1.25rem',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Estimated Cost ({formData.hours} hrs @ {formatCurrency(worker.hourlyRate)}/hr)</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>{formatCurrency(total)}</div>
            </div>
            <span style={{
              fontSize: '0.75rem',
              background: 'rgba(99, 102, 241, 0.12)',
              color: '#818cf8',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              fontWeight: 600
            }}>
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

