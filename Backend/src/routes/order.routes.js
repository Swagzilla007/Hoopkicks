import express from 'express';
import { createOrder } from '../controllers/order.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Ensure authentication for all order routes
router.use(authenticateToken);

// Create order route
router.post('/', createOrder);

export default router;
