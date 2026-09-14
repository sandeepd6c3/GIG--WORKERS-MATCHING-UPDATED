import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import DataTable from '../../components/admin/DataTable';
import { formatCurrency } from '../../utils/helpers';

const AdminPayments = () => {
  const columns = [
    { header: 'Transaction ID', accessor: '_id' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Worker Payout', accessor: 'worker' },
    { header: 'Gross Amount', accessor: 'amount', render: (row) => formatCurrency(row.amount) },
    { header: 'Platform Fee (10%)', accessor: 'fee', render: (row) => formatCurrency(row.amount * 0.1) },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span style={{
          background: 'var(--accent-green-soft)',
          border: '1px solid var(--accent-green-border)',
          color: 'var(--accent-green)',
          padding: '0.2rem 0.65rem',
          borderRadius: '12px',
          fontSize: '0.75rem',
          fontWeight: 700
        }}>
          {row.status}
        </span>
      )
    }
  ];

  const payments = [
    { _id: 'tx_9410', customer: 'Alex Morgan', worker: 'Sarah Jenkins', amount: 90, status: 'Settled' },
    { _id: 'tx_9411', customer: 'Robert Chen', worker: 'David Rodriguez', amount: 160, status: 'Settled' }
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: 'var(--bg-page)' }}>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2.5rem' }}>
          <h1 style={{ fontSize: '1.9rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Financial Transactions & Payouts</h1>
          <DataTable columns={columns} data={payments} />
        </main>
      </div>
    </div>
  );
};

export default AdminPayments;

