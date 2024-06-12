import express from 'express';
import {PORT, mongodbURL} from "./config.js";
import mongoose from "mongoose";
import warehouseRoutes from './routes/warehouseRoutes.js';
import productRoutes from './routes/productRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import orderedProductRoutes from './routes/orderedProductRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import roleRoutes from './routes/roleRoutes.js';

const app = express();

app.use(express.json());

app.use('/warehouses', warehouseRoutes);
app.use('/products', productRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/orderedProducts', orderedProductRoutes);
app.use('/orders', orderRoutes);
app.use('/accounts', accountRoutes);
app.use('/roles', roleRoutes);

mongoose.connect(mongodbURL)
.then(() => {
    console.log("Connected to InventotrackDB Database");
    app.listen(PORT, () => {
        console.log(`PORT ${PORT} is active`);
    });
})
.catch((err) => {
    console.log(err);
});