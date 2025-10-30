import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, loading, updateCartItem, removeFromCart, getCartTotal, getCartCount } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItem(itemId, newQuantity);
  };

  const handleRemove = (itemId) => {
    if (window.confirm('Remove this item from cart?')) {
      removeFromCart(itemId);
    }
  };

  const handleCheckout = () => {
    navigate('/cart');
  };

  if (loading && cartItems.length === 0) {
    return <div className="loading">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h3>Your cart is empty</h3>
        <p>Add some products to get started!</p>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="cart">
      <h2>Shopping Cart ({getCartCount()} items)</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-actions">
              <div className="quantity-controls">
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  disabled={loading}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  disabled={loading}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemove(item._id)}
                className="btn-remove"
                disabled={loading}
              >
                Remove
              </button>
            </div>
            <div className="cart-item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Tax (10%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button onClick={handleCheckout} className="btn-checkout">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
