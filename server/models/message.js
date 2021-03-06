'use strict';

var async = require('async'),
    Mongo  = require('mongodb');

function Message(senderId, receiverId, subject, body){
  this.senderId   = senderId;
  this.receiverId = receiverId;
  this.subject    = subject;
  this.body       = body;
  this.date       = new Date();
  this.isRead     = false;
}

Object.defineProperty(Message, 'collection', {
  get: function(){return global.mongodb.collection('messages');}
});

Message.countForUser = function(userId, cb){
  Message.collection.count({receiverId:userId, isRead:false}, cb);
};

Message.read = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Message.collection.findAndModify({_id:_id}, [], {$set:{isRead:true}}, function(err, msg){
    iterator(msg, cb);
  });
};

Message.send = function(senderId, receiverId, subject, body, cb){
  var msg = new Message(senderId, receiverId, subject, body);
  Message.collection.save(msg, cb);
};

Message.unread = function(receiverId, cb){
  Message.collection.find({receiverId:receiverId, isRead:false}).count(cb);
};

Message.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Message.collection.findOne({_id:_id}, cb);
};

Message.findAllForUser = function(receiverId, cb){
  Message.collection.find({receiverId:receiverId}).sort({date:-1}).toArray(function(err, msgs){
    async.map(msgs, iterator, cb);
  });
};

module.exports = Message;

function iterator(msg, cb){
  require('./user').findById(msg.senderId, function(err, sender){
    msg.sender = sender;
    cb(null, msg);
  });
}

/*'use strict';

var Mongo  = require('mongodb'),
    async  = require('async');

function Message(senderId, receiverId, subject, body, request){
  console.log(senderId, receiverId, subject, body, request);
  this.senderId   = Mongo.ObjectID(senderId);
  this.receiverId = Mongo.ObjectID(receiverId);
  this.subject    = subject;
  this.body       = body;
  this.date       = new Date();
  this.isRequest  = request;
  this.isRead     = false;
}

Object.defineProperty(Message, 'collection', {
  get: function(){return global.mongodb.collection('messages');}
});

Message.read = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Message.collection.findandModify({_id:_id}, [], {$set:{isRead:true}}, function(err, msg){
    iterator(msg, cb);
  });
};

Message.unread = function(receiverId, cb){
  Message.collection.find({receiverId:receiverId, isRead:false}).count(cb);
};

Message.send = function(senderId, receiverId, subject, body, request, cb){
  var msg = new Message(senderId, receiverId, subject, body, request);
  Message.collection.save(msg, cb);
};

Message.messages = function(receiverId, cb){
  Message.collection.find({receiverId:receiverId}).sort({date:-1}).toArray(function(err, msgs){
    async.map(msgs, iterator, cb);
  });
};

Message.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Message.collection.findOne({_id:_id}, cb);
};

module.exports = Message;

// HELPER FUNCTION

function iterator(msg, cb){
  require('./user').findById(msg.senderId, function(err, sender){
    msg.sender = sender;
    cb(null, msg);
  });
}
*/
