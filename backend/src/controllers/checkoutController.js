import CartItem from '../models/cartModel.js';

// Process checkout
export const processCheckout = async (req, res) => {
  try {
    const { name, email, cartItems } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create mock receipt
    const receipt = {
      orderNumber,
      customerName: name,
      customerEmail: email,
      items: cartItems,
      subtotal: total.toFixed(2),
      tax: (total * 0.1).toFixed(2),
      total: (total * 1.1).toFixed(2),
      timestamp: new Date().toISOString(),
      status: 'Confirmed',
      message: 'Thank you for your order! Your order has been confirmed.'
    };

    // Clear cart after successful checkout
    await CartItem.deleteMany({});

    res.status(200).json({
      success: true,
      message: 'Checkout successful',
      data: receipt
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing checkout',
      error: error.message
    });
  }
};
