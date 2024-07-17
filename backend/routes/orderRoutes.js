import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import { orderModel } from '../models/orderModel.js';
import { productModel as Product } from '../models/productModel.js';

// create
router.post('/CreateOrder', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id, timestamp, products, courier, trackingNumber, sellingPlatform, buyerName, buyerEmail, buyerPhone, totalPaid, otherFees, status, timeline, notes } = req.body;

        // Check if orderId is provided and if it's already used
        if (id) {
            const existingOrder = await orderModel.findOne({ id }).session(session);
            if (existingOrder) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).send({ message: "Order ID is already used!" });
            }
        }

        if (!timestamp || !products || products.length === 0 || !courier || !sellingPlatform || !totalPaid || !status || !timeline) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).send({ message: "Send all required fields!" });
        }

        const productObjects = [];
        let checker = true;

        for (let product of products) {
            const { productId, name, quantity, price } = product;

            const productDoc = await Product.findOne({ _id: productId }).session(session);

            if (!productDoc) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).send({ message: `Product ${name} not found` });
            }

            if (productDoc.stockLeft < quantity) {
                checker = false;
                await session.abortTransaction();
                session.endSession();
                return res.status(400).send({ message: `Insufficient stock for ${name}` });
            }

            await Product.updateOne({ _id: productId }, { $inc: { stockLeft: -quantity } }).session(session);

            productObjects.push({
                productId: new mongoose.Types.ObjectId(productId),
                name,
                quantity,
                price
            });
        }

        if (!checker) {
            await session.abortTransaction();
            session.endSession();
            return;
        }

        const newOrder = {
            id,
            timestamp,
            products: productObjects,
            courier: new mongoose.Types.ObjectId(courier),
            trackingNumber,
            sellingPlatform: new mongoose.Types.ObjectId(sellingPlatform),
            buyer: {
                buyerName: buyerName || '',
                buyerEmail: buyerEmail || '',
                buyerPhone: buyerPhone || ''
            },
            totalPaid,
            otherFees: otherFees || 0,
            status,
            timeline: timeline.map(t => ({
                status: t.status,
                timestamp: t.timestamp,
                details: t.details || 'no other details provided'
            })),
            notes: notes || 'no notes'
        };

        const order = await orderModel.create([newOrder], { session: session });

        await session.commitTransaction();
        session.endSession();
        return res.status(201).send(order);
    } catch (err) {
        console.log(err.message);
        await session.abortTransaction();
        session.endSession();
        res.status(500).send({ message: err.message });
    }
});



// get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate('courier').populate('sellingPlatform').populate({
            path: 'products.productId',
            model: 'products',
            select: ['sku','unitCost']
        });
        return res.status(200).json(orders);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get a specific order
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findById(id).populate('courier').populate('sellingPlatform').populate({
            path: 'products.productId',
            model: 'products',
            select: ['sku','unitCost']
        });

        if (!order) {
            return res.status(404).send({ message: "Order not found" });
        }

        return res.status(200).json(order);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

//edit notes only
router.put('/EditNotes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { notes } = req.body;

        const orderToEdit = await orderModel.findByIdAndUpdate(
            id,
            { $set: { notes } },
            { new: true }
        );

        if (!orderToEdit) {
            return res.status(404).send({ message: "Order not found" });
        }

        return res.status(200).send({ message: "Update Successful!", order: orderToEdit });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

//edit status and timeline only
router.put('/EditStatus/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status,timeline } = req.body;

        // Validate the timeline data
        if (!timeline || !Array.isArray(timeline) || timeline.length === 0) {
            return res.status(400).send({ message: "Invalid timeline data" });
        }

        // for (let t of timeline) {
        //     if (!t.status || !t.timestamp) {
        //         return res.status(400).send({ message: "Each timeline entry must have status and timestamp" });
        //     }
        //     if (!t.details) {
        //         t.details = 'no other details provided';
        //     }
        // }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            id,
            {
                $push: { timeline: { $each: timeline } },
                $set: { status: status }
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).send({ message: "Order not found" });
        }

        return res.status(200).send({ message: "Status updated successfully!", order: updatedOrder });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

router.put('/EditBuyer/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { buyer } = req.body;

        const updatedOrder = await orderModel.findByIdAndUpdate(
            id,
            {
                $set: { buyer }
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).send({ message: "Order not found" });
        }

        return res.status(200).send({ message: "Buyer updated successfully!", order: updatedOrder });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

router.put('/EditTotal/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { totalPaid } = req.body;

        const updatedOrder = await orderModel.findByIdAndUpdate(
            id,
            {
                $set: { totalPaid }
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).send({ message: "Order not found" });
        }

        return res.status(200).send({ message: "Total Paid updated successfully!", order: updatedOrder });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

router.put('/EditFees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { otherFees } = req.body;

        const updatedOrder = await orderModel.findByIdAndUpdate(
            id,
            {
                $set: { otherFees }
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).send({ message: "Order not found" });
        }

        return res.status(200).send({ message: "Fees updated successfully!", order: updatedOrder });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

router.put('/EditTracking/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { courier, trackingNumber } = req.body;

        const updatedOrder = await orderModel.findByIdAndUpdate(
            id,
            {
                $set: { courier, trackingNumber }
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).send({ message: "Order not found" });
        }

        return res.status(200).send({ message: "Tracking updated successfully!", order: updatedOrder });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

router.put('/EditPlatform/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { sellingPlatform } = req.body;

        const updatedOrder = await orderModel.findByIdAndUpdate(
            id,
            {
                $set: { sellingPlatform }
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).send({ message: "Order not found" });
        }

        return res.status(200).send({ message: "Platform updated successfully!", order: updatedOrder });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// edit
router.put('/EditOrder/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { products, courier, sellingPlatform, timeline } = req.body;

        if (products) {
            req.body.products = products.map(product => {
                const { productId, name, quantity, price } = product;
                if (!productId || !name || quantity === undefined || !price) {
                    throw new Error('Each product must have sku, name, quantity, and price');
                }
                return {
                    productId, 
                    name,
                    quantity,
                    price
                };
            });
        }

        if (courier) {
            req.body.courier = new mongoose.Types.ObjectId(courier);
        }

        if (sellingPlatform) {
            req.body.sellingPlatform = new mongoose.Types.ObjectId(sellingPlatform);
        }

        if (timeline) {
            req.body.timeline = timeline.map(t => ({
                status: t.status,
                timestamp: t.timestamp,
                details: t.details || 'no other details provided'
            }));
        }

        const orderToEdit = await orderModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!orderToEdit) {
            return res.status(404).send({ message: "Order not found" });
        }

        return res.status(200).send({ message: "Update Successful!", order: orderToEdit });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// edit products order
router.put('/EditProductsOrder/:id', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;
        const { products } = req.body;

        const existingOrder = await orderModel.findById(id);
        if (!existingOrder) {
            session.abortTransaction();
            session.endSession();
            return res.status(404).send({ message: "Order not found" });
        }

        for (let oldProduct of existingOrder.products) {
            const { productId, quantity } = oldProduct;

            await Product.updateOne({ _id: productId }, { $inc: { stockLeft: quantity } });
        }

        await orderModel.findByIdAndUpdate(id, { $set: { products: [] } });

        const productObjects = [];
        let checker = true;

        for (let product of products) {
            const { productId, name, quantity, price } = product;

            const productDoc = await Product.findOne({ _id: productId });

            if (!productDoc) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).send({ message: `Product with ID ${productId} not found` });
            }

            if (productDoc.stockLeft < quantity) {
                checker = false;
                await session.abortTransaction();
                session.endSession();
                return res.status(400).send({ message: `Insufficient stock for product ID ${productId}` });
            }

            await Product.updateOne({ _id: productId }, { $inc: { stockLeft: -quantity } }).session(session);

            productObjects.push({
                productId: new mongoose.Types.ObjectId(productId),
                name,
                quantity,
                price
            });

            console.log(data)
        }

        if (!checker){
            session.abortTransaction();
            session.endSession();
            return;
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            id,
            {
                $set: { products: productObjects }
            },
            { new: true }
        );

        await session.commitTransaction();
        session.endSession();
        return res.status(200).send({ message: "Products updated successfully!", order: updatedOrder });
    } catch (err) {
        console.log(err.message);
        await session.abortTransaction();
        session.endSession();
        res.status(500).send({ message: err.message });
    }
});

// delete
router.delete('/DeleteOrder/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const orderToDelete = await orderModel.findByIdAndDelete(id);

        if (!orderToDelete) {
            return res.status(404).json({ message: "Order not found!" });
        }

        return res.status(200).send({ message: "Delete Successful!" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;
