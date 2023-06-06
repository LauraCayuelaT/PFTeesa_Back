const express = require ("express");
const morgan = require("morgan");
const routes = require("./routes/index")
const server = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(new GoogleStrategy({
  clientID: "871749157700-dld0sob8qo0p9jranhb3misppo3g9gav.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "https://accounts.google.com/o/oauth2/auth"
}, (accessToken, refreshToken, profile, done)=>{
  
}
))

server.use(express.json());
server.use(morgan("dev"));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
  
server.use("/", routes);


module.exports = server;
