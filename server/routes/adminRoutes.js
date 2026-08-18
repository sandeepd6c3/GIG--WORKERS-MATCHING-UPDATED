import { Router } from 'express';
import { getDashboardStats, getAllUsers, updateUserStatus, getVerificationQueue, processVerification, getAllBookings } from '../controllers/adminController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(protect, authorize('admin'));

router.get('/dashboard', getDashboardStats);
router.get('/users', getAllUsers);
router.patch('/users/:id/status', updateUserStatus);
router.get('/verifications', getVerificationQueue);
router.patch('/verifications/:id', processVerification);
router.get('/bookings', getAllBookings);

export default router;
