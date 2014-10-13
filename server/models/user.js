'use strict';

var bcrypt  = require('bcrypt'),
    // Message = require('./message'),
    //Prize = require('./prize'),
    _       = require('underscore'),
    Mongo   = require('mongodb');

function User(o){
  this.email       = o.email;
  this.fullName    = o.fullName;
  this.username    = o.username;
  this.password    = bcrypt.hashSync(o.password, 10);
  this.since       = new Date();
  this.about       = o.about;
  this.connections = [];
  //this.gravatar  = '';
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id),
      user;
  User.collection.findOne({_id:_id}, function(err, response){
    user = Object.create(User.prototype);
    _.extend(user, response);
    cb(err, user);
  });
};

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(user || o.password.length < 6){return cb();}
    User.collection.save(user, cb);
  });
};

User.login = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(o.password, user.password);
    if(!isOk){return cb();}
    cb(null, user);
  });
};

User.updateProfile = function(user, cb){
  user._id = Mongo.ObjectID(user._id);
  User.save(user, cb);
};

User.prototype.connect = function(updatedUser, cb){
  updatedUser._id = Mongo.ObjectID(updatedUser._id);
  User.collection.save(updatedUser, function(err, response){
    cb(updatedUser);
  });
};

module.exports = User;

