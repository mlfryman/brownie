'use strict';

var User = require('../models/user'),
    Prize = require('../models/prize');

exports.show = function(req, res){
  User.findById(req.user._id, function(err, user){
    Prize.findAllByUserId(user._id, function(err, prizes){
      res.send({user:user, prizes:prizes});
    });
  });
};
