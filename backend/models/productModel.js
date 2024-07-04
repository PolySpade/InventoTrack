import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    sku: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    }, 
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    }, 
    unitCost: {
        type: Number,
        set: v => parseFloat(v.toFixed(2)), // Ensuring two decimal places
        get: v => v.toFixed(2), // Ensuring two decimal places on retrieval
        required: true
    },
    weightKG: {
        type: Number,
        set: v => parseFloat(v.toFixed(2)), // Ensuring two decimal places
        get: v => v.toFixed(2), // Ensuring two decimal places on retrieval
        required: true
    },
    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'warehouses',
        required: true
    },
    dimensions: {
        lengthCM: {
            type: Number,
            set: v => parseFloat(v.toFixed(2)), // Ensuring two decimal places
            get: v => v.toFixed(2), // Ensuring two decimal places on retrieval
            required: true
        },
        widthCM: {
            type: Number,
            set: v => parseFloat(v.toFixed(2)), // Ensuring two decimal places
            get: v => v.toFixed(2), // Ensuring two decimal places on retrieval
            required: true
        },
        heightCM: {
            type: Number,
            set: v => parseFloat(v.toFixed(2)), // Ensuring two decimal places
            get: v => v.toFixed(2), // Ensuring two decimal places on retrieval
            required: true
        }
    },
    stockLeft: {
        type: Number,
        required: true
    }
});

export const productModel = mongoose.model("products", productSchema);