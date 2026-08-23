import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import DataTable from '../../components/admin/DataTable';

const AdminUsers = () => {
  const columns = [
    { header: 'ID', accessor: '_id' },
    { header: 'Full Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role', render: (row) => <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{row.role}</span> },
    { header: 'Account Status', accessor: 'status', render: (row) => <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>{row.status}</span> }
  ];

  const users = [
    { _id: 'u1', name: 'Alex Morgan', email: 'alex@example.com', role: 'customer', status: 'Active' },
    { _id: 'u2', name: 'Sarah Jenkins', email: 'sarah.j@example.com', role: 'worker', status: 'Active' },
    { _id: 'u3', name: 'David Rodriguez', email: 'david.r@example.com', role: 'worker', status: 'Active' },
    { _id: 'u4', name: 'Super Admin', email: 'admin@gigmatch.com', role: 'admin', status: 'Active' }
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: '#f8fafc' }}>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>User Management</h1>
          <DataTable columns={columns} data={users} />
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;
