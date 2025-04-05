import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function(v) {
        return v >= 0 && Number.isInteger(v); // Ensure price is a positive integer
      },
      message: 'Price must be a positive integer in LKR'
    }
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['men', 'women']
  },
  sizes: [{
    type: Number,
    required: true
  }],
  image: {
    type: String,
    required: true
  },
  additionalImages: [{
    type: String
  }],
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
