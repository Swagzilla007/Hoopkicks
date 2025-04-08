import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount } = req.body;
    
    // Check stock for each item
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found` });
      }

      const sizeData = product.sizes.find(s => s.size === item.size);
      if (!sizeData || sizeData.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Not enough stock for ${product.name} in size ${item.size}` 
        });
      }
    }

    // Update stock for each item
    for (const item of items) {
      const product = await Product.findById(item.product);
      const sizeData = product.sizes.find(s => s.size === item.size);
      sizeData.stock -= item.quantity;
      await product.save();
    }

    // Create order
    const order = new Order({
      user: req.user.id,
      items,
      shippingAddress,
      totalAmount,
      status: 'pending'
    });

    await order.save();

    // Populate the order with product and user details
    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'name email')
      .populate('items.product', 'name price');

    res.status(201).json({ 
      message: "Order placed successfully! We'll contact you soon.",
      order: populatedOrder
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ 
      message: 'Error creating order',
      error: error.message 
    });
  }
};
