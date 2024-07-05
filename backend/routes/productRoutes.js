import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import { productModel } from '../models/productModel.js';

// Create 
router.post('/AddProduct', async (req, res) => {
    try {
        const { name, category, unitCost, weightKG, warehouse, dimensions, stockLeft, sku } = req.body;

        // Validate the presence of all required fields
        if (!name || !category || !unitCost || !weightKG || !warehouse || !dimensions || !dimensions.lengthCM || !dimensions.widthCM || !dimensions.heightCM || !stockLeft || !sku) {
            return res.status(400).send({ message: "Please provide all required fields!" });
        }

        // Validate numeric fields
        if (isNaN(unitCost) || isNaN(weightKG) || isNaN(stockLeft) || isNaN(dimensions.lengthCM) || isNaN(dimensions.widthCM) || isNaN(dimensions.heightCM)) {
            return res.status(400).send({ message: "Numeric fields must be numbers!" });
        }

        const newProduct = {
            sku,
            name,
            category: new mongoose.Types.ObjectId(category),
            unitCost: parseFloat(unitCost),
            weightKG: parseFloat(weightKG),
            warehouse: new mongoose.Types.ObjectId(warehouse),
            dimensions: {
                lengthCM: parseFloat(dimensions.lengthCM),
                widthCM: parseFloat(dimensions.widthCM),
                heightCM: parseFloat(dimensions.heightCM)
            },
            stockLeft: parseInt(stockLeft, 10)
        };

        const product = await productModel.create(newProduct);
        return res.status(201).send(product);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// read all products
router.get('/', async (req, res) => {
    try {   
        const products = await productModel.find({}).populate('warehouse').populate('category');
        return res.status(200).json(products);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


// read specific product
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// edit
router.put('/EditProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body);
        const productToEdit = await productModel.findByIdAndUpdate(id, req.body, {new: true});

        if (!productToEdit) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).send({message: "Update Successful!"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


// delete
router.delete('/DeleteProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productToDelete = await productModel.findByIdAndDelete(id);

        if (!productToDelete) {
            return res.status(404).json({ message: "Product not found!" });
        }

        return res.status(200).send({ message: "Delete Successful!" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;