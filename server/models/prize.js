'use strict';

var Mongo  = require('mongodb'),
    _      = require('underscore');

function Prize(o, userId){
  this.name        = o.name;
  this.desc        = o.desc;
  this.cost        = parseInt(o.cost);
  this.category    = o.category;
  this.createdDate = new Date();
  this.userId      = userId;
}

Object.defineProperty(Prize, 'collection', {
  get: function(){return global.mongodb.collection('prizes');}
});

Prize.create = function(o, userId, cb){
  var prize = new Prize(o, userId);
  Prize.collection.save(prize, cb);
};

Prize.findById = function(prizeId, cb){
  //recast into Mongo ObjectIDs
  var _id = Mongo.ObjectID(prizeId);
  Prize.collection.findOne({_id:_id}, cb);
};

Prize.findAllByUserId = function(id, cb){
  var userId = Mongo.ObjectID(id),
      prize;
  Prize.collection.find({userId:userId}).sort({createdDate:-1}).toArray(function(err, response){
    var prizes = response.map(function(res){
      prize = Object.create(Prize.prototype);
      _.extend(prize, res);
      return prize;
    });
    cb(err, prizes);
  });
};

Prize.deleteById = function(prize, cb){
  //recast into Mongo ObjectIDs
  prize._id = Mongo.ObjectID(prize._id);
  Prize.collection.findAndRemove(prize, cb);
};

Prize.update = function(prize, cb){
  //recast into Mongo ObjectIDs
  prize._id = Mongo.ObjectID(prize._id);
  prize.userId = Mongo.ObjectID(prize.userId);
  Prize.collection.save(prize, cb);
};

module.exports = Prize;

