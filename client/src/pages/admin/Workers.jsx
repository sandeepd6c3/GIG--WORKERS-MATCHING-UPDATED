import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import DataTable from '../../components/admin/DataTable';
import { MOCK_WORKERS } from '../../utils/constants';
import { formatCurrency } from '../../utils/helpers';

const AdminWorkers = () => {
  const columns = [
    { header: 'Worker Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Trust Tier', accessor: 'trustTier', render: (row) => <span className={`trust-badge ${row.trustTier?.toLowerCase().includes('gold') ? 'gold' : 'silver'}`}>{row.trustTier || 'Silver Tier'}</span> },
    { header: 'Hourly Rate', accessor: 'hourlyRate', render: (row) => formatCurrency(row.hourlyRate) },
    { header: 'Rating', accessor: 'rating', render: (row) => `⭐ ${row.rating}` },
    { header: 'Jobs Completed', accessor: 'completedJobs' }
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: 'var(--bg-page)' }}>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2.5rem' }}>
          <h1 style={{ fontSize: '1.9rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Gig Worker Management</h1>
          <DataTable columns={columns} data={MOCK_WORKERS} />
        </main>
      </div>
    </div>
  );
};

export default AdminWorkers;

