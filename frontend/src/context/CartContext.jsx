import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/cart');
      setCartItems(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching cart');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      await axios.post('/api/cart', { productId, quantity });
      await fetchCart();
      setError(null);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Error adding to cart';
      setError(message);
      console.error('Error adding to cart:', err);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Update cart item quantity
  const updateCartItem = async (itemId, quantity) => {
    try {
      setLoading(true);
      await axios.put(`/api/cart/${itemId}`, { quantity });
      await fetchCart();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating cart');
      console.error('Error updating cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      await axios.delete(`/api/cart/${itemId}`);
      await fetchCart();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error removing from cart');
      console.error('Error removing from cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      setLoading(true);
      await axios.delete('/api/cart');
      setCartItems([]);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error clearing cart');
      console.error('Error clearing cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate cart totals
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Load cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    cartItems,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart,
    getCartTotal,
    getCartCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
