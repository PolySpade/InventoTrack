import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
    orderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
        default: 'no fk connected'
    },
    alertType: {
        type: [String],
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

export const alertModel = mongoose.model('alerts', alertSchema);