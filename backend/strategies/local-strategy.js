import passport from 'passport';
import { Strategy } from 'passport-local';
import { accountModel } from '../models/accountModel.js';

passport.serializeUser((user, done) => {
    console.log('Inside Serialize User');
    console.log(user);
    done(null, user.email);
});

passport.deserializeUser(async(email, done) =>{
    console.log('Inside Deserialize User');
    console.log(`Deserializing User email: ${email}`);
     try{
        const findUser = await accountModel.findOne({email: email});
        if(!findUser) throw new Error("User not Found");
        done(null, findUser);
     }catch(err){
        done(err, null);
     }
})

export default passport.use(
    new Strategy({usernameField: "email"}, async(username, password, done) => {
        console.log(`email: ${username}`);
        console.log(`password: ${password}`);
        try{
            const findUser = await accountModel.findOne({email: username});
            if(!findUser) throw new Error("User not found!");
            if(findUser.password != password) 
                throw new Error("Password is incorrect");
            done(null, findUser);
        }catch(err){
            done(err, null);
        }
        
    })
)