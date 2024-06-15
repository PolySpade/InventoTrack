import express from 'express';
const router = express.Router();
import { expensesTypeModel } from '../models/expensesTypeModel.js';

// create
router.post('/CreateExpensesType', async (req, res) => {
    try {
        const {name} = req.body;

        if (!name){
            return res.status(400).send({ message: "Send all fields!" });
        }

        const newExpensesType = {
            name
        }

        const expensesType = await expensesTypeModel.create(newExpensesType);
        return res.status(201).send(expensesType);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get all expensestypes
router.get('/', async (req, res) => {
    try {
        const expensesTypes = await expensesTypeModel.find({});
        return res.status(200).json(expensesTypes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get specific expensestype
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const expensesType = await expensesTypeModel.findById(id);

        if (!expensesType){
            return res.status(404).send({ message: "Expenses Type not found" });
        }

        return res.status(200).json(expensesType);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// edit
router.put('/EditExpensesType/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const expensesTypeToEdit = await expensesTypeModel.findByIdAndUpdate(id, req.body);

        if (!expensesTypeToEdit){
            return res.status(404).send({ message: "Expenses Type not found" });
        }

        return res.status(200).send({message: "Update Successful!"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// delete
router.delete('/DeleteExpensesType/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const expensesTypeToDelete = await expensesTypeModel.findByIdAndDelete(id);

        if (!expensesTypeToDelete){
            return res.status(404).json({ message: "Expenses Type not found!" });
        }

        return res.status(200).send({ message: "Delete Successful!" });
    }  catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;