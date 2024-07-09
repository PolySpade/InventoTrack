import mongoose from 'mongoose';
import express, { request, response } from 'express';
const router = express.Router();
import { accountModel } from '../models/accountModel.js';
import "../strategies/local-strategy.js"; //might just be needed in account routes 
import passport from 'passport';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
config();

const JWT_SECRET = process.env.SECRET;

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


// create
router.post('/CreateAccount', async (req, res) => {
    try {
        const {email, name, password, role} = req.body;
        if (!email || !name || !password || !role){
            return res.status(400).send({ message: "Send all fields!" });
        }
        
        const existingAccount = await accountModel.findOne({email});
        if(existingAccount) {
            return res.status(400).send({message: "Email is already in use!"});
        }

        const hashedPasword = await bcrypt.hash(password,10)
        const newAccount = {
            email,
            name,   
            password: hashedPasword,
            role: new mongoose.Types.ObjectId(role)
        }

        const account = await accountModel.create(newAccount);
        return res.status(201).send(account);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
            console.log(err);
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user.toJSON(), JWT_SECRET, { expiresIn: '1h' });
            console.log("Success")
            return res.json({ user, token });
        });
    })(req, res, next);
});

router.get('/status', authMiddleware, (req, res) => {
    return req.user ? res.send(req.user) : res.sendStatus(401);
});

// router.post('/logout', (req, res) => {
//     req.logout((err) => {
//         if (err) return res.status(400).send({ message: 'Error logging out' });
//         res.sendStatus(200);
//     });
// });

// get all accounts
router.get('/', async (req, res) => {
    try {
        const accounts = await accountModel.find({});
        return res.status(200).json(accounts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});




// get specific account
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const account = await accountModel.findById(id);

        if (!account){
            return res.status(404).send({ message: "Account not found" });
        }

        return res.status(200).json(account);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// edit
router.put('/EditAccount/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const accountToEdit = await accountModel.findByIdAndUpdate(id, req.body);

        if (!accountToEdit){
            return res.status(404).send({ message: "Account not found" });
        }

        return res.status(200).send({message: "Update Successful!"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// delete
router.delete('/DeleteAccount/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const accountToDelete = await accountModel.findByIdAndDelete(id);

        if (!accountToDelete){
            return res.status(404).json({ message: "Account not found!" });
        }

        return res.status(200).send({ message: "Delete Successful!" });
    }  catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});



export default router;