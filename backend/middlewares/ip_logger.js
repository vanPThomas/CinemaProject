const { Require } = require("express");

const ipLoggerMiddleware = (req, res, next) => {
  console.log("Request met IP: ", req.ip);
  next();
};

module.exports = ipLoggerMiddleware;

// const str: string = "test";
