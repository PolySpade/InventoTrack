import mongoose from 'mongoose';

const warehouseSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

export const warehouseModel = mongoose.model("warehouses", warehouseSchema);