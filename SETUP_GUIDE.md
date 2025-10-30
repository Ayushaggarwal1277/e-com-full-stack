# 🚀 Quick Setup Guide for Vibe Commerce Cart

Follow these steps to get the application running on your Windows machine.

## Step 1: Verify Prerequisites

Open PowerShell and check if you have the required software:

```powershell
# Check Node.js version (should be v16+)
node --version

# Check npm version
npm --version

# Check if MongoDB is installed
mongod --version
```

If any are missing:
- Node.js: Download from https://nodejs.org/
- MongoDB: Download from https://www.mongodb.com/try/download/community

## Step 2: Start MongoDB

Open a PowerShell window and run:

```powershell
# Start MongoDB service
mongod
```

Keep this window open! MongoDB must be running for the application to work.

## Step 3: Install Backend Dependencies

Open a new PowerShell window:

```powershell
# Navigate to backend folder
cd "c:\Users\Ashutosh Aggarwal\Desktop\Vansh_Assignment\backend"

# Install dependencies
npm install

# Start the backend server
npm run dev
```

You should see:
```
Server running in development mode on port 5000
MongoDB Connected: localhost
```

Keep this window open!

## Step 4: Install Frontend Dependencies

Open a third PowerShell window:

```powershell
# Navigate to frontend folder
cd "c:\Users\Ashutosh Aggarwal\Desktop\Vansh_Assignment\frontend"

# Install dependencies
npm install

# Start the frontend server
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:3000/
```

## Step 5: Initialize Database

Open a fourth PowerShell window or use your browser:

**Option A: Using PowerShell**
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/products/initialize" -Method POST
```

**Option B: Using Browser**
Simply visit: http://localhost:5000/api/products/initialize

You should see a JSON response with 10 products created.

## Step 6: Open the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the Vibe Commerce homepage with 10 products!

## 🎉 You're Done!

Now you can:
1. Browse products
2. Add items to cart
3. Update quantities
4. Proceed to checkout
5. Complete a purchase and see the receipt

## 🛑 To Stop the Application

Press `Ctrl + C` in each PowerShell window to stop:
1. Frontend server
2. Backend server
3. MongoDB

## 📝 Quick Reference

### Running Servers
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **MongoDB**: localhost:27017

### Important Commands

```powershell
# Backend (in backend folder)
npm install          # Install dependencies
npm run dev          # Start development server
npm start            # Start production server

# Frontend (in frontend folder)
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production

# Initialize products (one-time)
Invoke-WebRequest -Uri "http://localhost:5000/api/products/initialize" -Method POST
```

## 🐛 Common Issues

### Issue: "Cannot connect to MongoDB"
**Solution**: Make sure MongoDB is running in a separate PowerShell window
```powershell
mongod
```

### Issue: "Port 5000 already in use"
**Solution**: Kill the process or change the port in `backend/.env`
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

### Issue: "Port 3000 already in use"
**Solution**: Change port in `frontend/vite.config.js`
```javascript
server: {
  port: 3001  // Change to any available port
}
```

### Issue: "Products not showing"
**Solution**: Initialize the database
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/products/initialize" -Method POST
```

## 📚 Next Steps

- Read the main README.md for detailed documentation
- Check backend/README.md for API documentation
- Check frontend/README.md for component documentation

## 💡 Tips

1. **Keep three PowerShell windows open**:
   - Window 1: MongoDB (`mongod`)
   - Window 2: Backend (`npm run dev`)
   - Window 3: Frontend (`npm run dev`)

2. **Auto-reload**: Both frontend and backend auto-reload when you make changes

3. **Debugging**: Check the PowerShell windows for error messages

4. **Browser Console**: Open DevTools (F12) to see frontend errors

## 🎓 Project Structure

```
Vansh_Assignment/
├── backend/          ← Node.js/Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.js
│   └── package.json
│
└── frontend/         ← React + Vite
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   └── App.jsx
    └── package.json
```

---

**Happy Coding! 🚀**
