import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import "../strategies/local-strategy.js"; // Ensure this file configures Passport
import authMiddleware from '../middlewares/authMiddleware.js';
import { roleModel } from '../models/roleModel.js';

const router = express.Router();
const JWT_SECRET = process.env.SECRET;


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


router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(400).send({ message: 'Error logging out' });
        res.sendStatus(200);
    });
});

router.get('/roles', async (req, res) => {
    try {
        const roles = await roleModel.find({});
        return res.status(200).json(roles);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;
