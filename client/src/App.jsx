import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Categories from './pages/Categories';
import Login from './pages/Login';
import Register from './pages/Register';
import WorkerDirectory from './pages/WorkerDirectory';
import WorkerDetail from './pages/WorkerDetail';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Application Layout Wrapper */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="workers" element={<WorkerDirectory />} />
          <Route path="workers/:id" element={<WorkerDetail />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
