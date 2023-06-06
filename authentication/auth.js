const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const UserModel = require('../models/user.model');
require('dotenv').config()

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                const username = req.body.username
                const user = await UserModel.create({ username, email, password });

                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            
        },
        async (email, password, done) => {
            try {
                var user = await UserModel.find({$or:[{email: email },{username: email },]});
                
                var user = user.pop()
                
                if (!user || user === undefined) {
                    return done(null,false,{message: 'User not found'})
                }
                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);
