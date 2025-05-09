// routes/adminRoutes.js
import express from 'express';
import { registerAdmin, loginAdmin, getAllUsers, deleteUser } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin Routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/users', protect, admin, getAllUsers);
router.delete('/users/:id', protect, admin, deleteUser);

export default router;
