import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart-page">
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <button onClick={() => navigate('/')} className="btn-back">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <button onClick={() => navigate('/')} className="btn-back">
        ← Back to Shopping
      </button>
      <CheckoutForm />
    </div>
  );
};

export default CartPage;
