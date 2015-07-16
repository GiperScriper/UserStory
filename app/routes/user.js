var User = require('../models/user'),  
  router = require('express').Router(),
  config = require('../../config'),
  jwt = require('jsonwebtoken');

function createToken(user) { 
  var token = jwt.sign({
    id: user._id,
    username: user.username
  }, config.secretKey, {
    expiresInMinutes: 1440
  });

  return token;
};



router.get('/users', function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
        res.status(500).json(err);
        return;
    }                
    
    res.status(200).json(users);    
  });
});


// create user
router.post('/signup', function (req, res) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password
  });

  user.save(function (err) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(201).json({ message: 'User has been created!' });
  }); 

});

// login user
router.post('/login', function (req, res) {
  
  User.findOne({
    username: req.body.username
  }).select('password username').exec(function (err, user) {

    if (err) throw err;

    if (!user) {      
      res.status(400).json({ message: "User doesn't exist" });
    
    } else if (user) {
      var validPassword = user.comparePassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: "Invalid Password" });
      } else {
        
        // create token
        var token = createToken(user);
        
        res.status(200).json({
          success: true,
          token: token
        });
      }
    }    

  });

});


module.exports = router;