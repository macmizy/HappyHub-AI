const passport = require('passport');

// Custom middleware to authenticate with either "local" or "Google"
const authenticateUser = (req, res, next) => {
  passport.authenticate('local', (localErr, localUser) => {
    if (localErr) {
      return next(localErr);
    }
    
    passport.authenticate('google', (googleErr, googleUser) => {
      if (googleErr) {
        return next(googleErr);
      }
      
      // If either strategy succeeded, store the authenticated user and continue
      req.user = localUser || googleUser;
      next();
    })(req, res, next);
  })(req, res, next);
};

module.exports = authenticateUser