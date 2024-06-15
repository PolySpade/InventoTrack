import express from 'express';
const router = express.Router();
import { courierModel } from '../models/courierModel.js';

// create
router.post('/CreateCourier', async (req, res) => {
    try {
        const {name} = req.body;

        if (!name){
            return res.status(400).send({ message: "Send all fields!" });
        }

        const newCorier = {
            name
        }

        const courier = await courierModel.create(newCorier);
        return res.status(201).send(courier);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get all couriers
router.get('/', async (req, res) => {
    try {
        const couriers = await courierModel.find({});
        return res.status(200).json(couriers);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get specific courier
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const courier = await courierModel.findById(id);

        if (!courier){
            return res.status(404).send({ message: "Courier not found" });
        }

        return res.status(200).json(courier);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// edit
router.put('/EditCourier/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const courierToEdit = await courierModel.findByIdAndUpdate(id, req.body);

        if (!courierToEdit){
            return res.status(404).send({ message: "Courier not found" });
        }

        return res.status(200).send({message: "Update Successful!"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// delete
router.delete('/DeleteCourier/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const courierToDelete = await courierModel.findByIdAndDelete(id);

        if (!courierToDelete){
            return res.status(404).json({ message: "Courier not found!" });
        }

        return res.status(200).send({ message: "Delete Successful!" });
    }  catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;