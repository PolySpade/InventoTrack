import passport from 'passport';
import { Strategy } from 'passport-local';
import { accountModel } from '../models/accountModel.js';
import bcrypt from 'bcrypt';

// passport.serializeUser((user, done) => {
//     done(null, user.email);
// });

// passport.deserializeUser(async (email, done) => {
//     try {
//         const findUser = await accountModel.findOne({ email: email });
//         if (!findUser) throw new Error("User not Found");
//         done(null, findUser);
//     } catch (err) {
//         done(err, null);
//     }
// });

export default passport.use(
    new Strategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const findUser = await accountModel.findOne({ email });
            if (!findUser) throw new Error("Email not found!");
            const isMatch = await bcrypt.compare(password, findUser.password);
            if (!isMatch) throw new Error("Password is incorrect");
            done(null, findUser);
        } catch (err) {
            done(err, null);
        }
    })
);
