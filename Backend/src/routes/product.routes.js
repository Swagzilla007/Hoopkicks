import express from 'express';
import { getAllProducts, getProduct, getProductsByCategory } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.get('/category/:category', getProductsByCategory);

export default router;
