import express from 'express';
import {
  getAllProducts,
  getProductById,
  initializeProducts
} from '../controllers/productController.js';

const router = express.Router();

// GET /api/products - Get all products
router.get('/', getAllProducts);

// GET /api/products/:id - Get single product
router.get('/:id', getProductById);

// POST /api/products/initialize - Initialize products (one-time setup)
router.post('/initialize', initializeProducts);

export default router;
