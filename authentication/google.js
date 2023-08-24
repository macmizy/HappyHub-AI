const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../models/user.model');
require('dotenv').config();


passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    try {
      let user = await User.find({ googleId: profile.id });
  
      if (user) {
        return done(null, user);
      } else {
        user = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          // ... other relevant user data
        });
  
        await user.save();
        return done(null, user);
      }
    } catch (error) {
      return done(error);
    }

  }
));

