const express = require("express");
const app = express();
const cors = require("cors");
const ExpressError = require("./expressError");

//middleware

app.use(cors());
app.use(express.json());

//routes

app.use("/authentication", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

/** 404 handler */

app.use(function(req, res, next) {
    const err = new ExpressError("Not Found", 404);
    return next(err);
  });
  
  /** general error handler */
  
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if (process.env.NODE_ENV != "test") console.error(err.stack);
  
    return res.json({
      error: err,
      message: err.message
    });
  });
  
  
  module.exports = app;