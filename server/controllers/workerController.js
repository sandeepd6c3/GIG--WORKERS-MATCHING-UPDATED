import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getWorkers = async (req, res, next) => {
    try {
        const { category, city, minRating, sort, available, page = 1, limit = 10, search } = req.query;
        
        let query = { role: 'worker', isActive: true };
        
        if (category) query['workerProfile.categoryId'] = category;
        if (city) query['workerProfile.city'] = city;
        if (minRating) query['workerProfile.averageRating'] = { $gte: Number(minRating) };
        if (available !== undefined) query['workerProfile.isAvailable'] = available === 'true';
        if (search) query.name = { $regex: search, $options: 'i' };

        let sortQuery = {};
        if (sort === 'rating') sortQuery['workerProfile.averageRating'] = -1;
        else if (sort === 'jobs') sortQuery['workerProfile.completedJobs'] = -1;
        else if (sort === 'rate-low') sortQuery['workerProfile.ratePerVisit'] = 1;
        else if (sort === 'rate-high') sortQuery['workerProfile.ratePerVisit'] = -1;
        else sortQuery['createdAt'] = -1;

        const skip = (Number(page) - 1) * Number(limit);
        
        const workers = await User.find(query)
            .sort(sortQuery)
            .skip(skip)
            .limit(Number(limit))
            .select('-password -refreshToken')
            .populate('workerProfile.categoryId', 'name slug');
            
        const total = await User.countDocuments(query);
        const pages = Math.ceil(total / Number(limit));

        res.status(200).json(new ApiResponse(200, { workers, total, page: Number(page), pages }, 'Workers fetched'));
    } catch (error) {
        next(error);
    }
};

export const getWorkerById = async (req, res, next) => {
    try {
        const worker = await User.findOne({ _id: req.params.id, role: 'worker' })
            .select('-password -refreshToken')
            .populate('workerProfile.categoryId', 'name slug description');
        if (!worker) throw new ApiError(404, 'Worker not found');
        res.status(200).json(new ApiResponse(200, worker, 'Worker fetched'));
    } catch (error) {
        next(error);
    }
};

export const updateWorkerProfile = async (req, res, next) => {
    try {
        const { bio, skills, ratePerVisit, city, serviceArea, isAvailable } = req.body;
        
        const user = await User.findById(req.user._id);
        if (bio) user.workerProfile.bio = bio;
        if (skills) user.workerProfile.skills = skills;
        if (ratePerVisit) user.workerProfile.ratePerVisit = ratePerVisit;
        if (city) user.workerProfile.city = city;
        if (serviceArea) user.workerProfile.serviceArea = serviceArea;
        if (isAvailable !== undefined) user.workerProfile.isAvailable = isAvailable;
        
        await user.save();
        res.status(200).json(new ApiResponse(200, user, 'Worker profile updated'));
    } catch (error) {
        next(error);
    }
};

export const toggleAvailability = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        user.workerProfile.isAvailable = !user.workerProfile.isAvailable;
        await user.save();
        res.status(200).json(new ApiResponse(200, { isAvailable: user.workerProfile.isAvailable }, 'Availability toggled'));
    } catch (error) {
        next(error);
    }
};

export const uploadDocuments = async (req, res, next) => {
    try {
        const { documentUrl, documentType } = req.body; // Mocked
        const user = await User.findById(req.user._id);
        user.workerProfile.documents.push({ type: documentType, url: documentUrl, status: 'pending' });
        await user.save();
        res.status(200).json(new ApiResponse(200, user.workerProfile.documents, 'Documents uploaded'));
    } catch (error) {
        next(error);
    }
};
