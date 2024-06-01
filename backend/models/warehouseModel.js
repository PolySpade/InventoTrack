import mongoose from 'mongoose';

const warehouseSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true
    }, 
    address: {
        type: String,
        required: true
    }
});

export const warehouseModel = mongoose.model("warehouse", warehouseSchema, "warehouse");