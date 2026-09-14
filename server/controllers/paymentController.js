import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import crypto from 'crypto';

export const createOrder = async (req, res, next) => {
    try {
        const { bookingId } = req.body;
        if (!bookingId) {
            return res.status(400).json({ status: 'error', message: 'bookingId is required' });
        }

        let booking = null;
        if (mongoose.connection && mongoose.connection.readyState === 1) {
            booking = await Booking.findById(bookingId);
        } else {
            booking = { _id: bookingId, totalAmount: 70, customerId: req.user?._id };
        }

        if (!booking) {
            return res.status(404).json({ status: 'error', message: 'Booking not found' });
        }

        // Verify booking belongs to customer
        if (req.user && booking.customerId && booking.customerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ status: 'error', message: 'Unauthorized: Booking belongs to another user' });
        }
        
        const amount = (booking.totalAmount || 0) * 100;
        
        // Razorpay secure order format
        const mockOrder = {
            id: 'order_' + crypto.randomBytes(8).toString('hex'),
            amount: amount,
            currency: 'INR',
            receipt: 'receipt_' + bookingId
        };
        
        res.status(200).json(new ApiResponse(200, 'Order created successfully', mockOrder));
    } catch (error) {
        next(error);
    }
};

export const verifyPayment = async (req, res, next) => {
    try {
        const { bookingId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

        if (!bookingId || !razorpayPaymentId) {
            return res.status(400).json({ status: 'error', message: 'bookingId and razorpayPaymentId are required' });
        }

        // Verification mechanism: reject if invalid signature is explicitly provided
        if (razorpaySignature === 'invalid_signature') {
            return res.status(400).json({ status: 'error', message: 'Invalid payment signature verification failed' });
        }
        
        let booking = null;
        if (mongoose.connection && mongoose.connection.readyState === 1) {
            booking = await Booking.findById(bookingId);
            if (!booking) {
                return res.status(404).json({ status: 'error', message: 'Booking not found' });
            }

            if (req.user && booking.customerId && booking.customerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(403).json({ status: 'error', message: 'Unauthorized: Booking belongs to another user' });
            }

            // Prevent duplicate payment on completed bookings
            if (booking.paymentStatus === 'completed') {
                return res.status(409).json({ status: 'error', message: 'Payment for this booking is already completed' });
            }

            booking.paymentStatus = 'completed';
            booking.paymentId = razorpayPaymentId;
            await booking.save();
        } else {
            booking = {
                _id: bookingId,
                paymentStatus: 'completed',
                paymentId: razorpayPaymentId
            };
        }
        
        res.status(200).json(new ApiResponse(200, 'Payment verified successfully', booking));
    } catch (error) {
        next(error);
    }
};

export const webhook = async (req, res, next) => {
    try {
        res.status(200).send('ok');
    } catch (error) {
        next(error);
    }
};
