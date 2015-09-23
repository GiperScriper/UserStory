var mongoose = require('mongoose');
// mongoose Promise implementation don't support catch function, need to use bluebird library
mongoose.Promise = require('bluebird');

// connect to the database
module.exports = mongoose.connect('mongodb://localhost/userstory', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});