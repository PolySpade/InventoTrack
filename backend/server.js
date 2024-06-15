import express from 'express';
import {PORT, mongodbURL} from "./config.js";
import mongoose from "mongoose";
//import session from 'express-session';
//import passport from './config/passport.js';

import warehouseRoutes from './routes/warehouseRoutes.js';
import productRoutes from './routes/productRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import orderedProductRoutes from './routes/orderedProductRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import currencyRoutes from './routes/currencyRoutes.js';
import platformRoutes from './routes/platformRoutes.js';
import courierRoutes from './routes/courierRoutes.js';
import expensesTypeRoutes from './routes/expensesTypeRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import alertRoutes from './routes/alertRoutes.js';

const app = express();
app.use(express.json());

app.use('/warehouses', warehouseRoutes);
app.use('/products', productRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/orderedProducts', orderedProductRoutes);
app.use('/orders', orderRoutes);
app.use('/accounts', accountRoutes);
app.use('/roles', roleRoutes);
app.use('/categories', categoryRoutes);
app.use('/currencies', currencyRoutes);
app.use('/platforms', platformRoutes);
app.use('/couriers', courierRoutes);
app.use('/expensesTypes', expensesTypeRoutes);
app.use('/expenses', expenseRoutes);
app.use('/alerts', alertRoutes);

/*app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());*/



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



