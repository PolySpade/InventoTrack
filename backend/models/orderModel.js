import mongoose from 'mongoose';

const orderedProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    id: { 
      type: Number, 
      required: true 
    },
    products: { 
      type: [orderedProductSchema], 
      required: true 
    },
    courierName: { 
      type: String, 
      required: true 
    },
    trackingNumber: { 
      type: String, 
      required: true 
    },
    sellingPlatform: { 
      type: String, 
      required: true 
    },
    buyerName: { 
      type: String, 
      required: true 
    },
    buyerEmail: { 
      type: String, 
      validate: { 
        validator: (v) => /\S+@\S+\.\S+/.test(v), 
        message: "Invalid email format" 
      },
      required: true, 
    },
    buyerPhone: { 
      type: String,
      default: 'No Phone'
    }
  });
  
export const orderModel = mongoose.model('orders', orderSchema);