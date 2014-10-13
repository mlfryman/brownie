'use strict';

var bcrypt  = require('bcrypt'),
    //Prize = require('./prize'),
    _       = require('underscore'),
    Mongo   = require('mongodb');

function User(o){
  this.email       = o.email;
  this.fullName    = o.fullName;
  this.username    = o.username;
  this.password    = bcrypt.hashSync(o.password, 10);
  this.since       = new Date();
  this.points      = 0;
  this.connections = [];
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
    if(user || o.password.length < 3){return cb();}
    var u = new User(o);
    User.collection.save(u, cb);
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
User.prototype.connect = function(updatedUser, cb){
  updatedUser._id = Mongo.ObjectID(updatedUser._id);
  User.collection.save(updatedUser, function(err, response){
    cb(updatedUser);
  });
};

User.all = function(cb){
  User.collection.find().toArray(cb);
};

User.addPoints = function(userId, cb){
  User.findById(userId, function(err1, user){
    //recast MongoID
    user._id = Mongo.ObjectID(user._id);
    //add point
    user.points++;
    User.collection.save(user, function(err2){
      cb(user);
    });
  });
};

User.subPoints = function(userId, cb){
  User.findById(userId, function(err1, user){
    //recast MongoID
    user._id = Mongo.ObjectID(user._id);
    //subtract point
    user.points--;
    User.collection.save(user, function(err2){
      cb(user);
    });
  });
};


module.exports = User;

