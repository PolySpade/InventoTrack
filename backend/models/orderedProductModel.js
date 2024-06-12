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

export const orderedProductModel = mongoose.model('orderedprducts', orderedProductSchema);