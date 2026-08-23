import express from 'express';
import { createReview, getWorkerReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createReview);
router.get('/worker/:workerId', getWorkerReviews);

export default router;
