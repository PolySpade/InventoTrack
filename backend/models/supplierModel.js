import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
    supplierName: {
        type: String,
        required: true
    },
    website: {
        type: String,
        default: "Supplier has no website"
    },
    phoneNo: {
        type: String,
        required: true
    },
    productList: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
        
    }]
});

export const supplierModel = mongoose.model("suppliers", supplierSchema);