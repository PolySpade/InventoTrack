import express from 'express';
import { productModel as Product } from '../models/productModel.js';
import { supplierModel as Supplier } from '../models/supplierModel.js';

const router = express.Router();

router.put('/', async (req, res) => {
    try {
        const { supplierName, products } = req.body;
        
        if (!supplierName ) {
            return res.status(400).json({ message: "Supplier name is required" });
        }
        if (products.length === 0 || !products || !Array.isArray(products)) {
            return res.status(400).json({ message: "No Products Selected!"})
        }

        const supplier = await Supplier.findById(supplierName);
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        for (let product of products) {
            const { SKU, quantity } = product;

            if (!SKU || typeof quantity !== 'number' || quantity <= 0) {
                return res.status(400).json({ message: "SKU and a valid quantity are required for each product" });
            }

            await Product.updateOne({ sku: SKU }, { $inc: { stockLeft: quantity } });
        }

        res.status(200).json({ message: "Stock in successful" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
