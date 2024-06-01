import express from 'express';
const router = express.Router();
import { warehouseModel } from '../models/warehouseModel.js';

// create
router.post('/CreateWarehouse', async (req, res) => {
    try {
        if (!req.body.name || !req.body.address) {
            return res.status(400).send({message: "Send all fields!",});
        }

        const newWarehouse = {
            name: req.body.name,
            address: req.body.address
        }

        const warehouse = await warehouseModel.create(newWarehouse);
        return res.status(201).send(warehouse);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// read all warehouses
router.get('/', async (req, res) => {
    try {
        const warehouses = await warehouseModel.find({});

        return res.status(200).json(warehouses);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// read specific warehouse
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const warehouse = await warehouseModel.findById(id);

        return res.status(200).json(warehouse);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// update
router.put('/editWarehouse/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const warehouseToEdit = await warehouseModel.findByIdAndUpdate(id, req.body);

        if(!warehouseToEdit){
            return res.status(404).json({message: error.message});
        }

        return res.status(200).send({message: "Update Successful!"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// delete
router.delete('/deleteWarehouse/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const warehouseToDelete = await warehouseModel.findByIdAndDelete(id);

        if(!warehouseToDelete) {
            return res.status(404).json({message: "Account doesn't exist!"});
        }

        return res.status(200).send({message: "Delete Successful!"});
    } catch(err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

export default router;