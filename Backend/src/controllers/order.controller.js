import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    
    // Initialize status history with the initial pending status
    orderData.statusHistory = [{
      status: 'pending',
      date: new Date()
    }];
    
    const order = await Order.create(orderData);
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
};
