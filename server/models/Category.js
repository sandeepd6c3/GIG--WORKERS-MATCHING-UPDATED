import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Category name cannot exceed 50 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Please provide a category slug'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [250, 'Description cannot exceed 250 characters'],
      default: '',
    },
    icon: {
      type: String,
      required: [true, 'Please provide a category icon identifier'],
      trim: true,
      default: 'Wrench', // Default fallback Lucide icon name
    },
    image: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true, // Enables soft deletion without breaking historical references
    },
    workerCount: {
      type: Number,
      default: 0,
      min: [0, 'Worker count cannot be negative'],
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Pre-validate middleware hook: Auto-generate slug from name if slug is omitted
categorySchema.pre('validate', function (next) {
  if (this.name && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove non-word chars
      .replace(/[\s_-]+/g, '-')  // Replace spaces and underscores with a hyphen
      .replace(/^-+|-+$/g, '');  // Trim leading/trailing hyphens
  }
  next();
});

// Database Indexes for Fast Search and Sorting
categorySchema.index({ slug: 1 }, { unique: true });
categorySchema.index({ name: 1 }, { unique: true });
categorySchema.index({ isActive: 1, sortOrder: 1 });

const Category = mongoose.model('Category', categorySchema);
export default Category;
