import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Customer Pages
import Home from '../pages/customer/Home';
import Categories from '../pages/customer/Categories';
import FindWorkers from '../pages/customer/FindWorkers';
import WorkerProfile from '../pages/customer/WorkerProfile';
import Booking from '../pages/customer/Booking';
import MyBookings from '../pages/customer/MyBookings';
import CustomerNotifications from '../pages/customer/Notifications';
import CustomerProfile from '../pages/customer/Profile';

// Worker Pages
import WorkerDashboard from '../pages/worker/Dashboard';
import WorkerPublicProfile from '../pages/worker/Profile';
import WorkerBookings from '../pages/worker/Bookings';
import WorkerEarnings from '../pages/worker/Earnings';
import WorkerReviews from '../pages/worker/Reviews';
import WorkerVerification from '../pages/worker/Verification';
import WorkerNotifications from '../pages/worker/Notifications';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminWorkers from '../pages/admin/Workers';
import AdminBookings from '../pages/admin/Bookings';
import AdminCategories from '../pages/admin/Categories';
import AdminReviews from '../pages/admin/Reviews';
import AdminPayments from '../pages/admin/Payments';
import AdminAnalytics from '../pages/admin/Analytics';
import AdminVerification from '../pages/admin/Verification';
import AdminSettings from '../pages/admin/Settings';

import ProtectedRoute from '../components/common/ProtectedRoute';
import NotFound from '../pages/common/NotFound';
import useAuth from '../hooks/useAuth';

const ProfileDispatcher = () => {
  const { user } = useAuth();
  if (user?.role === 'worker') return <WorkerPublicProfile />;
  if (user?.role === 'admin') return <AdminSettings />;
  return <CustomerProfile />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public / Customer Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/workers" element={<FindWorkers />} />
      <Route path="/workers/:id" element={<WorkerProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Customer Protected Routes */}
      <Route path="/booking/:workerId" element={<ProtectedRoute allowedRoles={['customer']}><Booking /></ProtectedRoute>} />
      <Route path="/my-bookings" element={<ProtectedRoute allowedRoles={['customer']}><MyBookings /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute allowedRoles={['customer']}><CustomerNotifications /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute allowedRoles={['customer', 'worker', 'admin']}><ProfileDispatcher /></ProtectedRoute>} />

      {/* Worker Protected Routes */}
      <Route path="/worker/dashboard" element={<ProtectedRoute allowedRoles={['worker']}><WorkerDashboard /></ProtectedRoute>} />
      <Route path="/worker/profile" element={<ProtectedRoute allowedRoles={['worker']}><WorkerPublicProfile /></ProtectedRoute>} />
      <Route path="/worker/bookings" element={<ProtectedRoute allowedRoles={['worker']}><WorkerBookings /></ProtectedRoute>} />
      <Route path="/worker/earnings" element={<ProtectedRoute allowedRoles={['worker']}><WorkerEarnings /></ProtectedRoute>} />
      <Route path="/worker/reviews" element={<ProtectedRoute allowedRoles={['worker']}><WorkerReviews /></ProtectedRoute>} />
      <Route path="/worker/verification" element={<ProtectedRoute allowedRoles={['worker']}><WorkerVerification /></ProtectedRoute>} />
      <Route path="/worker/notifications" element={<ProtectedRoute allowedRoles={['worker']}><WorkerNotifications /></ProtectedRoute>} />

      {/* Admin Protected Routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/workers" element={<ProtectedRoute allowedRoles={['admin']}><AdminWorkers /></ProtectedRoute>} />
      <Route path="/admin/bookings" element={<ProtectedRoute allowedRoles={['admin']}><AdminBookings /></ProtectedRoute>} />
      <Route path="/admin/categories" element={<ProtectedRoute allowedRoles={['admin']}><AdminCategories /></ProtectedRoute>} />
      <Route path="/admin/reviews" element={<ProtectedRoute allowedRoles={['admin']}><AdminReviews /></ProtectedRoute>} />
      <Route path="/admin/payments" element={<ProtectedRoute allowedRoles={['admin']}><AdminPayments /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><AdminAnalytics /></ProtectedRoute>} />
      <Route path="/admin/verification" element={<ProtectedRoute allowedRoles={['admin']}><AdminVerification /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />

      {/* 404 Catch-All Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
