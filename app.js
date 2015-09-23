var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var db = require('./app/config/db');

var config = require('./config');
var tokenAuth = require('./app/middleware/tokenAuth');

// instantiate app
var app = express();

// parse json and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// verbs such as PUT or DELETE
app.use(methodOverride());
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
  // expose global test value
  global.test = 5;
  if (err) throw err;
  console.log('Listening on port ' + config.port);
});