var express = require('express'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  config = require('./config'),
  mongoose = require('mongoose'),
  routes = require('./app/routes/api'),
  storyRoutes = require('./app/routes/story');

var tokenAuth = require('./app/middleware/tokenAuth');  
var jwt = require('jsonwebtoken');
var secretKey = config.secretKey;


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
app.use('/api/v1', routes);

// middleware interceptor for token
app.use(tokenAuth);

// story routes
app.use('/api/v1', storyRoutes);

// var api = require('./app/routes/api')(app, express);
// app.use('/api', api);

// test for token middleware
app.get('/home', function (req, res) {
  res.status(200).json('home route');
});


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