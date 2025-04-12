import express from 'express';
import { createOrder } from '../controllers/order.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authenticateToken, createOrder);  // Using authenticateToken instead of authenticate

export default router;
