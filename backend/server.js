import express from 'express';
import { config } from 'dotenv';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import "./strategies/local-strategy.js"; // might just be needed in account routes 

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
// stock in & stock out
import stockIn from './buttonFunc/stockIn.js';
import stockOut from './buttonFunc/stockOut.js';

// Load environment variables
config();

const app = express();

// app.use(cookieParser());
// app.use(
//     session({
//         secret: process.env.SECRET,
//         saveUninitialized: false,
//         resave: false,
//         cookie: {
//             maxAge: 60000 * 60 * 24 // cookies last for 1 day -> feel free to edit 
//         }
//     })
// );


app.use(express.json());

const corsOptions = {
    origin: process.env.ORIGIN, 
    credentials: true, 
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));

// Initialize Passport
app.use(passport.initialize());
// app.use(passport.session());

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
// stock in & stock out
app.use('/stockIn', stockIn);
app.use('/stockOut', stockOut);

app.get('/', (req, res) => {
    try {
        res.status(200).send('Welcome to the Inventotrack API');
    } catch (error) {
        res.status(500).send('An error occurred: ' + error.message);
    }
});

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to InventotrackDB Database");
        app.listen(process.env.PORT, () => {
            console.log(`PORT ${process.env.PORT} is active`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
