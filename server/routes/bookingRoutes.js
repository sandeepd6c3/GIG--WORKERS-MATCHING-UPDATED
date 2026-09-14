import express from 'express';
import { createBooking, getMyBookings, updateBookingStatus } from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('customer'), createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.patch('/:id/status', protect, updateBookingStatus);

export default router;
