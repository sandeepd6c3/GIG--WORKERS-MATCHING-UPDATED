import express from 'express';
import { matchWorkers } from '../controllers/matchingController.js';

const router = express.Router();

// POST /api/v1/matching/workers
router.post('/workers', matchWorkers);

export default router;
