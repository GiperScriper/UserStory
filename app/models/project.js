var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  }

  created: {
    type: Date,
    default: Date.now
  },

  updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', CProjectSchema);