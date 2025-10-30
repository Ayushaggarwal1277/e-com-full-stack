import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import './App.css';

const Header = () => {
  const { getCartCount } = useCart();

  return (
    <header className="app-header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>🛒 Vibe Commerce</h1>
        </Link>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link cart-link">
            Cart
            {getCartCount() > 0 && (
              <span className="cart-badge">{getCartCount()}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="container">
        <p>&copy; 2025 Vibe Commerce. All rights reserved.</p>
        <p>A demonstration e-commerce cart application</p>
      </div>
    </footer>
  );
};

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <div className="container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
