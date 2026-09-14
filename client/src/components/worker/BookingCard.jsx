import React from 'react';
import { Calendar, Clock, MapPin, DollarSign, CheckCircle2, XCircle } from 'lucide-react';
import { formatCurrency, formatDate, formatTime } from '../../utils/helpers';

const BookingCard = ({ booking, onStatusUpdate }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted': return { bg: 'rgba(16, 185, 129, 0.12)', text: '#34d399', border: 'rgba(16, 185, 129, 0.3)', label: 'Accepted' };
      case 'pending': return { bg: 'rgba(245, 158, 11, 0.12)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)', label: 'Pending Response' };
      case 'completed': return { bg: 'rgba(99, 102, 241, 0.12)', text: '#818cf8', border: 'rgba(99, 102, 241, 0.3)', label: 'Completed' };
      case 'rejected': return { bg: 'rgba(239, 68, 68, 0.12)', text: '#f87171', border: 'rgba(239, 68, 68, 0.3)', label: 'Declined' };
      default: return { bg: 'var(--bg-surface-elevated)', text: 'var(--text-secondary)', border: 'var(--border-color)', label: status };
    }
  };

  const statusStyle = getStatusBadge(booking.status);

  return (
    <div className="card-white" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-green)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {booking.category}
          </span>
          <h3 style={{ fontSize: '1.15rem', marginTop: '0.2rem', color: 'var(--text-main)' }}>Customer: {booking.customerName}</h3>
        </div>
        <span style={{
          background: statusStyle.bg,
          color: statusStyle.text,
          border: `1px solid ${statusStyle.border}`,
          padding: '0.25rem 0.75rem',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 700
        }}>
          {statusStyle.label}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.85rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Calendar size={16} color="var(--accent-green)" />
          <span>{formatDate(booking.date)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Clock size={16} color="var(--accent-green)" />
          <span>{formatTime(booking.time)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <MapPin size={16} color="var(--accent-green)" />
          <span>{booking.address}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--text-main)' }}>
          <DollarSign size={16} color="var(--accent-green)" />
          <span>{formatCurrency(booking.totalAmount)}</span>
        </div>
      </div>

      {booking.notes && (
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-color)',
          padding: '0.7rem 0.9rem',
          borderRadius: 'var(--radius-sm)'
        }}>
          <strong style={{ color: 'var(--text-main)' }}>Note:</strong> {booking.notes}
        </p>
      )}

      {booking.status === 'pending' && onStatusUpdate && (
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button onClick={() => onStatusUpdate(booking._id, 'accepted')} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
            <CheckCircle2 size={16} /> Accept Job
          </button>
          <button onClick={() => onStatusUpdate(booking._id, 'rejected')} className="btn btn-outline btn-sm" style={{ flex: 1, color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <XCircle size={16} /> Decline
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCard;

