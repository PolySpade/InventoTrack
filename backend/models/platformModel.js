import mongoose from 'mongoose';

const platformSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

export const platformModel = mongoose.model('platforms', platformSchema);