'use strict';

var Prize = require('../models/prize');

exports.create = function(req, res){
  Prize.create(req.body, req.user._id, function(err, prize){
    res.send({prize:prize});
   });
};

exports.index = function(req, res){
  Prize.findAllByUserId(req.user._id, function(err, prizes){
    res.send({prizes:prizes});
  });
};

exports.remove = function(req, res){
  console.log(req.body);
  Prize.deletebyId(req.params.prizeId, function(err, prize){
    res.status(200).end();
  });
};

exports.update = function(req, res){
  Prize.update(req.body.prize, function(err, response){
    if(response) {
      res.status(200).end();
    } else {
      res.status(500).end();
    }
  });
};

