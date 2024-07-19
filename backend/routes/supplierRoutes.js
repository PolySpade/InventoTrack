import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import { supplierModel } from '../models/supplierModel.js';

// Create
router.post('/RegisterSupplier', async (req, res) => {
    try {
        const { supplierName, website, phoneNo, productList } = req.body;

        if (!supplierName || !phoneNo || !productList || productList.length === 0) {
            return res.status(400).send({ message: "Please provide all required fields!" });
        }

        const newSupplier = {
            supplierName,
            website,
            phoneNo,
            productList
        };

        const supplier = await supplierModel.create(newSupplier);
        return res.status(201).send(supplier);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Get all suppliers
router.get('/', async (req, res) => {
    try {
        const suppliers = await supplierModel.find({});
        return res.status(200).json(suppliers);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Get a specific supplier
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await supplierModel.findById(id);

        if (!supplier) {
            return res.status(404).send({ message: "Supplier not found" });
        }

        return res.status(200).json(supplier);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Edit
router.put('/EditSupplier/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const supplierToEdit = await supplierModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!supplierToEdit) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        return res.status(200).send({ message: "Update Successful!", supplier: supplierToEdit });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Delete
router.delete('/DeleteSupplier/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const supplierToDelete = await supplierModel.findByIdAndDelete(id);

        if (!supplierToDelete) {
            return res.status(404).json({ message: "Supplier not found!" });
        }

        return res.status(200).send({ message: "Delete Successful!" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;
