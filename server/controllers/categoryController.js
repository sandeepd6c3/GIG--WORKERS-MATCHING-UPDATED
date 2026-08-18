import { Category } from '../models/Category.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({ isActive: true }).sort('sortOrder');
        res.status(200).json(new ApiResponse(200, categories, 'Categories fetched'));
    } catch (error) {
        next(error);
    }
};

export const getCategoryBySlug = async (req, res, next) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug, isActive: true });
        if (!category) throw new ApiError(404, 'Category not found');
        res.status(200).json(new ApiResponse(200, category, 'Category fetched'));
    } catch (error) {
        next(error);
    }
};

export const createCategory = async (req, res, next) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(new ApiResponse(201, category, 'Category created'));
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!category) throw new ApiError(404, 'Category not found');
        res.status(200).json(new ApiResponse(200, category, 'Category updated'));
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
        if (!category) throw new ApiError(404, 'Category not found');
        res.status(200).json(new ApiResponse(200, {}, 'Category deleted (soft)'));
    } catch (error) {
        next(error);
    }
};
