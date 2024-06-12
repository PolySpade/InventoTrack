import mongoose from 'mongoose';
import express from 'express';
const router = express.Router();
import { roleModel } from '../models/roleModel.js';

// create
router.post('/CreateRole', async (req, res) => {
    try {
        const {roleName, permissions} = req.body;

        if (!roleName || !permissions){
            return res.status(400).send({ message: "Send all fields!" });
        }

        const newRole = {
            roleName,
            permissions
        }

        const role = await roleModel.create(newRole);
        return res.status(201).send(role);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get all roles
router.get('/', async (req, res) => {
    try {
        const roles = await roleModel.find({});
        return res.status(200).json(roles);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get a specific role
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const role = await roleModel.findById(id);

        if (!role){
            return res.status(404).send({ message: "Role not found" });
        }

        return res.status(200).json(role);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// edit
router.put('/EditRole/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const roleToEdit = await roleModel.findByIdAndUpdate(id, req.body);

        if (!roleToEdit){
            return res.status(404).send({ message: "Role not found" });
        }

        return res.status(200).send({message: "Update Successful!"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// delete
router.delete('/DeleteRole/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const roleToDelete = await roleModel.findByIdAndDelete(id);

        if (!roleToDelete){
            return res.status(404).json({ message: "Role not found!" });
        }

        return res.status(200).send({ message: "Delete Successful!" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;