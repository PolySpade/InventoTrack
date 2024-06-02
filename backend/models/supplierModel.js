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
        SKU: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        productName: {
            type: mongoose.Schema.Types.ObjectId,
            requried: true
        },
        costPrice: {
            type: Number,
            required: true
        }
    }]
});

export const supplierModel = mongoose.model("suppliers", supplierSchema);