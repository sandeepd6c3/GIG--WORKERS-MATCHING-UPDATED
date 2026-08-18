import { Router } from 'express';
import { getWorkers, getWorkerById, updateWorkerProfile, toggleAvailability, uploadDocuments } from '../controllers/workerController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getWorkers);
router.get('/:id', getWorkerById);
router.put('/profile', protect, authorize('worker'), updateWorkerProfile);
router.patch('/availability', protect, authorize('worker'), toggleAvailability);
router.post('/documents', protect, authorize('worker'), uploadDocuments);

export default router;
