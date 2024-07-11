import express from 'express';
import { productModel as Product } from '../models/productModel.js';
import { supplierModel as Supplier } from '../models/supplierModel.js';

const router = express.Router();

router.put('/stockIn', async (req, res) => {
    try {
        const { supplierName, products } = req.body;
        
        if (!supplierName || !products || !Array.isArray(products)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const supplier = await Supplier.findOne({ name: supplierName });
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        for (let product of products) {
            const { SKU, quantity } = product;

            if (!SKU || typeof quantity !== 'number' || quantity <= 0) {
                return res.status(400).json({ message: "SKU and a valid quantity are required for each product" });
            }

            await Product.updateOne({ SKU }, { $inc: { quantity } });
        }

        res.status(200).json({ message: "Stock in successful" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;