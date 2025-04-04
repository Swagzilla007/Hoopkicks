import app from './app.js';
import config from './config/config.js';
import mongoose from 'mongoose';

// Import models
import './models/User.js';
import './models/Product.js';
import './models/Order.js';

import { setupInitialAdmin } from './controllers/auth.controller.js';

mongoose.connect(config.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    // Create initial admin user
    await setupInitialAdmin();
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
