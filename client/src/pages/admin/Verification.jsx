import React, { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import DataTable from '../../components/admin/DataTable';
import { ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

const AdminVerification = () => {
  const [verifications, setVerifications] = useState([
    { _id: 'v1', workerName: 'Alex Mercer', category: 'Plumbing & Pipefit', documentType: 'State Plumbing License #882', status: 'Pending Review' },
    { _id: 'v2', workerName: 'Rachel Green', category: 'Electrical & Wiring', documentType: 'Master Electrician Cert ID', status: 'Pending Review' }
  ]);

  const handleApprove = (id) => {
    setVerifications(prev => prev.filter(v => v._id !== id));
  };

  const columns = [
    { header: 'ID', accessor: '_id' },
    { header: 'Worker Name', accessor: 'workerName' },
    { header: 'Category', accessor: 'category' },
    { header: 'Submitted Document', accessor: 'documentType' },
    { header: 'Actions', accessor: 'actions', render: (row) => (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => handleApprove(row._id)} className="btn btn-primary btn-sm">
          <CheckCircle2 size={14} /> Approve Badge
        </button>
        <button onClick={() => handleApprove(row._id)} className="btn btn-outline btn-sm" style={{ color: '#ef4444', borderColor: '#fee2e2' }}>
          <XCircle size={14} /> Reject
        </button>
      </div>
    )}
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: '#f8fafc' }}>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Pending Worker Verification Queue</h1>
          <DataTable columns={columns} data={verifications} emptyMessage="All worker verification requests have been processed!" />
        </main>
      </div>
    </div>
  );
};

export default AdminVerification;
