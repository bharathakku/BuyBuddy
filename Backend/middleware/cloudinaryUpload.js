import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'buybuddy_uploads', // Folder in Cloudinary to store images
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // Allowed image formats
    public_id: (req, file) => `${file.fieldname}-${Date.now()}` // Unique public_id for each image
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  }
});

export default upload;
