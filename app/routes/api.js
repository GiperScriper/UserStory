var User = require('../models/user'),
  router = require('express').Router(),
  config = require('../../config'),
  jsonWebToken = require('jsonwebtoken');

var secretKey = config.secretKey;

function createToken(user) {
  
  var token = jsonWebToken.sign({
    _id: user._id,
    username: user.username
  }, secretKey, {
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
    res.status(201).json({ message: 'User has been created!'});
  }); 

});

// login user
router.post('/login', function (req, res) {
  
  User.findOne({
    username: req.body.username
  }).select('password').exec(function (err, user) {

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

    //res.status(200).json(user);

  });

});

module.exports = router;

// module.exports = function (app, express) {
//   var api = express.Router();

//   app.post('/register', function (req, res) {
//     console.log(req.body);
//     var user = new User({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       username: req.body.username,
//       password: req.body.password
//     });

//     user.save(function (err) {
//       if (err) {
//         res.send(err + ' my error');
//         return;
//       } 

//       res.json({ message: 'User has been created!'});      
//     });
//   });

//   app.get('/message', function (req, res) {
//     res.json({message: "it's me!"});
//   });

//   return api;

// };