var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// mongoose Promise implementation don't support catch function, need to use bluebird library
mongoose.Promise = require('bluebird');

var config = require('./config');
var tokenAuth = require('./app/middleware/tokenAuth');

var app = express();

// connect to the database
mongoose.connect(config.database.url, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});


// parse json and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// enable logger
app.use(logger('dev'));

// require routes
var Routes = require('./app/routes');

// routes
app.use(config.api.baseUrl, Routes.user);
app.use(config.api.baseUrl, Routes.story);
app.use(config.api.baseUrl, Routes.customer);


// start server
app.listen(config.port, function (err) {
  if (err) throw err;
  console.log('Listening on port ' + config.port);
});