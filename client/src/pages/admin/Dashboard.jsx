import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import StatCard from '../../components/admin/StatCard';
import DataTable from '../../components/admin/DataTable';
import adminService from '../../services/adminService';
import Loader from '../../components/common/Loader';
import { Users, Briefcase, Calendar, DollarSign, ShieldCheck } from 'lucide-react';
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
    { header: 'Status', accessor: 'status', render: (row) => <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>{row.status}</span> },
    { header: 'Joined Date', accessor: 'joinedDate' }
  ];

  const recentUsers = [
    { _id: 'u101', name: 'Alex Morgan', role: 'customer', status: 'Active', joinedDate: '2026-08-22' },
    { _id: 'u102', name: 'Sarah Jenkins', role: 'worker', status: 'Verified', joinedDate: '2026-08-21' },
    { _id: 'u103', name: 'David Rodriguez', role: 'worker', status: 'Verified', joinedDate: '2026-08-20' }
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: '#f8fafc' }}>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Platform Overview & Analytics</h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <StatCard title="Total Platform Users" value={stats?.totalUsers || 1420} icon={Users} change="+12% this month" />
            <StatCard title="Active Gig Workers" value={stats?.totalWorkers || 380} icon={Briefcase} change="+8% this month" color="#3b82f6" />
            <StatCard title="Completed Bookings" value={stats?.totalBookings || 2890} icon={Calendar} change="+18% this month" color="#8b5cf6" />
            <StatCard title="Gross Platform Revenue" value={formatCurrency(stats?.revenue || 124500)} icon={DollarSign} change="+24% YoY" color="#f59e0b" />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Recent Platform Registration Activity</h2>
            <DataTable columns={recentColumns} data={recentUsers} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
