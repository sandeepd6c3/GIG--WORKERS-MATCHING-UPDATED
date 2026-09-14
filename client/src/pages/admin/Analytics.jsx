import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import StatCard from '../../components/admin/StatCard';
import { TrendingUp, Users, Calendar, Award } from 'lucide-react';

const AdminAnalytics = () => {
  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: 'var(--bg-page)' }}>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Platform Growth Analytics</h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <StatCard title="Monthly Active Gig Workers" value="342" icon={Users} change="+14% this month" />
            <StatCard title="Booking Conversion Rate" value="68.4%" icon={TrendingUp} change="+3.2%" color="#8b5cf6" />
            <StatCard title="Average Job Rating" value="4.88 / 5.0" icon={Award} change="Gold standard" color="#f59e0b" />
          </div>

          <div className="card-white" style={{ padding: '2.5rem', textAlign: 'center' }}>
            <h3>Marketplace Liquidity & Growth Visualizer</h3>
            <p style={{ color: 'var(--text-muted)' }}>Matching efficiency index: 94.2% completion speed within 30 minutes.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAnalytics;
