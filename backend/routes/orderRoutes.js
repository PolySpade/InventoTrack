import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import { orderModel } from '../models/orderModel.js';

// create
router.post('/CreateOrder', async (req, res) => {
    try {
        const { id, timestamp, products, courierName, trackingNumber, sellingPlatform, buyerName, buyerEmail, buyerPhone, totalPaid, otherFees, status, timeline, notes } = req.body;

        if (!id || !timestamp || !products || products.length === 0 || !courierName || !trackingNumber || !sellingPlatform || !buyerName || !buyerEmail || !buyerPhone || !totalPaid || !otherFees || !status || !timeline || !notes){
            return res.status(400).send({ message: "Send all fields!" });
        }

        const productObjects = products.map(product => {
            const { productId, name, quantity, price } = product;
            if (!productId || !name || quantity === undefined || !price) {
                throw new Error('Each product must have sku, quantity, and price');
            }
            return {
                productId: new mongoose.Types.ObjectId(productId), 
                name,
                quantity,
                price
            };
        });

        const newOrder = {
            id,
            timestamp,
            products: productObjects,
            courier: new mongoose.Types.ObjectId(courier), 
            trackingNumber,
            sellingPlatform: new mongoose.Types.ObjectId(sellingPlatform), 
            buyer: {
                buyerName,
                buyerEmail,
                buyerPhone
            },
            totalPaid,
            otherFees,
            status,
            timeline: timeline.map(t => ({
                status: t.status,
                timestamp: t.timestamp,
                details: t.details || 'no other details provided'
            })),
            notes
        };

        const order = await orderModel.create(newOrder);
        return res.status(201).send(order);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


// get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await orderModel.find({});
        return res.status(200).json(orders);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get a specific order
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const order = await orderModel.findById(id);

        if (!order){
            return res.status(404).send({ message: "Order not found" });
        }

        return res.status(200).json(order);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// edit
router.put('/EditOrder/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const orderToEdit = await orderModel.findByIdAndUpdate(id, req.body);

        if (!orderToEdit){
            return res.status(404).send({ message: "Order not found" });
        }

        return res.status(200).send({message: "Update Successful!"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// delete
router.delete('/DeleteOrder/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const orderToDelete = await orderModel.findByIdAndDelete(id);

        if (!orderToDelete){
            return res.status(404).json({ message: "Order not found!" });
        }

        return res.status(200).send({ message: "Delete Successful!" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;