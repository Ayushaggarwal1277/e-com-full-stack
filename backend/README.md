# Vibe Commerce Backend

Node.js/Express REST API for the Vibe Commerce Cart application.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## 🔌 API Endpoints

### Products

#### Get All Products
```
GET /api/products
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "name": "Wireless Headphones",
      "price": 79.99,
      "image": "https://...",
      "description": "Premium wireless headphones",
      "category": "Electronics",
      "stock": 50
    }
  ]
}
```

#### Get Single Product
```
GET /api/products/:id
```

#### Initialize Products (One-time Setup)
```
POST /api/products/initialize
```

### Cart

#### Get Cart
```
GET /api/cart
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [...],
  "total": "159.98"
}
```

#### Add to Cart
```
POST /api/cart
Content-Type: application/json

{
  "productId": "64f5a1b2c8d4e5f6a7b8c9d0",
  "quantity": 1
}
```

#### Update Cart Item
```
PUT /api/cart/:id
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove from Cart
```
DELETE /api/cart/:id
```

#### Clear Cart
```
DELETE /api/cart
```

### Checkout

#### Process Checkout
```
POST /api/checkout
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "cartItems": [
    {
      "_id": "...",
      "productId": "...",
      "name": "Product Name",
      "price": 79.99,
      "quantity": 2,
      "image": "..."
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Checkout successful",
  "data": {
    "orderNumber": "ORD-1234567890-123",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "items": [...],
    "subtotal": "159.98",
    "tax": "15.99",
    "total": "175.97",
    "timestamp": "2025-10-30T12:00:00.000Z",
    "status": "Confirmed",
    "message": "Thank you for your order!"
  }
}
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── productController.js   # Product logic
│   │   ├── cartController.js      # Cart logic
│   │   └── checkoutController.js  # Checkout logic
│   ├── models/
│   │   ├── productModel.js        # Product schema
│   │   └── cartModel.js           # Cart schema
│   ├── routes/
│   │   ├── productRoutes.js       # Product endpoints
│   │   ├── cartRoutes.js          # Cart endpoints
│   │   └── checkoutRoutes.js      # Checkout endpoints
│   └── server.js              # Entry point
├── .env                       # Environment variables
├── .gitignore
└── package.json
```

## ⚙️ Configuration

### Environment Variables (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
NODE_ENV=development
```

## 🗄️ Database Models

### Product Model
```javascript
{
  name: String (required),
  price: Number (required),
  image: String (required),
  description: String,
  category: String,
  stock: Number,
  timestamps: true
}
```

### CartItem Model
```javascript
{
  productId: ObjectId (ref: Product),
  quantity: Number (required, min: 1),
  price: Number (required),
  name: String (required),
  image: String (required),
  timestamps: true
}
```

## 🔒 Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## 🛠️ Development

```bash
# Install nodemon for auto-restart
npm install -D nodemon

# Run in development mode
npm run dev
```

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

## 🚀 Deployment Notes

1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Enable HTTPS
4. Set proper CORS origins
5. Use environment variables for sensitive data

## 📝 API Testing

### Using curl (PowerShell)

```powershell
# Get all products
Invoke-RestMethod -Uri "http://localhost:5000/api/products"

# Add to cart
$body = @{
    productId = "64f5a1b2c8d4e5f6a7b8c9d0"
    quantity = 1
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/cart" -Method POST -Body $body -ContentType "application/json"
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify MongoDB port (default: 27017)

### Port Already in Use
- Change PORT in `.env`
- Kill process using port: `netstat -ano | findstr :5000`

---

**Built with Express.js and MongoDB**
