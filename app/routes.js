'use strict';

var Reed = require('./models/reed');

module.exports = function(app) {
  // GET ALL ====================================================================
  app.get('/api/reeds', function(req, res) {
    Reed.find(function(err, reeds) {
      if (err) {
        res.send(err);
      }

      res.json(reeds);
    });
  });

  // FIND BY ID =================================================================
  app.get('/api/reeds/:reedId', function(req, res) {
    Reed.findById(req.params.reedId ,function(err, reed) {
      if (err) {
        res.send(err);
      }

      res.json(reed);
    });
  });

  // CREATE =====================================================================
  app.post('/api/reeds', function(req, res) {
    console.log(req.body);

    Reed.create(req.body, function(err) {
      if (err) {
        res.send(err);
      }

      Reed.find(function(err, reeds) {
        if (err) {
          res.send(err);
        }

        res.json(reeds);
      });
    });

  });

  // UPDATE =====================================================================
  app.put('/api/reeds/:reedId', function(req, res) {
    Reed.update({
      _id: req.params.reedId
    }, req.body, function(err) {
      if (err) {
        res.send(err);
      }

      Reed.find(function(err, reeds) {
        if (err) {
          res.send(err);
        }

        res.json(reeds);
      });
    });
  });

  // DELETE =====================================================================
  app.delete('/api/reeds/:reedId', function(req, res) {
    Reed.remove({
      _id : req.params.reedId
    }, function(err) {
      if (err) {
        res.send(err);
      }

      Reed.find(function(err, reeds) {
        if (err) {
          res.send(err);
        }

        res.json(reeds);
      });
    });
  });
};