import express from 'express';
import mongoose from 'mongoose';
import { accountModel } from '../models/accountModel.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Create account
router.post('/CreateAccount', async (req, res) => {
    try {
        const { email, name, password, role } = req.body;
        if (!email || !name || !password || !role) {
            return res.status(400).send({ message: "Send all fields!" });
        }
        
        const existingAccount = await accountModel.findOne({ email });
        if (existingAccount) {
            return res.status(400).send({ message: "Email is already in use!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAccount = {
            email,
            name,
            password: hashedPassword,
            role: new mongoose.Types.ObjectId(role)
        };

        const account = await accountModel.create(newAccount);
        return res.status(201).send(account);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Get all accounts
router.get('/', async (req, res) => {
    try {
        const accounts = await accountModel.find({}).populate('role');
        return res.status(200).json(accounts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Get specific account
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const account = await accountModel.findById(id);

        if (!account) {
            return res.status(404).send({ message: "Account not found" });
        }

        return res.status(200).json(account);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Edit role
router.put('/editRole/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!role) {
            return res.status(400).send({ message: "Role is required" });
        }

        const accountToEdit = await accountModel.findByIdAndUpdate(id, { role: new mongoose.Types.ObjectId(role) }, { new: true });

        if (!accountToEdit) {
            return res.status(404).send({ message: "Account not found" });
        }

        return res.status(200).send({ message: "Role updated successfully!" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Edit password
router.put('/editPassword/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).send({ message: "Password is required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const accountToEdit = await accountModel.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });

        if (!accountToEdit) {
            return res.status(404).send({ message: "Account not found" });
        }

        return res.status(200).send({ message: "Password updated successfully!" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Edit account
router.put('/EditAccount/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const accountToEdit = await accountModel.findByIdAndUpdate(id, req.body);

        if (!accountToEdit) {
            return res.status(404).send({ message: "Account not found" });
        }

        return res.status(200).send({ message: "Update Successful!" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Delete account
router.delete('/DeleteAccount/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const accountToDelete = await accountModel.findByIdAndDelete(id);

        if (!accountToDelete) {
            return res.status(404).json({ message: "Account not found!" });
        }

        return res.status(200).send({ message: "Delete Successful!" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;
