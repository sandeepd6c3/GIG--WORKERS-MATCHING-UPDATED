import express from 'express';
import { getDashboardStats, getAllUsers, getPendingVerifications } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/users', protect, adminOnly, getAllUsers);
router.get('/verifications', protect, adminOnly, getPendingVerifications);

export default router;
