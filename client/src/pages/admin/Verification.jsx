import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import DataTable from '../../components/admin/DataTable';
import adminService from '../../services/adminService';
import Loader from '../../components/common/Loader';
import { ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

const AdminVerification = () => {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQueue = () => {
    adminService.getPendingVerifications()
      .then(res => setVerifications(res))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleAction = async (id, status) => {
    try {
      await adminService.updateVerificationStatus(id, status);
      setVerifications(prev => prev.filter(v => v._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { header: 'ID', accessor: '_id' },
    { header: 'Worker Name', accessor: 'workerName', render: (row) => row.workerName || row.name || 'Worker' },
    { header: 'Category', accessor: 'category' },
    { header: 'Submitted Document', accessor: 'documentType', render: (row) => row.documentType || 'Trade License #492' },
    { header: 'Actions', accessor: 'actions', render: (row) => (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => handleAction(row._id, 'approved')} className="btn btn-primary btn-sm">
          <CheckCircle2 size={14} /> Approve Badge
        </button>
        <button onClick={() => handleAction(row._id, 'rejected')} className="btn btn-outline btn-sm" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <XCircle size={14} /> Reject
        </button>
      </div>
    )}
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: 'var(--bg-page)' }}>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Pending Worker Verification Queue</h1>
          {loading ? (
            <Loader label="Loading verification queue..." />
          ) : (
            <DataTable columns={columns} data={verifications} emptyMessage="All worker verification requests have been processed!" />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminVerification;
