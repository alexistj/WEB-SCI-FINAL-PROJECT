var express = require('express');
var router  = express.Router();
var User    = require('../models/User');
const jwt   = require('jsonwebtoken'); // used to create, sign, and verify tokens
const path  = require('path');

function isAuthenticated(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, req.app.get('secret'), function(err, decoded) {       if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });       } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
}

// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname +'/../views/index.html'));
});

// GET route after registering
router.get('/dashboard/:userid', isAuthenticated, function (req, res, next) {
  // return res.json(req.userId);
  if(req.session.page_views){
     req.session.page_views++;
     res.send("You visited this page " + req.session.page_views + " times");
     // return res.sendFile(path.join(__dirname +'/../views/dashboard.html'));
  } else {
     req.session.page_views = 1;
     res.send("Welcome to this page for the first time!");
     // return res.sendFile(path.join(__dirname +'/../views/dashboard.html'));
  }
});

// POST for LOGIN
router.post('/login', function (req, res, next) {

  if (req.body.username && req.body.password) {

    // authenticate the user
    User.authenticate(req.body.username, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong username or password.');
        err.status = 401;
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        return next(err);
      } else {
        const payload = { userId: user._id  };
        var token = jwt.sign(payload, req.app.get('secret'), {
          expiresIn: '24h' // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    });
  }
});

// POST for registering
router.post('/register', function (req, res, next) {
  // // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf
    }

    // use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        return next(err)
      } else {
        return res.json({ success: true });
      }
    });

  } else {
    var err = new Error('All fields have to be filled out');
    err.status = 400;
    return next(err);
  }

});

module.exports = router;
