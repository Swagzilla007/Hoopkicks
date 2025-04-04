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
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
