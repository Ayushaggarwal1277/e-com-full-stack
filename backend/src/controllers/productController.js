import Product from '../models/productModel.js';

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

// Initialize products (for first time setup)
export const initializeProducts = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    
    if (count > 0) {
      return res.status(400).json({
        success: false,
        message: 'Products already initialized'
      });
    }

    const products = [
      {
        name: 'Wireless Headphones',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        description: 'Premium wireless headphones with noise cancellation',
        category: 'Electronics',
        stock: 50
      },
      {
        name: 'Smart Watch',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        description: 'Feature-rich smartwatch with fitness tracking',
        category: 'Electronics',
        stock: 30
      },
      {
        name: 'Running Shoes',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        description: 'Comfortable running shoes for daily training',
        category: 'Sports',
        stock: 75
      },
      {
        name: 'Leather Backpack',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        description: 'Stylish leather backpack for work and travel',
        category: 'Accessories',
        stock: 40
      },
      {
        name: 'Smartphone',
        price: 699.99,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        description: 'Latest smartphone with advanced features',
        category: 'Electronics',
        stock: 25
      },
      {
        name: 'Sunglasses',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
        description: 'Designer sunglasses with UV protection',
        category: 'Accessories',
        stock: 60
      },
      {
        name: 'Coffee Maker',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
        description: 'Automatic coffee maker for perfect brews',
        category: 'Home',
        stock: 35
      },
      {
        name: 'Yoga Mat',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
        description: 'Non-slip yoga mat for all fitness levels',
        category: 'Sports',
        stock: 100
      },
      {
        name: 'Desk Lamp',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
        description: 'LED desk lamp with adjustable brightness',
        category: 'Home',
        stock: 45
      },
      {
        name: 'Bluetooth Speaker',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
        description: 'Portable Bluetooth speaker with great sound',
        category: 'Electronics',
        stock: 55
      }
    ];

    const createdProducts = await Product.insertMany(products);
    
    res.status(201).json({
      success: true,
      message: 'Products initialized successfully',
      count: createdProducts.length,
      data: createdProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error initializing products',
      error: error.message
    });
  }
};
