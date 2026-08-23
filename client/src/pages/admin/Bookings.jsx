import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import DataTable from '../../components/admin/DataTable';
import { formatCurrency, formatDate } from '../../utils/helpers';

const AdminBookings = () => {
  const columns = [
    { header: 'Booking ID', accessor: '_id' },
    { header: 'Customer', accessor: 'customerName' },
    { header: 'Worker', accessor: 'workerName' },
    { header: 'Category', accessor: 'category' },
    { header: 'Date', accessor: 'date', render: (row) => formatDate(row.date) },
    { header: 'Amount', accessor: 'totalAmount', render: (row) => formatCurrency(row.totalAmount) },
    { header: 'Status', accessor: 'status', render: (row) => <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>{row.status}</span> }
  ];

  const bookings = [
    { _id: 'b101', customerName: 'Alex Morgan', workerName: 'Sarah Jenkins', category: 'Electrical & Wiring', date: '2026-08-28', totalAmount: 90, status: 'accepted' },
    { _id: 'b102', customerName: 'Alex Morgan', workerName: 'David Rodriguez', category: 'Home Plumbing', date: '2026-08-30', totalAmount: 80, status: 'pending' }
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: '#f8fafc' }}>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>All Platform Bookings</h1>
          <DataTable columns={columns} data={bookings} />
        </main>
      </div>
    </div>
  );
};

export default AdminBookings;
