import express from 'express';
const router = express.Router();
import { categoryModel } from '../models/categoryModel.js';

// create
router.post('/CreateCategory', async (req, res) => {
    try {
        const {name} = req.body;

        if (!name){
            return res.status(400).send({ message: "Send all fields!" });
        }

        const newCategory = {
            name
        }

        const category = await categoryModel.create(newCategory);
        return res.status(201).send(category);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        return res.status(200).json(categories);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get specific category
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const category = await categoryModel.findById(id);

        if (!category){
            return res.status(404).send({ message: "Category not found" });
        }

        return res.status(200).json(category);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// edit
router.put('/EditCategory/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const categoryToEdit = await categoryModel.findByIdAndUpdate(id, req.body);

        if (!categoryToEdit){
            return res.status(404).send({ message: "Category not found" });
        }

        return res.status(200).send({message: "Update Successful!"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// delete
router.delete('/DeleteCategory/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const categoryToDelete = await categoryModel.findByIdAndDelete(id);

        if (!categoryToDelete){
            return res.status(404).json({ message: "Category not found!" });
        }

        return res.status(200).send({ message: "Delete Successful!" });
    }  catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;