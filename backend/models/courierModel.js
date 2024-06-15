import mongoose from 'mongoose';

const courierSchema  =new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

export const courierModel = mongoose.model('couriers', courierSchema);