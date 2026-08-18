import { Router } from 'express';
import { getMyNotifications, markAsRead, markAllAsRead, getUnreadCount } from '../controllers/notificationController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(protect);
router.get('/', getMyNotifications);
router.patch('/:id/read', markAsRead);
router.patch('/read-all', markAllAsRead);
router.get('/unread-count', getUnreadCount);

export default router;
