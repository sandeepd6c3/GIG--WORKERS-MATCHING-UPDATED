import api from './api';

export const authService = {
  async sendOTP(data) {
    return await api.post('/auth/otp/send', data);
  },

  async verifyOTP(data) {
    const response = await api.post('/auth/otp/verify', data);
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  },

  async googleAuth(data) {
    const response = await api.post('/auth/google', data);
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  },

  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData);
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response;
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
