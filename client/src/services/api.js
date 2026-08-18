import axios from 'axios';

// Base API URL loaded from environment variable with fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Create configured Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Required for HTTP-only cookie JWT auth
  timeout: 10000, // 10 seconds timeout
});

// Response interceptor for consistent error extraction
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let message = 'An unexpected error occurred. Please try again.';

    if (error.response) {
      // Server responded with status code outside 2xx
      message = error.response.data?.message || message;
    } else if (error.request) {
      // Request made but no response received (Backend down / Network error)
      message = 'Unable to connect to server. Please check your internet connection or try again later.';
    }

    return Promise.reject(new Error(message));
  }
);

/* ==========================================================================
   Category API Services
   ========================================================================== */

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data || [];
};

export const getCategoryBySlug = async (slug) => {
  const response = await api.get(`/categories/${slug}`);
  return response.data;
};

export default api;
