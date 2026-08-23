import React from 'react';
import { Calendar, Clock, MapPin, DollarSign, CheckCircle2, XCircle } from 'lucide-react';
import { formatCurrency, formatDate, formatTime } from '../../utils/helpers';

const BookingCard = ({ booking, onStatusUpdate }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted': return { bg: '#dcfce7', text: '#15803d', label: 'Accepted' };
      case 'pending': return { bg: '#fef3c7', text: '#b45309', label: 'Pending Response' };
      case 'completed': return { bg: '#e0e7ff', text: '#4338ca', label: 'Completed' };
      case 'rejected': return { bg: '#fee2e2', text: '#b91c1c', label: 'Declined' };
      default: return { bg: '#f1f5f9', text: '#475569', label: status };
    }
  };

  const statusStyle = getStatusBadge(booking.status);

  return (
    <div className="card-white" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-green)', textTransform: 'uppercase' }}>
            {booking.category}
          </span>
          <h3 style={{ fontSize: '1.1rem', marginTop: '0.2rem' }}>Customer: {booking.customerName}</h3>
        </div>
        <span style={{ background: statusStyle.bg, color: statusStyle.text, padding: '0.25rem 0.65rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
          {statusStyle.label}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
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
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', background: '#f8fafc', padding: '0.6rem 0.8rem', borderRadius: '6px' }}>
          <strong>Note:</strong> {booking.notes}
        </p>
      )}

      {booking.status === 'pending' && onStatusUpdate && (
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button onClick={() => onStatusUpdate(booking._id, 'accepted')} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
            <CheckCircle2 size={16} /> Accept Job
          </button>
          <button onClick={() => onStatusUpdate(booking._id, 'rejected')} className="btn btn-outline btn-sm" style={{ flex: 1, color: '#ef4444', borderColor: '#fee2e2' }}>
            <XCircle size={16} /> Decline
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCard;
