var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var config = require('./config');
var userRoutes = require('./app/routes/user');   
var storyRoutes = require('./app/routes/story');

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
// user routes
app.use(config.api.baseUrl, userRoutes);
// middleware interceptor for token
app.use(tokenAuth);
// story routes
app.use(config.api.baseUrl, storyRoutes);
// handle static
app.use(express.static(__dirname + '/public'));

// all requests return index.html file
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// start server
app.listen(config.port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening on port ' + config.port);
  }
});