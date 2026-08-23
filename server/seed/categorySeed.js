import connectDB from '../config/db.js';
import Category from '../models/Category.js';

const seedCategories = async () => {
  await connectDB();
  await Category.deleteMany();
  const categories = [
    { name: 'Home Plumbing & Repairs', slug: 'plumbing', icon: 'Wrench', count: 124 },
    { name: 'Electrical & Wiring', slug: 'electrical', icon: 'Zap', count: 98 },
    { name: 'House Cleaning & Deep Sanitize', slug: 'cleaning', icon: 'Sparkles', count: 210 },
    { name: 'Carpentry & Furniture Assembly', slug: 'carpentry', icon: 'Hammer', count: 85 }
  ];
  await Category.insertMany(categories);
  console.log('Categories Seeded Successfully');
  process.exit();
};

seedCategories();
