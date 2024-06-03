import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import { productModel } from '../models/productModel.js';
import { warehouseModel } from '../models/warehouseModel.js';

const schemas = {
    warehouses: warehouseModel,
  };
  
  async function findObjectID(schem, keyName, keyValue) {
    try {
      const schema = schemas[schem];
      const query = {};
      query[keyName] = keyValue; // Using computed property names to set the key and value
      const result = await schema.findOne(query).exec();
      if (result) {
        return result._id.toString();
      } else {
        console.log('No object found with that key and value');
        return null;
      }
    } catch (err) {
      console.error('Error finding object:', err);
      return null;
    }
  }
  
  // create
  router.post('/AddProduct', async (req, res) => {
    try {
        const { name, category, unitCost, weightKG, warehouseName, dimensions, stockLeft } = req.body;

        console.log("Request Body:", req.body);

        if (!name || !category || !unitCost || !weightKG || !warehouseName || !dimensions || !dimensions.lengthCM || !dimensions.widthCM || !dimensions.heightCM || !stockLeft) {
            return res.status(400).send({ message: "Send all fields!" });
        }

        const warehouseID = await findObjectID('warehouses', 'name', warehouseName);

        if (!warehouseID) {
            return res.status(400).send({ message: "Warehouse not found!" });
        }

        const newProduct = {
            name,
            category,
            unitCost,
            weightKG,
            warehouse: mongoose.Types.ObjectId(warehouseID),
            dimensions,
            stockLeft
        };

        const product = await productModel.create(newProduct);
        return res.status(201).send(product);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


// read all products
router.get('/', async (req, res) => {
    try {
        const products = await productModel.find({}).populate('warehouse');
        return res.status(200).json(products);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


// read specific product
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id).populate('warehouse');

        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// edit
router.put('/EditProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { warehouse } = req.body;

        if (warehouse && !mongoose.Types.ObjectId.isValid(warehouse)) {
            return res.status(400).send({ message: "Invalid warehouse ID!" });
        }

        if (warehouse) {
            const warehouseExists = await warehouseModel.findById(warehouse);
            if (!warehouseExists) {
                return res.status(400).send({ message: "Warehouse not found!" });
            }
        }

        const productToEdit = await productModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!productToEdit) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).send({message: "Update Successful!"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


// delete
router.delete('/DeleteProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productToDelete = await productModel.findByIdAndDelete(id);

        if (!productToDelete) {
            return res.status(404).json({ message: "Product not found!" });
        }

        return res.status(200).send({ message: "Delete Successful!" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;