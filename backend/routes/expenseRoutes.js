import mongoose from 'mongoose';
import express from 'express';
const router = express.Router();
import { expenseModel } from '../models/expenseModel.js';

// Create 
router.post('/CreateExpense', async (req, res) => {
    try {
        const { timestamp, amount, expensestype, description } = req.body;
        if (!timestamp || !amount || !expensestype || !description ) {
            return res.status(400).send({ message: "Send all fields!" });
        }
        const newExpense = {
            timestamp,
            amount,
            expensestype: new mongoose.Types.ObjectId(expensestype),
            description
        };

        const expense = await expenseModel.create(newExpense);
        return res.status(201).send(expense);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


// read all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await expenseModel.find({}).populate('expensestype');
        return res.status(200).json(expenses);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


// read specific expense
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await expenseModel.findById(id);

        if (!expense) {
            return res.status(404).send({ message: "Expense not found" });
        }

        return res.status(200).json(expense);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// edit
router.put('/EditExpense/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const expenseToEdit = await expenseModel.findByIdAndUpdate(id, req.body);

        if (!expenseToEdit) {
            return res.status(404).json({ message: "Expense not found" });
        }

        return res.status(200).send({message: "Update Successful!"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


// delete
router.delete('/DeleteExpense/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const expenseToDelete = await expenseModel.findByIdAndDelete(id);

        if (!expenseToDelete) {
            return res.status(404).json({ message: "Expense not found!" });
        }

        return res.status(200).send({ message: "Delete Successful!" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;