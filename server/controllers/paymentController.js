import Booking from '../models/Booking.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import crypto from 'crypto';

export const createOrder = async (req, res, next) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId);
        if (!booking) throw ApiError.notFound('Booking not found');
        
        const amount = (booking.totalAmount || 0) * 100;
        
        // Razorpay mock order
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
        const { bookingId, razorpayPaymentId } = req.body;
        
        const booking = await Booking.findById(bookingId);
        if (!booking) throw ApiError.notFound('Booking not found');
        
        // Verification update
        booking.paymentStatus = 'completed';
        booking.paymentId = razorpayPaymentId;
        await booking.save();
        
        res.status(200).json(new ApiResponse(200, 'Payment verified successfully', booking));
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
