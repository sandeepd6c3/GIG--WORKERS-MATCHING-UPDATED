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
    { header: 'Trust Tier', accessor: 'trustTier', render: (row) => <span className={`trust-badge ${row.trustTier.toLowerCase().includes('gold') ? 'gold' : 'silver'}`}>{row.trustTier}</span> },
    { header: 'Hourly Rate', accessor: 'hourlyRate', render: (row) => formatCurrency(row.hourlyRate) },
    { header: 'Rating', accessor: 'rating', render: (row) => `⭐ ${row.rating}` },
    { header: 'Jobs Completed', accessor: 'completedJobs' }
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: '#f8fafc' }}>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Gig Worker Management</h1>
          <DataTable columns={columns} data={MOCK_WORKERS} />
        </main>
      </div>
    </div>
  );
};

export default AdminWorkers;
