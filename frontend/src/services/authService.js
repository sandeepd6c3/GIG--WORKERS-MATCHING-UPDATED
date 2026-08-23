import api from './api';

export const authService = {
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (err) {
      // Fallback for demo mode if backend is not live
      if (credentials.email && credentials.password) {
        const role = credentials.email.includes('admin') ? 'admin' : credentials.email.includes('worker') ? 'worker' : 'customer';
        const mockUser = {
          _id: 'usr_' + Date.now(),
          name: credentials.email.split('@')[0].toUpperCase(),
          email: credentials.email,
          role,
          token: 'mock-jwt-token-' + Date.now()
        };
        localStorage.setItem('token', mockUser.token);
        return { success: true, user: mockUser, token: mockUser.token };
      }
      throw err;
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (err) {
      const mockUser = {
        _id: 'usr_' + Date.now(),
        name: userData.name || 'New User',
        email: userData.email,
        role: userData.role || 'customer',
        token: 'mock-jwt-token-' + Date.now()
      };
      localStorage.setItem('token', mockUser.token);
      return { success: true, user: mockUser, token: mockUser.token };
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (err) {
      return null;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('gigmatch_user');
  }
};

export default authService;
