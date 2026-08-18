import { Router } from 'express';
import { createReview, getWorkerReviews } from '../controllers/reviewController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', protect, authorize('customer'), createReview);
router.get('/worker/:workerId', getWorkerReviews);

export default router;
