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
        default: "Supplier has no phone number"
    },
    productList: [{ 
        sku: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number // Changed to Number for proper price handling
        }
    }]
});

export const supplierModel = mongoose.model("Supplier", supplierSchema);
