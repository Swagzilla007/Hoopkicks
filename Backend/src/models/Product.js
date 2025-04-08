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
    size: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  image: {
    type: String,
    required: true
  },
  additionalImages: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add a method to check stock availability
productSchema.methods.hasStock = function(size, quantity) {
  const sizeData = this.sizes.find(s => s.size === size);
  return sizeData && sizeData.stock >= quantity;
};

// Add a method to update stock
productSchema.methods.updateStock = function(size, quantity) {
  const sizeData = this.sizes.find(s => s.size === size);
  if (sizeData) {
    sizeData.stock -= quantity;
  }
  return this.save();
};

const Product = mongoose.model('Product', productSchema);
export default Product;
