import express from 'express';
import { getWorkers, getWorkerById, updateAvailability } from '../controllers/workerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getWorkers);
router.get('/:id', getWorkerById);
router.patch('/availability', protect, updateAvailability);

export default router;
