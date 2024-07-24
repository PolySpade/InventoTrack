import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { accountModel } from '../models/accountModel.js';
import bcrypt from 'bcrypt';

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
    try {
        const findUser = await accountModel.findOne({ email: email });
        if (!findUser) {
            return done(new Error("User not found"), null);
        }
        done(null, findUser);
    } catch (err) {
        done(err, null);
    }
});

export default passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const findUser = await accountModel.findOne({ email });
            if (!findUser) {
                return done(null, false, { message: "Email not found!" });
            }
            const isMatch = await bcrypt.compare(password, findUser.password);
            if (!isMatch) {
                return done(null, false, { message: "Password is incorrect" });
            }
            done(null, findUser);
        } catch (err) {
            done(err, null);
        }
    })
);
