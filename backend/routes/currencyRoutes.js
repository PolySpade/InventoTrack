import express from 'express';
const router = express.Router();
import { currencyModel } from '../models/currencyModel.js';

// create
router.post('/CreateCurrency', async (req, res) => {
    try {
        const {name} = req.body;

        if (!name){
            return res.status(400).send({ message: "Send all fields!" });
        }

        const newCurrency = {
            name
        }

        const currency = await currencyModel.create(newCurrency);
        return res.status(201).send(currency);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get all currencies
router.get('/', async (req, res) => {
    try {
        const currencies = await currencyModel.find({});
        return res.status(200).json(currencies);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get specific currency
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const currency = await currencyModel.findById(id);

        if (!currency){
            return res.status(404).send({ message: "Currency not found" });
        }

        return res.status(200).json(currency);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// edit
router.put('/EditCurrency/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const currencyToEdit = await currencyModel.findByIdAndUpdate(id, req.body);

        if (!currencyToEdit){
            return res.status(404).send({ message: "Currency not found" });
        }

        return res.status(200).send({message: "Update Successful!"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// delete
router.delete('/DeleteCurrency/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const currencyToDelete = await currencyModel.findByIdAndDelete(id);

        if (!currencyToDelete){
            return res.status(404).json({ message: "Currency not found!" });
        }

        return res.status(200).send({ message: "Delete Successful!" });
    }  catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;