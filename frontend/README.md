# Vibe Commerce Frontend

React + Vite frontend for the Vibe Commerce Cart application.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ProductList.jsx      # Product grid display
│   │   ├── Cart.jsx             # Shopping cart component
│   │   ├── CheckoutForm.jsx     # Checkout form with validation
│   │   └── ReceiptModal.jsx     # Order confirmation modal
│   ├── pages/
│   │   ├── HomePage.jsx         # Main landing page
│   │   └── CartPage.jsx         # Checkout page
│   ├── context/
│   │   └── CartContext.jsx      # Global cart state management
│   ├── App.jsx                  # Main app component with routing
│   ├── App.css                  # Global styles
│   └── main.jsx                 # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Components

### ProductList
Displays a grid of products with "Add to Cart" functionality.

**Features:**
- Responsive grid layout
- Product images from Unsplash
- Loading and error states
- Add to cart with feedback

### Cart
Shows cart items with quantity controls and totals.

**Features:**
- Real-time quantity updates
- Remove items
- Subtotal, tax, and total calculation
- Proceed to checkout button

### CheckoutForm
Customer information form with validation.

**Features:**
- Name and email inputs
- Form validation
- Order summary display
- Submit to complete purchase

### ReceiptModal
Modal displaying order confirmation.

**Features:**
- Order number and timestamp
- Customer information
- Itemized list
- Total with tax breakdown

## 🔄 State Management

### CartContext

Provides global cart state using React Context API.

**Available Methods:**
```javascript
const {
  cartItems,          // Array of cart items
  loading,            // Loading state
  error,              // Error message
  addToCart,          // (productId, quantity) => Promise
  updateCartItem,     // (itemId, quantity) => Promise
  removeFromCart,     // (itemId) => Promise
  clearCart,          // () => Promise
  fetchCart,          // () => Promise
  getCartTotal,       // () => Number
  getCartCount        // () => Number
} = useCart();
```

**Usage Example:**
```javascript
import { useCart } from '../context/CartContext';

function MyComponent() {
  const { cartItems, addToCart, getCartTotal } = useCart();
  
  const handleAdd = async () => {
    const result = await addToCart(productId, 1);
    if (result.success) {
      console.log('Added to cart!');
    }
  };
  
  return <div>Total: ${getCartTotal()}</div>;
}
```

## 🎯 Routing

Using React Router v6:

```javascript
/ - HomePage (product list + cart preview)
/cart - CartPage (checkout form)
```

## 🎨 Styling

### App.css

Comprehensive CSS with:
- Modern color scheme (purple gradient)
- Responsive grid layouts
- Hover effects and transitions
- Mobile-friendly design
- Accessible form controls

### Key Classes

```css
.products-grid       /* Responsive product grid */
.product-card        /* Individual product card */
.cart-item          /* Cart item layout */
.checkout-form      /* Checkout page styles */
.modal-overlay      /* Receipt modal backdrop */
.btn-add-to-cart    /* Primary action button */
```

## 📱 Responsive Design

Breakpoints:
- Desktop: > 768px
- Mobile: ≤ 768px

Features:
- Flexible grid layouts
- Touch-friendly buttons
- Readable fonts on all devices
- Optimized images

## 🔌 API Integration

Using Axios for HTTP requests:

```javascript
// Configured in vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true
  }
}
```

All API calls go through CartContext for consistency.

## ⚡ Vite Configuration

```javascript
// vite.config.js
{
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
}
```

## 🧪 Development

### Hot Module Replacement (HMR)
Changes reflect instantly without full page reload.

### Development Server
```bash
npm run dev
# Opens at http://localhost:3000
```

### Building
```bash
npm run build
# Output in dist/ folder
```

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.21.0",
  "axios": "^1.6.2"
}
```

## 🎯 Features Implemented

✅ Product catalog with images  
✅ Shopping cart with CRUD operations  
✅ Real-time cart updates  
✅ Checkout form with validation  
✅ Order confirmation modal  
✅ Loading and error states  
✅ Responsive design  
✅ React Context for state management  
✅ React Router for navigation  

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Output will be in `dist/` folder. Can be served with any static hosting:
- Vercel
- Netlify
- GitHub Pages
- Any web server

### Environment Variables
For production, update API endpoint in vite.config.js or use environment variables.

## 🐛 Troubleshooting

### Port 3000 Already in Use
Edit `vite.config.js`:
```javascript
server: {
  port: 3001  // Change port
}
```

### API Connection Issues
- Ensure backend is running on port 5000
- Check proxy configuration in vite.config.js
- Verify CORS is enabled on backend

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## 🎨 Customization

### Change Theme Colors
Edit `App.css`:
```css
/* Primary color */
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Buttons */
.btn-add-to-cart {
  background: #667eea;
}
```

### Modify Layout
Edit component JSX files in `src/components/`

---

**Built with React 18 + Vite**
