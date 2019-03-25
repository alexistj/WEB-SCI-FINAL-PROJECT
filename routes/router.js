var express = require('express');
var router = express.Router();
var User = require('../models/User');
const path  = require('path');

// loggedin middleware
function isLoggedIn(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}

// GET route for reading data
router.get('/', function (req, res, next) {
  if (req.session.userId) {
    console.log(req.session.userId);
  }
  return res.sendFile(path.join('../index.html'));
});

// GET route after registering
router.get('/profile', isLoggedIn, function (req, res, next) {
  return res.json(req.userId);
});

// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    console.log(req.session);
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        console.log("Logged out");
        return res.redirect('/');
      }
    });
  }
});

// POST for LOGIN
router.post('/login', function (req, res, next) {
  if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect("/");
        // return res.json(user);
      }
    });
  }
});

// POST for registering
router.post('/register', function (req, res, next) {
  // confirm that user typed same password twice
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
      passwordConf: req.body.passwordConf,
    }

    // use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/profile');
      }
    });

  } else {
    var err = new Error('All fields have to be filled out');
    err.status = 400;
    return next(err);
  }

});

module.exports = router;
