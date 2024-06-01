import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import { productModel } from '../models/productModel.js';

// create
router.post('/AddProduct', async (req, res) => {
    try {
        const { name, category, unitCost, weightKG, warehouse, dimensions, stockLeft } = req.body;

        if (!name || !category || !unitCost || !weightKG || !warehouse || !dimensions || !dimensions.lengthCM || !dimensions.widthCM || !dimensions.heightCM || !stockLeft) {
            return res.status(400).send({ message: "Send all fields!" });
        }

        if (!mongoose.Types.ObjectId.isValid(warehouse)) {
            return res.status(400).send({ message: "Invalid warehouse ID!" });
        }

        const newProduct = {
            name,
            category,
            unitCost,
            weightKG,
            warehouse: new mongoose.Types.ObjectId(warehouse),
            dimensions,
            stockLeft
        };

        const product = await productModel.create(newProduct);
        return res.status(201).send(product);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// read all products
router.get('/', async (req, res) => {
    try {
        const products = await productModel.find({})

        return res.status(200).json(products);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// read specific product
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await productModel.findById(id);

        return res.status(200).json(product);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// edit
router.put('/editProduct/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const productToEdit = await productModel.findByIdAndUpdate(id, req.body);

        if(!productToEdit){
            return res.status(404).json({message: error.message});
        }

        return res.status(200).send({message: "Update Successful!"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// delete
router.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const productToDelete = await productModel.findByIdAndDelete(id);

        if(!productToDelete){
            return res.status(404).json({message: "Account doesn't exist!"});
        }

        return res.status(200).send({message: "Delete Successful!"});
    } catch(err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

export default router;