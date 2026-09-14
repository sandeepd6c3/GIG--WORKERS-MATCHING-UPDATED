import { Router } from 'express';
import { createOrder, verifyPayment, webhook } from '../controllers/paymentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/create-order', protect, authorize('customer'), createOrder);
router.post('/verify', protect, authorize('customer'), verifyPayment);
router.post('/webhook', webhook);

export default router;
