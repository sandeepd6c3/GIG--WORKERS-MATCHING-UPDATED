import { Booking } from '../models/Booking.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import crypto from 'crypto';

export const createOrder = async (req, res, next) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId);
        if (!booking) throw new ApiError(404, 'Booking not found');
        
        // Mocking Razorpay order
        const mockOrder = {
            id: 'order_' + crypto.randomBytes(8).toString('hex'),
            amount: booking.estimatedCost * 100,
            currency: 'INR',
            receipt: 'receipt_' + bookingId
        };
        
        res.status(200).json(new ApiResponse(200, mockOrder, 'Order created successfully'));
    } catch (error) {
        next(error);
    }
};

export const verifyPayment = async (req, res, next) => {
    try {
        const { bookingId, razorpayPaymentId } = req.body;
        
        const booking = await Booking.findById(bookingId);
        if (!booking) throw new ApiError(404, 'Booking not found');
        
        // Mock verification
        booking.paymentStatus = 'completed';
        booking.paymentId = razorpayPaymentId;
        await booking.save();
        
        res.status(200).json(new ApiResponse(200, booking, 'Payment verified successfully'));
    } catch (error) {
        next(error);
    }
};

export const webhook = async (req, res, next) => {
    try {
        // Mock webhook handler
        res.status(200).send('ok');
    } catch (error) {
        next(error);
    }
};
