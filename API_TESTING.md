# 🧪 API Testing Guide

This guide shows how to test the Vibe Commerce API endpoints using PowerShell.

## Prerequisites

- Backend server running on http://localhost:5000
- PowerShell (comes with Windows)

## Testing Commands

### 1. Test Server Status

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/"
```

**Expected Response:**
```json
{
  "message": "Welcome to Vibe Commerce API",
  "version": "1.0.0",
  "endpoints": {
    "products": "/api/products",
    "cart": "/api/cart",
    "checkout": "/api/checkout"
  }
}
```

---

## Product Endpoints

### Get All Products

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/products"
```

### Initialize Products (One-time)

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/products/initialize" -Method POST
```

### Get Single Product

```powershell
# Replace with actual product ID
$productId = "YOUR_PRODUCT_ID"
Invoke-RestMethod -Uri "http://localhost:5000/api/products/$productId"
```

---

## Cart Endpoints

### Get Cart

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/cart"
```

### Add to Cart

```powershell
# First, get a product ID
$products = Invoke-RestMethod -Uri "http://localhost:5000/api/products"
$productId = $products.data[0]._id

# Add to cart
$body = @{
    productId = $productId
    quantity = 2
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/cart" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### Update Cart Item

```powershell
# First, get cart item ID
$cart = Invoke-RestMethod -Uri "http://localhost:5000/api/cart"
$cartItemId = $cart.data[0]._id

# Update quantity
$body = @{
    quantity = 5
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/cart/$cartItemId" `
    -Method PUT `
    -Body $body `
    -ContentType "application/json"
```

### Remove from Cart

```powershell
# Get cart item ID
$cart = Invoke-RestMethod -Uri "http://localhost:5000/api/cart"
$cartItemId = $cart.data[0]._id

# Remove item
Invoke-RestMethod -Uri "http://localhost:5000/api/cart/$cartItemId" `
    -Method DELETE
```

### Clear Cart

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/cart" -Method DELETE
```

---

## Checkout Endpoint

### Process Checkout

```powershell
# Get current cart items
$cart = Invoke-RestMethod -Uri "http://localhost:5000/api/cart"

# Checkout
$body = @{
    name = "John Doe"
    email = "john.doe@example.com"
    cartItems = $cart.data
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "http://localhost:5000/api/checkout" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

---

## Complete Test Workflow

Here's a complete test from start to finish:

```powershell
# 1. Initialize products
Write-Host "1. Initializing products..." -ForegroundColor Cyan
$init = Invoke-RestMethod -Uri "http://localhost:5000/api/products/initialize" -Method POST
Write-Host "   Created $($init.count) products" -ForegroundColor Green

# 2. Get all products
Write-Host "`n2. Fetching products..." -ForegroundColor Cyan
$products = Invoke-RestMethod -Uri "http://localhost:5000/api/products"
Write-Host "   Found $($products.count) products" -ForegroundColor Green
$product1 = $products.data[0]
$product2 = $products.data[1]

# 3. Add first product to cart
Write-Host "`n3. Adding $($product1.name) to cart..." -ForegroundColor Cyan
$body1 = @{
    productId = $product1._id
    quantity = 2
} | ConvertTo-Json
$added1 = Invoke-RestMethod -Uri "http://localhost:5000/api/cart" -Method POST -Body $body1 -ContentType "application/json"
Write-Host "   Added successfully!" -ForegroundColor Green

# 4. Add second product to cart
Write-Host "`n4. Adding $($product2.name) to cart..." -ForegroundColor Cyan
$body2 = @{
    productId = $product2._id
    quantity = 1
} | ConvertTo-Json
$added2 = Invoke-RestMethod -Uri "http://localhost:5000/api/cart" -Method POST -Body $body2 -ContentType "application/json"
Write-Host "   Added successfully!" -ForegroundColor Green

# 5. View cart
Write-Host "`n5. Viewing cart..." -ForegroundColor Cyan
$cart = Invoke-RestMethod -Uri "http://localhost:5000/api/cart"
Write-Host "   Cart has $($cart.count) items" -ForegroundColor Green
Write-Host "   Total: $$$($cart.total)" -ForegroundColor Green

# 6. Update quantity
Write-Host "`n6. Updating quantity..." -ForegroundColor Cyan
$cartItemId = $cart.data[0]._id
$updateBody = @{
    quantity = 3
} | ConvertTo-Json
$updated = Invoke-RestMethod -Uri "http://localhost:5000/api/cart/$cartItemId" -Method PUT -Body $updateBody -ContentType "application/json"
Write-Host "   Updated to quantity: $($updated.data.quantity)" -ForegroundColor Green

# 7. Checkout
Write-Host "`n7. Processing checkout..." -ForegroundColor Cyan
$cart = Invoke-RestMethod -Uri "http://localhost:5000/api/cart"
$checkoutBody = @{
    name = "Test User"
    email = "test@example.com"
    cartItems = $cart.data
} | ConvertTo-Json -Depth 10
$receipt = Invoke-RestMethod -Uri "http://localhost:5000/api/checkout" -Method POST -Body $checkoutBody -ContentType "application/json"
Write-Host "   Order Number: $($receipt.data.orderNumber)" -ForegroundColor Green
Write-Host "   Total: $$$($receipt.data.total)" -ForegroundColor Green

Write-Host "`n✅ All tests completed successfully!" -ForegroundColor Green
```

---

## Error Testing

### Test with Invalid Data

```powershell
# Add to cart without productId
$badBody = @{
    quantity = 1
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri "http://localhost:5000/api/cart" `
        -Method POST `
        -Body $badBody `
        -ContentType "application/json"
} catch {
    Write-Host "Expected error: Product ID is required" -ForegroundColor Yellow
}
```

### Test with Invalid Product ID

```powershell
$badBody = @{
    productId = "invalid_id"
    quantity = 1
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri "http://localhost:5000/api/cart" `
        -Method POST `
        -Body $badBody `
        -ContentType "application/json"
} catch {
    Write-Host "Expected error: Invalid product ID" -ForegroundColor Yellow
}
```

---

## Using Postman (Alternative)

If you prefer a GUI tool:

1. Download Postman: https://www.postman.com/downloads/
2. Import this collection:

### Products
- GET: http://localhost:5000/api/products
- POST: http://localhost:5000/api/products/initialize

### Cart
- GET: http://localhost:5000/api/cart
- POST: http://localhost:5000/api/cart
  ```json
  {
    "productId": "YOUR_PRODUCT_ID",
    "quantity": 2
  }
  ```
- PUT: http://localhost:5000/api/cart/:id
  ```json
  {
    "quantity": 3
  }
  ```
- DELETE: http://localhost:5000/api/cart/:id

### Checkout
- POST: http://localhost:5000/api/checkout
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "cartItems": [...]
  }
  ```

---

## Tips

1. **Save Product IDs**: After initializing products, save a product ID for testing:
   ```powershell
   $products = Invoke-RestMethod -Uri "http://localhost:5000/api/products"
   $testProductId = $products.data[0]._id
   Write-Host "Test Product ID: $testProductId"
   ```

2. **Pretty Print JSON**: Add `| ConvertTo-Json` to see formatted output:
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:5000/api/cart" | ConvertTo-Json
   ```

3. **Save to Variable**: Store responses for later use:
   ```powershell
   $response = Invoke-RestMethod -Uri "http://localhost:5000/api/products"
   ```

4. **Error Handling**: Wrap in try-catch for better error messages:
   ```powershell
   try {
       $result = Invoke-RestMethod -Uri "http://localhost:5000/api/cart"
   } catch {
       Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
   }
   ```

---

**Happy Testing! 🧪**
