// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/authControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, async (req, res) => {
  res.json(req.user);
});

export default router;
