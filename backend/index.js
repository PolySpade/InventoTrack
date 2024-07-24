import express from 'express';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import "./strategies/local-strategy.js"; // might just be needed in account routes 

import warehouseRoutes from './routes/warehouseRoutes.js';
import productRoutes from './routes/productRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
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
import historyRoutes from './routes/historyRoutes.js';
import authRoutes from './routes/authRoutes.js';
// stock in & stock out
import stockIn from './buttonFunc/stockIn.js';
import stockOut from './buttonFunc/stockOut.js';
import authMiddleware from './middlewares/authMiddleware.js';

// Load environment variables

const app = express();

app.use(express.json());

const corsOptions = {
    origin: process.env.ORIGIN, 
    credentials: true, 
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));

// Use cookie parser
app.use(cookieParser());

// Initialize session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/warehouses', authMiddleware, warehouseRoutes);
app.use('/products', authMiddleware, productRoutes);
app.use('/suppliers', authMiddleware, supplierRoutes);
app.use('/orders', authMiddleware, orderRoutes);
app.use('/accounts', authMiddleware, accountRoutes);
app.use('/roles', authMiddleware, roleRoutes);
app.use('/categories', authMiddleware, categoryRoutes);
app.use('/currencies', authMiddleware, currencyRoutes);
app.use('/platforms', authMiddleware, platformRoutes);
app.use('/couriers', authMiddleware, courierRoutes);
app.use('/expensesTypes', authMiddleware, expensesTypeRoutes);
app.use('/expenses', authMiddleware, expenseRoutes);
app.use('/alerts', authMiddleware, alertRoutes);
app.use('/histories', authMiddleware, historyRoutes);
// stock in & stock out
app.use('/inventory/stockIn', authMiddleware, stockIn);
app.use('/inventory/stockOut', authMiddleware, stockOut);

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
