require("dotenv").config();
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = process.env
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    
      return cb(null, profile);
    
  }
));

passport.serializeUser(function(user,done){
    done(null, user)
})

passport.deserializeUser(function(user,done){
    done(null,user)
})