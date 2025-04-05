import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  try {
    console.log('Creating order with data:', req.body);
    const { items, shippingAddress, totalAmount } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid order items' });
    }

    // Process each item and update stock
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ 
          message: `Product not found` 
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Not enough stock for ${product.name}` 
        });
      }

      // Update product stock
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    // Create new order - price is already in LKR from frontend
    const order = new Order({
      user: req.user.id,
      items: items.map(item => ({
        product: item.product,
        size: item.size,
        quantity: item.quantity,
        price: item.price // Price is already in LKR
      })),
      shippingAddress,
      totalAmount, // Total amount is already in LKR
      status: 'pending'
    });

    await order.save();

    // Populate the order with product and user details
    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'name email')
      .populate('items.product', 'name price');

    console.log('Created order:', populatedOrder);

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
