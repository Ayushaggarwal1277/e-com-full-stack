import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/cartController.js';

const router = express.Router();

// GET /api/cart - Get all cart items
router.get('/', getCart);

// POST /api/cart - Add item to cart
router.post('/', addToCart);

// PUT /api/cart/:id - Update cart item quantity
router.put('/:id', updateCartItem);

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', removeFromCart);

// DELETE /api/cart - Clear entire cart
router.delete('/', clearCart);

export default router;
