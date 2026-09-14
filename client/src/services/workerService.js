import api from './api';
import { MOCK_WORKERS } from '../utils/constants';

export const workerService = {
  async getWorkers(params = {}) {
    try {
      const response = await api.get('/workers', { params });
      return response.data || response;
    } catch (err) {
      let filtered = [...MOCK_WORKERS];
      if (params.category) {
        filtered = filtered.filter(w => w.categorySlug === params.category || w.category.toLowerCase().includes(params.category.toLowerCase()));
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(w => w.name.toLowerCase().includes(q) || w.title.toLowerCase().includes(q) || w.category.toLowerCase().includes(q));
      }
      return { success: true, count: filtered.length, data: filtered };
    }
  },

  async getWorkerById(id) {
    try {
      const response = await api.get(`/workers/${id}`);
      return response.data;
    } catch (err) {
      const found = MOCK_WORKERS.find(w => w._id === id) || MOCK_WORKERS[0];
      return found;
    }
  },

  async updateAvailability(isAvailable) {
    try {
      return await api.patch('/workers/availability', { isAvailable });
    } catch (err) {
      return { success: true, isAvailable };
    }
  },

  async matchWorkers(requirement) {
    try {
      const response = await api.post('/matching/workers', requirement);
      return response.data || response;
    } catch (err) {
      throw err;
    }
  }
};

export default workerService;
