import mongoose from 'mongoose';
import Category from '../models/Category.js';

const DEFAULT_CATEGORIES = [
  { _id: 'cat_1', name: 'Home Plumbing & Repairs', slug: 'plumbing', icon: 'Wrench', count: 124 },
  { _id: 'cat_2', name: 'Electrical & Wiring', slug: 'electrical', icon: 'Zap', count: 98 },
  { _id: 'cat_3', name: 'House Cleaning & Deep Sanitize', slug: 'cleaning', icon: 'Sparkles', count: 210 },
  { _id: 'cat_4', name: 'Carpentry & Furniture Assembly', slug: 'carpentry', icon: 'Hammer', count: 85 }
];

export const getCategories = async (req, res) => {
  try {
    let categories = [];
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      categories = await Category.find().maxTimeMS(2000);
    }
    if (!categories || categories.length === 0) {
      categories = DEFAULT_CATEGORIES;
    }
    res.json(categories);
  } catch (error) {
    res.json(DEFAULT_CATEGORIES);
  }
};

export const getCategoryBySlug = async (req, res) => {
  try {
    let category = null;
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      category = await Category.findOne({ slug: req.params.slug }).maxTimeMS(2000);
    }
    if (!category) {
      category = DEFAULT_CATEGORIES.find(c => c.slug === req.params.slug);
    }
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    const fallback = DEFAULT_CATEGORIES.find(c => c.slug === req.params.slug);
    if (fallback) return res.json(fallback);
    res.status(404).json({ message: 'Category not found' });
  }
};
