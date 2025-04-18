import express from 'express';
import { getAllProducts, getProduct, getProductsByCategory } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/category/:category', getProductsByCategory); 
router.get('/:id', getProduct);
router.get('/', getAllProducts);

export default router;
