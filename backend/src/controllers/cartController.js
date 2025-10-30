import CartItem from '../models/cartModel.js';
import Product from '../models/productModel.js';

// Get all cart items
export const getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find({}).populate('productId');
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    res.status(200).json({
      success: true,
      count: cartItems.length,
      data: cartItems,
      total: total.toFixed(2)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message
    });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Product ID and quantity are required'
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if product is already in cart
    const existingCartItem = await CartItem.findOne({ productId });

    if (existingCartItem) {
      // Update quantity
      existingCartItem.quantity += parseInt(quantity);
      await existingCartItem.save();
      
      return res.status(200).json({
        success: true,
        message: 'Cart updated',
        data: existingCartItem
      });
    }

    // Create new cart item
    const cartItem = await CartItem.create({
      productId,
      quantity: parseInt(quantity),
      price: product.price,
      name: product.name,
      image: product.image
    });

    res.status(201).json({
      success: true,
      message: 'Item added to cart',
      data: cartItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to cart',
      error: error.message
    });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Valid quantity is required'
      });
    }

    const cartItem = await CartItem.findById(id);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    cartItem.quantity = parseInt(quantity);
    await cartItem.save();

    res.status(200).json({
      success: true,
      message: 'Cart item updated',
      data: cartItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating cart item',
      error: error.message
    });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await CartItem.findByIdAndDelete(id);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Item removed from cart'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing from cart',
      error: error.message
    });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    await CartItem.deleteMany({});

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing cart',
      error: error.message
    });
  }
};
