var express = require('express'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  config = require('./config'),
  mongoose = require('mongoose'),
  routes = require('./app/routes/api');
  
var jwt = require('jsonwebtoken');
var secretKey = config.secretKey;


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

// middleware interceptor for token
app.use(function (req, res, next) {
  console.log('Somebody came to our app');
  var token = req.body.token || req.params.token || req.headers['x-access-token'];
  console.log('TOKEN');
  console.log(token);

  // check if token exist
  if (token) {
    jwt.verify(token, secretKey, function (err, decoded) {
      if (err) return res.status(403).json({success: false, message:'Failed to authenticate user', err: err});

      req.decoded = decoded;
      next();
    });
  
  } else {
    res.status(403).json({ success: false, message:'No Token Provided' });    
  }

  
});
// var api = require('./app/routes/api')(app, express);
// app.use('/api', api);

// test for token middleware
app.get('/home', function (req, res) {
  res.status(200).json('hone route');
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