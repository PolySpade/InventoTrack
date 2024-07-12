import mongoose from 'mongoose';

const orderedProductSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: true
    },
    name: {
        type: String,
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

const timelineSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    details: {
        type: String,
        default: 'no other details provided',
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true 
    },
    timestamp: {
        type: Date,
        required: true
    },
    products: { 
        type: [orderedProductSchema], 
        required: true 
    },
    courier: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'couriers',
        required: true 
    },
    trackingNumber: { 
        type: String, 
        required: true,
        unique: true
    },
    sellingPlatform: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'platforms',
        required: true
    },
    buyer: {
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
    },
    totalPaid: {
        type: Number,
        required: true
    },
    otherFees: {
        type: Number,
        default: 0,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    timeline: {
        type: [timelineSchema],
        required: true
    },
    notes: {
        type: String,
        default: 'no notes'
    }
});
  
export const orderModel = mongoose.model('orders', orderSchema);
export const orderedProductModel = mongoose.model('orderedproducts', orderedProductSchema);
export const timelineModel = mongoose.model('timelines', timelineSchema);
