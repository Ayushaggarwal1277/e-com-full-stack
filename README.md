# Vibe Commerce Cart

A full-stack e-commerce shopping cart application built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **Product Catalog**: Browse 10 sample products with images, descriptions, and prices
- **Shopping Cart**: Add, update, and remove items from cart
- **Real-time Cart Updates**: Cart state managed with React Context
- **Checkout Process**: Complete checkout with customer information validation
- **Order Confirmation**: Detailed receipt modal with order summary
- **Responsive Design**: Mobile-friendly UI with modern styling
- **REST API**: Full backend API with MongoDB persistence

## 📁 Project Structure

```
Assignment/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js       # MongoDB connection
│   │   ├── controllers/    # Business logic
│   │   │   ├── productController.js
│   │   │   ├── cartController.js
│   │   │   └── checkoutController.js
│   │   ├── models/         # Mongoose schemas
│   │   │   ├── productModel.js
│   │   │   └── cartModel.js
│   │   ├── routes/         # API routes
│   │   │   ├── productRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   └── checkoutRoutes.js
│   │   └── server.js       # Entry point
│   ├── package.json
│   └── .env                # Environment variables
│
└── frontend/               # React + Vite frontend
    ├── src/
    │   ├── components/     # React components
    │   │   ├── ProductList.jsx
    │   │   ├── Cart.jsx
    │   │   ├── CheckoutForm.jsx
    │   │   └── ReceiptModal.jsx
    │   ├── pages/          # Page components
    │   │   ├── HomePage.jsx
    │   │   └── CartPage.jsx
    │   ├── context/        # State management
    │   │   └── CartContext.jsx
    │   ├── App.jsx         # Main app component
    │   ├── App.css         # Styles
    │   └── main.jsx        # Entry point
    ├── package.json
    └── vite.config.js
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Comes with Node.js

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
cd "c:\Users\Ashutosh Aggarwal\Desktop\Vansh_Assignment"
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Make sure MongoDB is running on your system
# Default connection: mongodb://localhost:27017/vibe-commerce

# Start the backend server
npm run dev
```

The backend server will run on **http://localhost:5000**

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on **http://localhost:3000**

### 4. Initialize Products

After both servers are running, initialize the product database:

**Option 1: Using a browser**
- Open: http://localhost:5000/api/products/initialize
- This will populate the database with 10 sample products

**Option 2: Using curl (PowerShell)**
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/products/initialize" -Method POST
```

## 🎯 Usage

1. **Browse Products**: Open http://localhost:3000 to view the product catalog
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click "Cart" in the navigation or scroll down on homepage
4. **Update Quantities**: Use +/- buttons to adjust quantities
5. **Remove Items**: Click "Remove" to delete items from cart
6. **Checkout**: Click "Proceed to Checkout"
7. **Complete Order**: Fill in name and email, then click "Complete Purchase"
8. **View Receipt**: A modal will show your order confirmation

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products/initialize` - Initialize products (one-time)

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
  ```json
  { "productId": "...", "quantity": 1 }
  ```
- `PUT /api/cart/:id` - Update cart item
  ```json
  { "quantity": 2 }
  ```
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Checkout
- `POST /api/checkout` - Process checkout
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "cartItems": [...]
  }
  ```

## 🎨 Features Implemented

### Core Features
✅ Product listing with images and descriptions  
✅ Add/remove items from cart  
✅ Update item quantities  
✅ Real-time cart totals calculation  
✅ Checkout form with validation  
✅ Order confirmation receipt  

### Bonus Features
✅ MongoDB persistence  
✅ Loading states and error handling  
✅ Input validation on checkout  
✅ Responsive design  
✅ Professional UI/UX  

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running:
```bash
# Windows
mongod

# Or use MongoDB Compass to start MongoDB
```

### Port Already in Use
**Solution**: Change the port in configuration files:
- Backend: Edit `backend/.env` → `PORT=5001`
- Frontend: Edit `frontend/vite.config.js` → `port: 3001`

### Products Not Showing
**Solution**: Initialize the database:
```bash
# Using PowerShell
Invoke-WebRequest -Uri "http://localhost:5000/api/products/initialize" -Method POST
```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
NODE_ENV=development
```

## 🚀 Building for Production

### Frontend
```bash
cd frontend
npm run build
# Build output will be in frontend/dist
```

### Backend
```bash
cd backend
npm start
```

## 👨‍💻 Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Hot module replacement enabled
```

## 📦 Dependencies

### Backend
- express: ^4.18.2
- mongoose: ^8.0.3
- cors: ^2.8.5
- dotenv: ^16.3.1

### Frontend
- react: ^18.2.0
- react-router-dom: ^6.21.0
- axios: ^1.6.2

## 🤝 Contributing

This is a coding assignment project. For educational purposes only.

## 📄 License

ISC

## 🎓 Assignment Details

**Purpose**: Demonstrate full-stack development skills  
**Technologies**: React, Node.js, Express, MongoDB  
**Features**: Product catalog, shopping cart, checkout process  
**API**: RESTful endpoints with proper error handling  

---

**Built with ❤️ for the coding assignment**
