import mongoose from 'mongoose';
import express from 'express';
const router = express.Router();
import { alertModel } from '../models/alertModel.js';

// Create 
router.post('/CreateAlert', async (req, res) => {
    try {
        const { alertType, message } = req.body;

        if (!alertType || !message ) {
            return res.status(400).send({ message: "Send all fields!" });
        }

        const newAlert = {
            alertType,
            message
        };

        const alert = await alertModel.create(newAlert);
        return res.status(201).send(alert);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


// read all alerts
router.get('/', async (req, res) => {
    try {
        const alerts = await alertModel.find({})
        return res.status(200).json(alerts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


// read specific alert
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const alert = await alertModel.findById(id);

        if (!alert) {
            return res.status(404).send({ message: "Alert not found" });
        }

        return res.status(200).json(alert);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// edit
router.put('/EditAlert/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const alertToEdit = await alertModel.findByIdAndUpdate(id, req.body);

        if (!alertToEdit) {
            return res.status(404).json({ message: "Alert not found" });
        }

        return res.status(200).send({message: "Update Successful!"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


// delete
router.delete('/DeleteAlert/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const alertToDelete = await alertModel.findByIdAndDelete(id);

        if (!alertToDelete) {
            return res.status(404).json({ message: "Expense not found!" });
        }

        return res.status(200).send({ message: "Delete Successful!" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;