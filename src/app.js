const express = require ("express");
const morgan = require("morgan");
const routes = require("./routes/index")
const server = express();
const session = require("express-session");
const passport = require("passport");
require("./auth")


// server.use(session({
//   secret: 'proyectoTeesa',
//   resave: false,
//   saveUninitialized: false
// }));;
// server.use(passport.initialize());
// server.use(passport.session());



server.use(express.json());
server.use(morgan("dev"));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });



  
server.use("/", routes);


module.exports = server;
