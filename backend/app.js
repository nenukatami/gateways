// server.js
"use strict";

/******************** dependencies ********************/
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const createError = require("http-errors");
const logger = require("morgan");
const cors = require("cors");

/******************** configuration ********************/

// config files
const config = require("./config");

// connect to mongoDB database
// enter credentials in config/db
mongoose.connect(config.db[config.env].url);
require("./app/models/gateway");
require("./app/models/device");
// if error with mongoDB connection then exit
mongoose.connection.on("error", (reason) => {
  console.log(reason.name);
  console.log(reason.message);
  console.log(reason.stack);
  process.exit(1);
});

const routes = require("./app/routes");
const app = express();
app.use(cors());

// log
app.use(logger("dev"));

// get POST parameters
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/******************** routes ********************/
routes.init(app);

/******************** errors ********************/
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.jsonp({
    msg: err.message,
    stack: config.env === "development" && err.status === 500 ? err : {},
  });
});

module.exports = app;
