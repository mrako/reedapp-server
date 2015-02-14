'use strict';

var jwt = require('jsonwebtoken');

var User = require('./models/user');
var Reed = require('./models/reed');

var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = function(app) {

  passport.use(new BearerStrategy(function(token, done) {
      console.log("tomme");
      User.findOne({ token: token }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));

  // AUTHENTICATION ====================================================================
  app.post('/authenticate', function(req, res) {
    User.findOne({
      email: req.body.email,
      password: req.body.password
    }, function(err, user) {
      if (err) {
        res.json({
          type: false,
          data: "Error occured: " + err
        });
      } else {
        if (user) {
          res.json({
            type: true,
            data: user,
            token: user.token
          });
        } else {
          res.json({
            type: false,
            data: "Incorrect email/password"
          });
        }
      }
    });
  });

  // SIGNIN ====================================================================
  app.post('/signin', function(req, res) {
    User.findOne({
      email: req.body.email,
      password: req.body.password
    }, function(err, user) {
      if (err) {
        res.json({
          type: false,
          data: "Error occured: " + err
        });
      } else {
        if (user) {
          res.json({
            type: false,
            data: "User already exists!"
          });
        } else {
          var userModel = new User();
          userModel.email = req.body.email;
          userModel.password = req.body.password;
          userModel.save(function(err, user) {
            user.token = jwt.sign(user, process.env.JWT_SECRET);
            user.save(function(err, user1) {
              res.json({
                type: true,
                data: user1,
                token: user1.token
              });
            });
          })
        }
      }
    });
  });


  // GET ALL ====================================================================
  app.get('/api/reeds', passport.authenticate('bearer', { session: false }), function(req, res) {
    console.log("loading reeds");

    Reed.find(function(err, reeds) {
      if (err) {
        res.sendStatus(err);
      }

      res.json(reeds);
    });
  });

  // FIND BY ID =================================================================
  app.get('/api/reeds/:reedId', passport.authenticate('bearer', { session: false }), function(req, res) {
    Reed.findById(req.params.reedId, function(err, reed) {
      if (err) {
        res.sendStatus(err);
      }

      res.json(reed);
    });
  });

  // CREATE =====================================================================
  app.post('/api/reeds', passport.authenticate('bearer', { session: false }), function(req, res) {
    console.log(req.body);

    Reed.create(req.body, function(err) {
      if (err) {
        res.sendStatus(err);
      }

      Reed.find(function(err, reeds) {
        if (err) {
          res.sendStatus(err);
        }

        res.json(reeds);
      });
    });

  });

  // UPDATE =====================================================================
  app.put('/api/reeds/:reedId', passport.authenticate('bearer', { session: false }), function(req, res) {
    Reed.update({
      _id: req.params.reedId
    }, req.body, function(err) {
      if (err) {
        res.sendStatus(err);
      }

      Reed.find(function(err, reeds) {
        if (err) {
          res.sendStatus(err);
        }

        res.json(reeds);
      });
    });
  });

  // DELETE =====================================================================
  app.delete('/api/reeds/:reedId', passport.authenticate('bearer', { session: false }), function(req, res) {
    Reed.remove({
      _id: req.params.reedId
    }, function(err) {
      if (err) {
        res.sendStatus(err);
      }

      Reed.find(function(err, reeds) {
        if (err) {
          res.sendStatus(err);
        }

        res.json(reeds);
      });
    });
  });
};
