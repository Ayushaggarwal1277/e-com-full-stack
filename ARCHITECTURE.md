# 🏗️ Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
│                     http://localhost:3000                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Requests
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    FRONTEND (React + Vite)                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    App Component                         │   │
│  │  ┌───────────┐  ┌────────────┐  ┌────────────────┐     │   │
│  │  │  Header   │  │   Router   │  │    Footer      │     │   │
│  │  └───────────┘  └──────┬─────┘  └────────────────┘     │   │
│  │                         │                                │   │
│  │           ┌─────────────┴──────────────┐               │   │
│  │           │                            │               │   │
│  │      ┌────▼──────┐              ┌─────▼──────┐        │   │
│  │      │ HomePage  │              │ CartPage   │        │   │
│  │      └────┬──────┘              └─────┬──────┘        │   │
│  └───────────┼──────────────────────────┼────────────────┘   │
│              │                           │                     │
│  ┌───────────▼───────────────────────────▼──────────────┐    │
│  │              CartContext (State)                      │    │
│  │  • cartItems[]                                        │    │
│  │  • addToCart()                                        │    │
│  │  • updateCartItem()                                   │    │
│  │  • removeFromCart()                                   │    │
│  │  • getCartTotal()                                     │    │
│  └───────────────────────┬───────────────────────────────┘    │
│                          │                                     │
│  ┌───────────────────────▼───────────────────────────────┐    │
│  │                  Components Layer                      │    │
│  │  ┌──────────┐  ┌──────┐  ┌──────────┐  ┌──────────┐  │    │
│  │  │ Product  │  │ Cart │  │ Checkout │  │ Receipt  │  │    │
│  │  │   List   │  │      │  │   Form   │  │  Modal   │  │    │
│  │  └──────────┘  └──────┘  └──────────┘  └──────────┘  │    │
│  └────────────────────────────────────────────────────────┘    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Axios HTTP (JSON)
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                  BACKEND (Node.js + Express)                     │
│                     http://localhost:5000                        │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                     server.js                             │  │
│  │  • Express setup                                          │  │
│  │  • CORS middleware                                        │  │
│  │  • JSON parsing                                           │  │
│  │  • Error handling                                         │  │
│  └──────────────────────┬───────────────────────────────────┘  │
│                         │                                       │
│           ┌─────────────┼─────────────┐                        │
│           │             │             │                        │
│  ┌────────▼─────┐  ┌────▼──────┐  ┌──▼──────────┐            │
│  │  /products   │  │  /cart    │  │ /checkout   │            │
│  │   Routes     │  │  Routes   │  │  Routes     │            │
│  └────────┬─────┘  └────┬──────┘  └──┬──────────┘            │
│           │             │             │                        │
│  ┌────────▼─────┐  ┌────▼──────┐  ┌──▼──────────┐            │
│  │  Product     │  │   Cart    │  │  Checkout   │            │
│  │ Controller   │  │Controller │  │ Controller  │            │
│  └────────┬─────┘  └────┬──────┘  └──┬──────────┘            │
│           │             │             │                        │
│  ┌────────▼─────────────▼─────────────▼──────────┐            │
│  │            Mongoose Models                     │            │
│  │  ┌──────────────┐    ┌────────────────┐      │            │
│  │  │   Product    │    │   CartItem     │      │            │
│  │  │   Schema     │    │    Schema      │      │            │
│  │  └──────────────┘    └────────────────┘      │            │
│  └─────────────────────────┬──────────────────────┘            │
└────────────────────────────┼────────────────────────────────────┘
                             │
                             │ Mongoose ODM
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    DATABASE (MongoDB)                            │
│                  mongodb://localhost:27017                       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              vibe-commerce Database                       │  │
│  │                                                            │  │
│  │  ┌─────────────────┐       ┌──────────────────┐         │  │
│  │  │    products     │       │   cartitems      │         │  │
│  │  │   Collection    │       │   Collection     │         │  │
│  │  │                 │       │                  │         │  │
│  │  │ • _id           │       │ • _id            │         │  │
│  │  │ • name          │       │ • productId      │         │  │
│  │  │ • price         │       │ • quantity       │         │  │
│  │  │ • image         │       │ • price          │         │  │
│  │  │ • description   │       │ • name           │         │  │
│  │  │ • category      │       │ • image          │         │  │
│  │  │ • stock         │       │ • timestamps     │         │  │
│  │  │ • timestamps    │       │                  │         │  │
│  │  └─────────────────┘       └──────────────────┘         │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### 1. View Products Flow
```
User Opens App
    │
    ▼
HomePage Component Mounts
    │
    ▼
useEffect Calls fetchProducts()
    │
    ▼
Axios GET /api/products
    │
    ▼
Backend Product Routes
    │
    ▼
Product Controller
    │
    ▼
Mongoose Query Products
    │
    ▼
MongoDB Returns Products
    │
    ▼
Backend Returns JSON
    │
    ▼
Frontend Updates State
    │
    ▼
Products Displayed in Grid
```

### 2. Add to Cart Flow
```
User Clicks "Add to Cart"
    │
    ▼
handleAddToCart() Called
    │
    ▼
CartContext.addToCart(productId, qty)
    │
    ▼
Axios POST /api/cart {productId, quantity}
    │
    ▼
Backend Cart Routes
    │
    ▼
Cart Controller
    │
    ▼
Mongoose Create/Update CartItem
    │
    ▼
MongoDB Saves Cart Item
    │
    ▼
Backend Returns Success
    │
    ▼
CartContext Refreshes Cart
    │
    ▼
Cart Component Updates
    │
    ▼
UI Shows Updated Cart
```

### 3. Checkout Flow
```
User Fills Checkout Form
    │
    ▼
Submits with Name & Email
    │
    ▼
Form Validation
    │
    ▼
Axios POST /api/checkout
    │
    ▼
Backend Checkout Routes
    │
    ▼
Checkout Controller
    │
    ▼
Calculate Total + Tax
    │
    ▼
Generate Order Number
    │
    ▼
Mongoose Delete Cart Items
    │
    ▼
MongoDB Clears Cart
    │
    ▼
Backend Returns Receipt
    │
    ▼
Frontend Shows Receipt Modal
    │
    ▼
User Sees Confirmation
```

---

## Component Hierarchy

```
App
├── Header
│   ├── Logo (Link to /)
│   └── Navigation
│       ├── Home Link
│       └── Cart Link (with badge)
│
├── Router
│   ├── Route "/"
│   │   └── HomePage
│   │       ├── Hero Section
│   │       ├── ProductList
│   │       │   └── ProductCard (×10)
│   │       │       ├── Image
│   │       │       ├── Name
│   │       │       ├── Description
│   │       │       ├── Price
│   │       │       └── Add to Cart Button
│   │       └── Cart Preview
│   │           └── Cart Component
│   │
│   └── Route "/cart"
│       └── CartPage
│           ├── Back Button
│           └── CheckoutForm
│               ├── Order Summary
│               ├── Customer Form
│               │   ├── Name Input
│               │   └── Email Input
│               └── Submit Button
│
└── Footer
    └── Copyright Info
```

---

## State Management Architecture

```
CartProvider (Context)
    │
    ├── State
    │   ├── cartItems: []
    │   ├── loading: false
    │   └── error: null
    │
    ├── Actions
    │   ├── fetchCart()
    │   ├── addToCart(productId, quantity)
    │   ├── updateCartItem(itemId, quantity)
    │   ├── removeFromCart(itemId)
    │   └── clearCart()
    │
    └── Computed Values
        ├── getCartTotal()
        └── getCartCount()
```

---

## API Routes Structure

```
/api
├── /products
│   ├── GET    /               → getAllProducts
│   ├── GET    /:id            → getProductById
│   └── POST   /initialize     → initializeProducts
│
├── /cart
│   ├── GET    /               → getCart
│   ├── POST   /               → addToCart
│   ├── PUT    /:id            → updateCartItem
│   ├── DELETE /:id            → removeFromCart
│   └── DELETE /               → clearCart
│
└── /checkout
    └── POST   /               → processCheckout
```

---

## File Dependencies

### Backend Dependencies Flow
```
server.js
    ├── config/db.js (MongoDB connection)
    ├── routes/productRoutes.js
    │   └── controllers/productController.js
    │       └── models/productModel.js
    ├── routes/cartRoutes.js
    │   └── controllers/cartController.js
    │       ├── models/cartModel.js
    │       └── models/productModel.js
    └── routes/checkoutRoutes.js
        └── controllers/checkoutController.js
            └── models/cartModel.js
```

### Frontend Dependencies Flow
```
main.jsx
    └── App.jsx
        ├── context/CartContext.jsx (axios)
        ├── pages/HomePage.jsx
        │   ├── components/ProductList.jsx (CartContext, axios)
        │   └── components/Cart.jsx (CartContext)
        └── pages/CartPage.jsx
            └── components/CheckoutForm.jsx (CartContext, axios)
                └── components/ReceiptModal.jsx
```

---

## Technology Stack Layers

```
┌─────────────────────────────────────────────┐
│           Presentation Layer                 │
│  React Components + CSS + React Router      │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│          State Management Layer              │
│        React Context API + Hooks            │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│          HTTP Client Layer                   │
│               Axios                          │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│          API/Business Logic Layer            │
│        Express.js + Controllers             │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│          Data Access Layer                   │
│        Mongoose ODM + Models                │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│          Database Layer                      │
│              MongoDB                         │
└─────────────────────────────────────────────┘
```

---

## Security & Best Practices

```
Frontend
    ├── Input Validation (email, required fields)
    ├── Error Handling (try-catch, error states)
    ├── Loading States (prevent duplicate requests)
    └── Environment Variables (API endpoints)

Backend
    ├── CORS Configuration (allow frontend origin)
    ├── Input Validation (Mongoose schemas)
    ├── Error Handling Middleware
    ├── Environment Variables (.env file)
    └── MongoDB Connection Security

Database
    ├── Schema Validation
    ├── Type Enforcement
    └── Required Fields
```

---

This architecture provides a clear separation of concerns, making the application maintainable, scalable, and easy to understand.
