import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import DataTable from '../../components/admin/DataTable';
import adminService from '../../services/adminService';
import Loader from '../../components/common/Loader';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getUsers()
      .then(res => setUsers(res))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { header: 'ID', accessor: '_id' },
    { header: 'Full Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role', render: (row) => <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{row.role}</span> },
    {
      header: 'Account Status',
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
          {row.status || 'Active'}
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
          <h1 style={{ fontSize: '1.9rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>User Management</h1>
          {loading ? (
            <Loader label="Fetching platform users..." />
          ) : (
            <DataTable columns={columns} data={users} emptyMessage="No platform users found." />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;

