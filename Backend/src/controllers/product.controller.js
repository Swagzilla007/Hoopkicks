import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    // Add query parameters for filtering
    const { brand, minPrice, maxPrice } = req.query;
    
    let query = {};
    
    // Apply filters if they exist
    if (brand) {
      query.brand = brand;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error in getProduct:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { brand, minPrice, maxPrice } = req.query;
    
    let query = { category };
    
    // Apply additional filters
    if (brand) {
      query.brand = brand;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error in getProductsByCategory:', error);
    res.status(500).json({ message: 'Error fetching products by category' });
  }
};
