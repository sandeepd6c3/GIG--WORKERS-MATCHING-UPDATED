import Category from '../models/Category.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

// @desc    Get all active categories
// @route   GET /api/v1/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ sortOrder: 1, name: 1 });
    return ApiResponse.success(res, 'Categories fetched successfully', categories);
  } catch (error) {
    next(error);
  }
};

// @desc    Get category by slug
// @route   GET /api/v1/categories/:slug
// @access  Public
export const getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug, isActive: true });
    if (!category) {
      return next(ApiError.notFound('Category not found'));
    }
    return ApiResponse.success(res, 'Category fetched successfully', category);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new category
// @route   POST /api/v1/categories
// @access  Private/Admin
export const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    return ApiResponse.created(res, 'Category created successfully', category);
  } catch (error) {
    next(error);
  }
};

// @desc    Update category by ID
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return next(ApiError.notFound('Category not found'));
    }
    return ApiResponse.success(res, 'Category updated successfully', category);
  } catch (error) {
    next(error);
  }
};

// @desc    Soft delete category by ID
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!category) {
      return next(ApiError.notFound('Category not found'));
    }
    return ApiResponse.success(res, 'Category deactivated successfully', category);
  } catch (error) {
    next(error);
  }
};

