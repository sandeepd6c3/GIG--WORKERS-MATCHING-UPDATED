import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, Calendar, Layers, Star, CreditCard, BarChart2, ShieldCheck, Settings } from 'lucide-react';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/workers', label: 'Gig Workers', icon: Briefcase },
  { path: '/admin/bookings', label: 'Bookings', icon: Calendar },
  { path: '/admin/categories', label: 'Categories', icon: Layers },
  { path: '/admin/reviews', label: 'Reviews', icon: Star },
  { path: '/admin/payments', label: 'Payments', icon: CreditCard },
  { path: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
  { path: '/admin/verification', label: 'Verifications', icon: ShieldCheck },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside style={{
      width: '240px',
      background: 'var(--navy-dark)',
      color: 'var(--text-secondary)',
      minHeight: 'calc(100vh - 70px)',
      padding: '1.5rem 0.85rem',
      borderRight: '1px solid var(--border-color)',
      flexShrink: 0
    }}>
      <div style={{
        fontSize: '0.75rem',
        fontWeight: 700,
        color: 'var(--accent-green)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: '1rem',
        paddingLeft: '0.75rem'
      }}>
        Admin Operations
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius)',
                color: active ? '#ffffff' : 'var(--text-secondary)',
                background: active ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
                fontWeight: active ? 600 : 400,
                textDecoration: 'none',
                transition: 'var(--transition)',
                boxShadow: active ? '0 4px 14px rgba(16, 185, 129, 0.3)' : 'none'
              }}
            >
              <Icon size={18} />
              <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;

