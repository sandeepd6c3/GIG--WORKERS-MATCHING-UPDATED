import { Router } from 'express';
import { createBooking, getMyBookings, getBookingById, updateBookingStatus, cancelBooking } from '../controllers/bookingController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(protect);
router.post('/', authorize('customer'), createBooking);
router.get('/my', getMyBookings);
router.get('/:id', getBookingById);
router.patch('/:id/status', authorize('worker', 'admin'), updateBookingStatus);
router.patch('/:id/cancel', cancelBooking);

export default router;
