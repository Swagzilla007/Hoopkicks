import express from 'express';
import { authenticateToken, isAdmin } from '../middleware/auth.middleware.js';
import { 
  getAllOrders, 
  updateOrder, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getDashboardStats
} from '../controllers/admin.controller.js';

const router = express.Router();

// Apply authentication and admin check to all routes
router.use(authenticateToken, isAdmin);

// Add new route for dashboard stats
router.get('/dashboard', getDashboardStats);

// Order routes
router.get('/orders', getAllOrders);
router.put('/orders/:id', updateOrder);

// Product routes
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
