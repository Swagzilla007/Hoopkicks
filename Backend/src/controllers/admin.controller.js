import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: 'items.product',
        select: 'name price image'
      })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    console.log('Fetched orders:', orders); // Debug log
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order' });
  }
};

export const createProduct = async (req, res) => {
  try {
    // Ensure the image path is relative
    const productData = {
      ...req.body,
      image: req.body.image.startsWith('http') 
        ? req.body.image 
        : `http://localhost:5000${req.body.image}`
    };
    
    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    // Ensure image path starts with http
    if (updateData.image && !updateData.image.startsWith('http')) {
      updateData.image = `http://localhost:5000${updateData.image}`;
    }

    // Ensure sizes is an array of numbers
    if (updateData.sizes) {
      updateData.sizes = Array.isArray(updateData.sizes) 
        ? updateData.sizes 
        : updateData.sizes.split(',').map(size => Number(size.trim()));
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ 
      message: 'Error updating product',
      error: error.message 
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const [products, orders] = await Promise.all([
      Product.countDocuments(),
      Order.find()
    ]);

    const stats = {
      totalProducts: products,
      totalOrders: orders.length,
      pendingOrders: orders.filter(order => order.status === 'pending').length,
      revenue: orders.reduce((total, order) => total + order.totalAmount, 0),
      currency: 'LKR' // Add currency indicator
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Return the path relative to the server root
    const imagePath = `/assets/products/${req.file.filename}`;
    res.json({ imagePath });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image' });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Restore product stock quantities
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity }
      });
    }

    await Order.findByIdAndDelete(id);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order' });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const admin = await User.create({
      name,
      email,
      password,
      role: 'admin'
    });

    res.status(201).json({
      message: 'Admin user created successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin user' });
  }
};
