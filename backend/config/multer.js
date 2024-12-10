import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'books', // folder name in Cloudinary
        allowed_formats: ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "webp", "heif", "avif"],
    },
});

const upload = multer({ storage });

export default upload;
