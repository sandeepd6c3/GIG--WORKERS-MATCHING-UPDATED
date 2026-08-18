import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );
        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_TOKEN_SECRET || 'refresh',
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }
        );

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, 'Something went wrong while generating tokens');
    }
};

export const register = async (req, res, next) => {
    try {
        const { name, email, phone, password, role, categoryId } = req.body;

        const existedUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existedUser) {
            throw new ApiError(409, 'User with email or phone already exists');
        }

        const userObj = { name, email, phone, password, role };
        if (role === 'worker') {
            userObj.workerProfile = { categoryId: categoryId || null };
        }

        const user = await User.create(userObj);
        const createdUser = await User.findById(user._id).select('-password');

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        const options = { httpOnly: true, secure: process.env.NODE_ENV === 'production' };

        return res
            .status(201)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(new ApiResponse(201, { user: createdUser, accessToken, refreshToken }, 'User registered successfully'));
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user) throw new ApiError(404, 'User does not exist');

        if (!user.isActive) throw new ApiError(403, 'User account is deactivated');

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) throw new ApiError(401, 'Invalid user credentials');

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        const loggedInUser = await User.findById(user._id).select('-password');

        const options = { httpOnly: true, secure: process.env.NODE_ENV === 'production' };

        return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(new ApiResponse(200, { user: loggedInUser, role: user.role, accessToken, refreshToken }, 'User logged in successfully'));
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });
        const options = { httpOnly: true, secure: process.env.NODE_ENV === 'production' };

        return res
            .status(200)
            .clearCookie('accessToken', options)
            .clearCookie('refreshToken', options)
            .json(new ApiResponse(200, {}, 'User logged out'));
    } catch (error) {
        next(error);
    }
};

export const refreshToken = async (req, res, next) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
        if (!incomingRefreshToken) throw new ApiError(401, 'Unauthorized request');

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET || 'refresh');
        const user = await User.findById(decodedToken?.id);

        if (!user) throw new ApiError(401, 'Invalid refresh token');
        if (incomingRefreshToken !== user?.refreshToken) throw new ApiError(401, 'Refresh token is expired or used');

        const options = { httpOnly: true, secure: process.env.NODE_ENV === 'production' };
        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

        return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', newRefreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, 'Access token refreshed'));
    } catch (error) {
        next(new ApiError(401, error?.message || 'Invalid refresh token'));
    }
};

export const getMe = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id).select('-password');
        if (user.role === 'worker') {
            user = await User.findById(req.user._id).select('-password').populate('workerProfile.categoryId');
        }
        return res.status(200).json(new ApiResponse(200, user, 'User profile fetched'));
    } catch (error) {
        next(error);
    }
};
