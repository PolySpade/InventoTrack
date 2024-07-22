import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
    alertType: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

export const alertModel = mongoose.model('alerts', alertSchema);