var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');

var db = require('./app/db');
var loadRoutes = require('./app/init/loadRoutes');
var config = require('./app/config/app');
//var tokenAuth = require('./app/middleware/tokenAuth');

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
var routes = require('./app/routes');

// routes
loadRoutes(app, routes);

// start server
app.listen(config.port, function (err) {
  // expose global test value
  global.test = 5;
  if (err) throw err;
  console.log('Listening on port ' + config.port);
});