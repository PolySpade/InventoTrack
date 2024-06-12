import mongoose from 'mongoose';
import express from 'express';
const router = express.Router();
import { accountModel } from '../models/accountModel.js';

// create
router.post('/CreateAccount', async (req, res) => {
    try {
        const {email, username, password, role} = req.body;

        if (!email || !username || !password || !role){
            return res.status(400).send({ message: "Send all fields!" });
        }

        const newAccount = {
            email,
            username,
            password,
            role: new mongoose.Types.ObjectId(role)
        }

        const account = await accountModel.create(newAccount);
        return res.status(201).send(account);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get all accounts
router.get('/', async (req, res) => {
    try {
        const accounts = await accountModel.find({});
        return res.status(200).json(accounts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get specific account
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const account = await accountModel.findById(id);

        if (!account){
            return res.status(404).send({ message: "Account not found" });
        }

        return res.status(200).json(account);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// edit
router.put('/EditAccount/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const accountToEdit = await accountModel.findByIdAndUpdate(id, req.body);

        if (!accountToEdit){
            return res.status(404).send({ message: "Account not found" });
        }

        return res.status(200).send({message: "Update Successful!"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// delete
router.delete('/DeleteAccount/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const accountToDelete = await accountModel.findByIdAndDelete(id);

        if (!accountToDelete){
            return res.status(404).json({ message: "Account not found!" });
        }

        return res.status(200).send({ message: "Delete Successful!" });
    }  catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;