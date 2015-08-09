var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true }},
  password: { type: String, required: true, select: false },
  firstName: String,
  lastName: String
});


UserSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, null, null, function (err, hash) {
    if (err) return next(err);
    
    user.password = hash;
    next();
  });

});


// custom method for compare passwords
UserSchema.methods.comparePassword = function (password) {
  var user = this;

  return bcrypt.compareSync(password, user.password);
};


module.exports = mongoose.model('User', UserSchema);