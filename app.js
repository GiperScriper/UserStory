var express = require('express'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  config = require('./config'),
  mongoose = require('mongoose'),
  routes = require('./app/routes/api');
  

var app = express();

// connect to the database
mongoose.connect(config.database, function (err) {
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

// routes
app.use('/api/v1', routes);

// var api = require('./app/routes/api')(app, express);
// app.use('/api', api);

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