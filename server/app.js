// CONFIG
require("dotenv").config();
require("./config/mongodb")

const express = require('express');
const session = require("express-session");
const cors = require("cors");

// const cookieParser = require('cookie-parser');
// app.use(cookieParser());

const app = express();

// this rule allows the client app to exchange via http via the server (AJAX ... Axios)
const corsOptions = {
  origin: [process.env.CLIENT_URL],
  /* credentials : Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials */
  credentials: true,
  optionsSuccessStatus: 200
};

// cors middle on
app.use(cors(corsOptions));

app.use(express.json());

//------------------------------------------
// BASE BACKEND ROUTE
// ------------------------------------------

app.get("/", (req, res) => {
  res.send("Mood tracking server is running on port : " + process.env.PORT);
});

module.exports = app;
