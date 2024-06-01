import mongose, { MongooseError } from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    category: {
        type: String,
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
        ref: 'warehouse',
        required: true
    },
    dimensions: {
        lengthCM: {
            type: Number,
            required: true
        },
        widthCM: {
            type: Number,
            required: true
        },
        heightCM: {
            type: Number,
            required: true
        }
    },
    stockLeft: {
        type: Number,
        requried: true
    }
});

export const productModel = mongose.model("proucts", productSchema);