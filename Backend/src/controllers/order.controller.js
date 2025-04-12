import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount } = req.body;
    
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User authentication required' });
    }

    // Update stock for each product
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found` });
      }

      const sizeData = product.sizes.find(s => s.size === Number(item.size));
      if (!sizeData || sizeData.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name} in size ${item.size}` 
        });
      }

      // Update stock
      sizeData.stock -= item.quantity;
      await product.save();
    }

    // Create order with user ID from auth middleware
    const order = new Order({
      user: req.user.id,  // Changed from req.user._id to req.user.id
      items,
      shippingAddress,
      totalAmount,
      status: 'pending',
      statusHistory: [{ status: 'pending', date: new Date() }]
    });

    await order.save();
    res.status(201).json(order);

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
};
