import mongoose from 'mongoose';
import express from 'express';
const router = express.Router();
import { historyModel } from '../models/historyModel.js';

// create
router.post('/CreateHistory', async (req, res) => {
    try {
        const {timestamp, role, email, action} = req.body;
        if (!timestamp, !role, !email, !action){
            return res.status(400).send({ message: "Send all fields!" });
        }

        const newHistory = {
            timestamp,
            role,
            email,
            action
        }

        const history = await historyModel.create(newHistory);
        return res.status(201).send(history);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get all of the history content
router.get('/', async (req, res) => {
    try {
        const histories = await historyModel.find({})
        return res.status(200).json(histories);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get a specific history event
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const history = await historyModel.findById(id);

        if (!history){
            return res.status(404).send({ message: "History not found" });
        }

        return res.status(200).json(history);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// edit 
router.put('/EditHistory/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const historyToEdit = await historyModel.findByIdAndUpdate(id, req.body)

        if (!historyToEdit) {
            return res.status(404).json({ message: "History not found" });
        }

        return res.status(200).send({message: "Update Successful!"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
})

// delete
router.delete('/DeleteHistory/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const historyToDelete = await historyModel.findByIdAndDelete(id);

        if (!historyToDelete) {
            return res.status(404).json({ message: "History not found!" });
        }

        return res.status(200).send({ message: "Delete Successful!" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;