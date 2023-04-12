const express = require('express');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());

const authentication = require("./middlewares/authentication")
app.use('/', indexRouter);
app.use('/users', authentication, usersRouter);

// error handler
app.use(function(err, req, res, next) {
  console.error(err)
  res.sendStatus(err.status || 500);
});

module.exports = app;
