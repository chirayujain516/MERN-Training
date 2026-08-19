const express = require("express");
const app = express();

const validation = (req, res, next) => {
  let token = 123;
  if (token !== 123) {
    res.end("You are not authorized to access data");
  }
  next();
};

module.exports = validation;