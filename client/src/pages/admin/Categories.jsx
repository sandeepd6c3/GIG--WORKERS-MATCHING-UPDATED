import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import DataTable from '../../components/admin/DataTable';
import { DEFAULT_CATEGORIES } from '../../utils/constants';

const AdminCategories = () => {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Category Name', accessor: 'name' },
    { header: 'Slug', accessor: 'slug' },
    { header: 'Workers Count', accessor: 'count' }
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: '#f8fafc' }}>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '1.8rem' }}>Category Management</h1>
            <button className="btn btn-primary btn-sm">+ Add New Category</button>
          </div>
          <DataTable columns={columns} data={DEFAULT_CATEGORIES} />
        </main>
      </div>
    </div>
  );
};

export default AdminCategories;
