import app from './app.js';
import config from './config/config.js';
import mongoose from 'mongoose';

// Import models
import './models/User.js';
import './models/Product.js';
import './models/Order.js';

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Create some initial data
    createInitialData();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Function to create initial data
async function createInitialData() {
  try {
    const Product = mongoose.model('Product');
    
    // Check if products exist
    const count = await Product.countDocuments();
    if (count === 0) {
      // Add some sample products
      await Product.create([
        {
          name: 'Nike LeBron XX',
          description: 'Signature basketball shoes from LeBron James',
          price: 199.99,
          brand: 'Nike',
          category: 'men',
          sizes: [7, 8, 9, 10, 11, 12],
          image: '/placeholder.jpg',
          stock: 50
        },
        {
          name: 'Jordan XXXVII',
          description: 'Latest Air Jordan basketball shoes',
          price: 185.99,
          brand: 'Jordan',
          category: 'men',
          sizes: [7, 8, 9, 10, 11, 12],
          image: '/placeholder.jpg',
          stock: 45
        }
      ]);
      console.log('Initial products created');
    }
  } catch (error) {
    console.error('Error creating initial data:', error);
  }
}

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
