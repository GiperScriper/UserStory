var User = require('../models/user'),
  router = require('express').Router(),
  config = ('../../config');

var secretKey = config.secretKey;

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