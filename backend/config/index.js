"use strict";

const db = require("./db");

module.exports = {
  db: db,
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
};
