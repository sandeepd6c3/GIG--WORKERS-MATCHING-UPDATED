import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import DataTable from '../../components/admin/DataTable';
import categoryService from '../../services/categoryService';
import Loader from '../../components/common/Loader';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService.getCategories()
      .then(res => setCategories(res))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { header: 'ID', accessor: 'id', render: (row) => row.id || row._id },
    { header: 'Category Name', accessor: 'name' },
    { header: 'Slug', accessor: 'slug' },
    { header: 'Workers Count', accessor: 'count', render: (row) => row.count || 24 }
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: 'var(--bg-page)' }}>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 style={{ fontSize: '1.9rem', color: 'var(--text-main)' }}>Category Management</h1>
          </div>
          {loading ? (
            <Loader label="Loading platform categories..." />
          ) : (
            <DataTable columns={columns} data={categories} emptyMessage="No categories found." />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminCategories;

