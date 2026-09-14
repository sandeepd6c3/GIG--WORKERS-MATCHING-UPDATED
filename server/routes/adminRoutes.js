import express from 'express';
import { 
  getDashboardStats, 
  getAllUsers, 
  getAllWorkers, 
  getAllBookings, 
  getPendingVerifications, 
  updateVerification 
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/users', protect, adminOnly, getAllUsers);
router.get('/workers', protect, adminOnly, getAllWorkers);
router.get('/bookings', protect, adminOnly, getAllBookings);
router.get('/verifications', protect, adminOnly, getPendingVerifications);
router.patch('/verifications/:id', protect, adminOnly, updateVerification);

export default router;
