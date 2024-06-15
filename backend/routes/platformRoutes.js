import express from 'express';
const router = express.Router();
import { platformModel } from '../models/platformModel.js';

// create
router.post('/CreatePlatform', async (req, res) => {
    try {
        const {name} = req.body;

        if (!name){
            return res.status(400).send({ message: "Send all fields!" });
        }

        const newPlatform = {
            name
        }

        const platform = await platformModel.create(newPlatform);
        return res.status(201).send(platform);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get all platforms
router.get('/', async (req, res) => {
    try {
        const platforms = await platformModel.find({});
        return res.status(200).json(platforms);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get specific platform
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const platform = await platformModel.findById(id);

        if (!platform){
            return res.status(404).send({ message: "Platform not found" });
        }

        return res.status(200).json(platform);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// edit
router.put('/EditPlatform/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const platformToEdit = await platformModel.findByIdAndUpdate(id, req.body);

        if (!platformToEdit){
            return res.status(404).send({ message: "Platform not found" });
        }

        return res.status(200).send({message: "Update Successful!"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// delete
router.delete('/DeletePlatform/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const platformToDelete = await platformModel.findByIdAndDelete(id);

        if (!platformToDelete){
            return res.status(404).json({ message: "Platform not found!" });
        }

        return res.status(200).send({ message: "Delete Successful!" });
    }  catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;