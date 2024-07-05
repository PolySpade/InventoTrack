import express from 'express';
import { productModel as Product } from '../models/productModel.js';

const router = express.Router();

router.post('/stockOut', async (req, res) => {
    try {
        const { reason, products } = req.body;

        if (!reason || !products || !Array.isArray(products)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        for (let product of products) {
            const { SKU, quantity } = product;

            if (!SKU || typeof quantity !== 'number' || quantity <= 0) {
                return res.status(400).json({ message: "SKU and a valid quantity are required for each product" });
            }

            const productDoc = await Product.findOne({ SKU });
            if (!productDoc) {
                return res.status(404).json({ message: `Product with SKU ${SKU} not found` });
            }

            if (productDoc.quantity < quantity) {
                return res.status(400).json({ message: `Insufficient stock for SKU ${SKU}` });
            }

            await Product.updateOne({ SKU }, { $inc: { quantity: -quantity } });
        }

        res.status(200).json({ message: "Stock out successful" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
