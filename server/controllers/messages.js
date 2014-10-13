'use strict';

var User     = require('../models/user'),
    Message  = require('../models/message');

exports.sendMessage = function(req, res){
  User.findById(req.params.userId, function(err, receiver){
    res.locals.user.send(receiver, req.body, function(){
      res.redirect('/users/' + receiver.alias);
    });
  });
};

exports.index = function(req, res){
  Message.findAllForUser(req.user._id, function(err, messages){
    res.send({messages:messages});
  });
};

exports.message = function(req, res){
  Message.read(req.params.msgId, function(err, msg){
    res.send({msg:msg});
  });
};

