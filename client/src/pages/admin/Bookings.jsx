import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import DataTable from '../../components/admin/DataTable';
import adminService from '../../services/adminService';
import Loader from '../../components/common/Loader';
import { formatCurrency, formatDate } from '../../utils/helpers';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getBookings()
      .then(res => setBookings(res))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { header: 'Booking ID', accessor: '_id' },
    { header: 'Customer', accessor: 'customerName', render: (row) => row.customerName || row.customerId?.name || 'Customer' },
    { header: 'Worker', accessor: 'workerName', render: (row) => row.workerName || row.workerId?.name || 'Worker' },
    { header: 'Category', accessor: 'category', render: (row) => row.category || row.serviceType || 'General Service' },
    { header: 'Date', accessor: 'date', render: (row) => formatDate(row.date) },
    { header: 'Amount', accessor: 'totalAmount', render: (row) => formatCurrency(row.totalAmount) },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span style={{
          background: row.status === 'accepted' || row.status === 'completed' ? 'var(--accent-green-soft)' : 'rgba(245, 158, 11, 0.12)',
          border: `1px solid ${row.status === 'accepted' || row.status === 'completed' ? 'var(--accent-green-border)' : 'rgba(245, 158, 11, 0.3)'}`,
          color: row.status === 'accepted' || row.status === 'completed' ? 'var(--accent-green)' : '#fbbf24',
          padding: '0.2rem 0.65rem',
          borderRadius: '12px',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'capitalize'
        }}>
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: 'var(--bg-page)' }}>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2.5rem' }}>
          <h1 style={{ fontSize: '1.9rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>All Platform Bookings</h1>
          {loading ? (
            <Loader label="Fetching platform bookings audit..." />
          ) : (
            <DataTable columns={columns} data={bookings} emptyMessage="No bookings records found." />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminBookings;

