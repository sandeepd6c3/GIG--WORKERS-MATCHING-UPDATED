import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import DataTable from '../../components/admin/DataTable';
import adminService from '../../services/adminService';
import Loader from '../../components/common/Loader';
import { formatCurrency } from '../../utils/helpers';

const AdminWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getWorkers()
      .then(res => setWorkers(res))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { header: 'Worker Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Trust Tier', accessor: 'trustTier', render: (row) => <span className={`trust-badge ${row.trustTier?.toLowerCase().includes('gold') ? 'gold' : 'silver'}`}>{row.trustTier || 'Silver Tier'}</span> },
    { header: 'Hourly Rate', accessor: 'hourlyRate', render: (row) => formatCurrency(row.hourlyRate) },
    { header: 'Rating', accessor: 'rating', render: (row) => `⭐ ${row.rating}` },
    { header: 'Jobs Completed', accessor: 'completedJobs', render: (row) => row.completedJobs || 0 }
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: 'var(--bg-page)' }}>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2.5rem' }}>
          <h1 style={{ fontSize: '1.9rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Gig Worker Management</h1>
          {loading ? (
            <Loader label="Loading workers directory..." />
          ) : (
            <DataTable columns={columns} data={workers} emptyMessage="No registered gig workers found." />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminWorkers;

