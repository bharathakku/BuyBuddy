import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts, 
} from '../controllers/productController.js';

import { protect, admin } from '../middleware/authMiddleware.js';  
import upload from '../middleware/cloudinaryUpload.js'; 

const router = express.Router();

router.post('/', protect, admin, upload.single('image'), createProduct);

router.get('/search', searchProducts);

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;
