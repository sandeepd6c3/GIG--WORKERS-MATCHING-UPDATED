import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    icon: { type: String, default: 'Wrench' },
    count: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
