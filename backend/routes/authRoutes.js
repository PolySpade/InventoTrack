import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { accountModel } from '../models/accountModel.js';
import "../strategies/local-strategy.js"; // Ensure this file configures Passport
import { config } from 'dotenv';
import authMiddleware from '../middlewares/authMiddleware.js';

config();


const router = express.Router();
const JWT_SECRET = process.env.SECRET;

// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) return res.sendStatus(403);

//     const token = authHeader.split(' ')[1];
//     console.log(token)
//     if (!token) return res.sendStatus(403);

//     jwt.verify(token, JWT_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// };

router.post('/login', (req, res, next) => {
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
            console.log("Success");
            return res.json({ user, token });
        });
    })(req, res, next);
});

router.get('/status', authMiddleware, (req, res) => {
    return req.user ? res.send(req.user) : res.sendStatus(401);
});

// If you want to add logout functionality
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(400).send({ message: 'Error logging out' });
        res.sendStatus(200);
    });
});

export default router;
