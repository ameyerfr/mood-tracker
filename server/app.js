// Use DEVMODE to be always logged with the seed user server side
const _DEVMODE = true;

// CONFIG
require("dotenv").config();
require("./config/mongodb")
require("./config/passport");

// REQUIRES
const express = require('express');
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

// EXPRESS APP
const app = express();
app.use(express.json()); // Json parsing for AJAX calls

//------------------------------------------
// Cross Origin Ressource Sharing
// Allows the client app to exchange via http via the server (AJAX ... Axios)
// -----------------------------------------
const corsOptions = {
  origin: [process.env.CLIENT_URL],
  /* credentials : Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials */
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

//------------------------------------------
// SESSION
// -----------------------------------------
/*
Create a session middleware with the given options.
Note:  Session data is not saved in the cookie itself, just the session ID.
Session data is stored server-side.
*/
app.use(
  session({
    cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 }, // 4 hours
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET_SESSION
  })
);

app.use(passport.initialize());
app.use(passport.session());

//------------------------------------------
// DEVMODE - Always logged in as John Doe
// -----------------------------------------
if (_DEVMODE === true) {
  app.use(function devMode(req, res, next) {
      req.user = {
        _id: "5e56a25c4587de245dc968a4",
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@domain.com"
      }
      next();
    });
}

//------------------------------------------
// BASE ROUTE
// -----------------------------------------
app.get("/", (req, res) => {
  console.log("USER : ", req.user)
  res.send("Mood tracking server is running on port : " + process.env.PORT);
});

//------------------------------------------
// ROUTES
// -----------------------------------------
app.use(require("./routes/auth.js"));

module.exports = app;
