import express from 'express';
import multer from 'multer';
import path from 'path';
import { authenticateToken, isAdmin } from '../middleware/auth.middleware.js';
import { 
  getAllOrders, 
  updateOrder, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getDashboardStats,
  uploadImage,
  deleteOrder,
  createAdmin
} from '../controllers/admin.controller.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets/products')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and WebP are allowed.'));
    }
  }
});

// Apply authentication and admin check to all routes
router.use(authenticateToken, isAdmin);

// Add new route for dashboard stats
router.get('/dashboard', getDashboardStats);

// Order routes
router.get('/orders', getAllOrders);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

// Product routes
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Add new route for image upload
router.post('/upload', upload.single('image'), uploadImage);

// Add new route for admin registration
router.post('/register', createAdmin);

export default router;
