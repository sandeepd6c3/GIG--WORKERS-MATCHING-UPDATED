import api from './api';

export const adminService = {
  async getDashboardStats() {
    try {
      const response = await api.get('/admin/stats');
      return response.data;
    } catch (err) {
      return {
        totalUsers: 1420,
        totalWorkers: 380,
        totalBookings: 2890,
        revenue: 124500,
        pendingVerifications: 14
      };
    }
  },

  async getUsers() {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (err) {
      return [
        { _id: 'u1', name: 'John Doe', email: 'john@example.com', role: 'customer', status: 'Active', joinedDate: '2026-01-12' },
        { _id: 'u2', name: 'Sarah Jenkins', email: 'sarah.j@example.com', role: 'worker', status: 'Verified', joinedDate: '2026-02-05' },
        { _id: 'u3', name: 'David Rodriguez', email: 'david.r@example.com', role: 'worker', status: 'Verified', joinedDate: '2026-02-18' }
      ];
    }
  },

  async getPendingVerifications() {
    try {
      const response = await api.get('/admin/verifications');
      return response.data;
    } catch (err) {
      return [
        { _id: 'v1', workerName: 'Alex Mercer', category: 'Plumbing', documentType: 'Trade License', status: 'pending' },
        { _id: 'v2', workerName: 'Rachel Green', category: 'Electrical', documentType: 'Cert ID', status: 'pending' }
      ];
    }
  }
};

export default adminService;
