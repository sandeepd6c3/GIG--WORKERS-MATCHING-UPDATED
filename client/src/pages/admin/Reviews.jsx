import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import DataTable from '../../components/admin/DataTable';

const AdminReviews = () => {
  const columns = [
    { header: 'ID', accessor: '_id' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Worker', accessor: 'worker' },
    { header: 'Rating', accessor: 'rating', render: (row) => `⭐ ${row.rating}` },
    { header: 'Review Content', accessor: 'comment' }
  ];

  const reviews = [
    { _id: 'r1', customer: 'Alex Morgan', worker: 'Sarah Jenkins', rating: 5, comment: 'Exceptional work installing smart switches!' },
    { _id: 'r2', customer: 'Robert Chen', worker: 'David Rodriguez', rating: 4.8, comment: 'Fixed plumbing emergency quickly and cleanly.' }
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: 'var(--bg-page)' }}>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Platform Reviews Audit</h1>
          <DataTable columns={columns} data={reviews} />
        </main>
      </div>
    </div>
  );
};

export default AdminReviews;
