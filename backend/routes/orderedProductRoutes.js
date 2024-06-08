import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import { orderedProductModel } from '../models/orderedProductModel.js';

// create
router.post('/AddOrderedProduct', async (req, res) => {
    try {
        const {productId, quantity, price} = req.body;

        if (!productId || !quantity || !price){
            return res.status(400).send({ message: "Send all fields!" });
        }

        const newOrderedProduct = {
            productId: new mongoose.Types.ObjectId(productId),
            quantity: quantity,
            price: price
        }

        const orderedProduct = await orderedProductModel.create(newOrderedProduct);
        return res.status(201).send(orderedProduct);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// read all ordered products
router.get('/', async (req, res) => {
    try {
        const orderedProducts = await orderedProductModel.find({});
        return res.status(200).json(orderedProducts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// read a specific ordered product
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const orderedProduct = await orderedProductModel.findById(id);

        if (!orderedProduct){
            return res.status(404).send({ message: "Ordered product not found" });
        }

        return res.status(200).json(orderedProduct);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// edit
router.put('/EditOrderedProduct/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const orderedProductToEdit = await orderedProductModel.findByIdAndUpdate(id, req.body);

        if (!orderedProductToEdit){
            return res.status(404).send({ message: "Ordered product not found" });
        }

        return res.status(200).send({message: "Update Successful!"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// delete
router.delete('/DeleteOrderedProduct/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const orderedProductToDelete = await orderedProductModel.findByIdAndDelete(id);

        if (!orderedProductToDelete){
            return res.status(404).json({ message: "Product not found!" });
        }

        return res.status(200).send({ message: "Delete Successful!" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;