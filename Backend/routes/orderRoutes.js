import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
  updatePaymentStatus,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// User routes
router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);
router.post('/update-payment-status', protect, updatePaymentStatus);

// Admin-only routes
router.get('/', protect, admin, getAllOrders);

// Parameterized routes placed LAST
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

export default router;  // Updated to ES module export
