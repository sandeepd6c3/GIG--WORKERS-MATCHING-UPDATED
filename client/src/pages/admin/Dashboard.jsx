import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import StatCard from '../../components/admin/StatCard';
import DataTable from '../../components/admin/DataTable';
import adminService from '../../services/adminService';
import Loader from '../../components/common/Loader';
import { Users, Briefcase, Calendar, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getDashboardStats()
      .then(res => setStats(res))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Loading administrative control center..." />;

  const recentColumns = [
    { header: 'ID', accessor: '_id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Role', accessor: 'role', render: (row) => <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{row.role}</span> },
    {
      header: 'Status',
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
          {row.status}
        </span>
      )
    },
    { header: 'Joined Date', accessor: 'joinedDate' }
  ];

  const recentUsers = [
    { _id: 'u101', name: 'Alex Morgan', role: 'customer', status: 'Active', joinedDate: '2026-08-22' },
    { _id: 'u102', name: 'Sarah Jenkins', role: 'worker', status: 'Verified', joinedDate: '2026-08-21' },
    { _id: 'u103', name: 'David Rodriguez', role: 'worker', status: 'Verified', joinedDate: '2026-08-20' }
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: 'var(--bg-page)' }}>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2.5rem' }}>
          <h1 style={{ fontSize: '1.9rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Platform Overview & Analytics</h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            <StatCard title="Total Platform Users" value={stats?.totalUsers || 1420} icon={Users} change="+12% this month" />
            <StatCard title="Active Gig Workers" value={stats?.totalWorkers || 380} icon={Briefcase} change="+8% this month" color="#3b82f6" />
            <StatCard title="Completed Bookings" value={stats?.totalBookings || 2890} icon={Calendar} change="+18% this month" color="#8b5cf6" />
            <StatCard title="Gross Platform Revenue" value={formatCurrency(stats?.revenue || 124500)} icon={DollarSign} change="+24% YoY" color="#f59e0b" />
          </div>

          <div>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', color: 'var(--text-main)' }}>Recent Platform Registration Activity</h2>
            <DataTable columns={recentColumns} data={recentUsers} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

