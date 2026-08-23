import api from './api';
import { DEFAULT_CATEGORIES } from '../utils/constants';

export const categoryService = {
  async getCategories() {
    try {
      const response = await api.get('/categories');
      return response.data || DEFAULT_CATEGORIES;
    } catch (err) {
      return DEFAULT_CATEGORIES;
    }
  },

  async getCategoryBySlug(slug) {
    try {
      const response = await api.get(`/categories/${slug}`);
      return response.data;
    } catch (err) {
      return DEFAULT_CATEGORIES.find(c => c.slug === slug) || DEFAULT_CATEGORIES[0];
    }
  }
};

export default categoryService;
