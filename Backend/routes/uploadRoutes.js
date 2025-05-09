// routes/uploadRoutes.js

import express from 'express';
import upload from '../middleware/cloudinaryUpload.js';
import uploadImage from '../controllers/uploadController.js';

const router = express.Router();

router.post('/', upload.single('image'), uploadImage);

export default router;
