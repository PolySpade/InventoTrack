import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    }
});

export  const historyModel = mongoose.model('histories', historySchema);