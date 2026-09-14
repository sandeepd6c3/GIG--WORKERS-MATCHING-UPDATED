import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const MainLayout = () => {
  return (
    <div className="app-layout">
      {/* Top Shared Navbar */}
      <Navbar />

      {/* Dynamic Page Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Bottom Shared Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
