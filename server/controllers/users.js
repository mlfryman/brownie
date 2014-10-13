'use strict';

var User = require('../models/user');

exports.register = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.status(200).end();
    }else{
      res.status(400).end();
    }
  });
};

exports.login = function(req, res){
  User.login(req.body, function(err, user){
    if(user){
      req.session.regenerate(function(){
        req.session.userId = user._id;
        req.session.save(function(){
          res.setHeader('X-Authenticated-User', user.email);
          var userData = user;
          delete userData.password;
          res.send({user: userData});
        });
      });
    }else{
      res.status(401).end();
    }
  });
};

exports.logout = function(req, res){
  req.session.destroy(function(){
    res.setHeader('X-Authenticated-User', 'anonymous');
    res.status(200).end();
  });
};

exports.checkSession = function(req, res){
  if(req.user){
    var userData = req.user;
    delete userData.password;
    res.send({user: userData});
  }else{
    //will remain anonymous until refresh
    //this is handled client side
    res.send({user: {username: 'Anonymous'}});
  }
};

exports.index = function(req, res){
  User.query(req.user, req.query, function(err, clients){
    res.send({clients:clients, query:req.query});
  });
};

exports.updateProfile = function(req, res){
  User.updateProfile(req.body, function(err, response){
    if(response) {
      res.status(200).end();
    } else {
      res.status(500).end();
    }
  });
};

exports.showProfile = function(req, res){
  User.findById(req.user._id, function(err, user){
    user.password = undefined;
    res.send({user:user});
  });
};

exports.connect = function(req, res){
  User.findById(req.user._id, function(err, user){
    user.connect(req.body, function(user){
      res.send({user:user});
    });
  });
};

/*
   exports.favorite = function(req, res){
   User.findById(req.params.userId, function(err, client){
   res.locals.user.stalkStart(req.params.userId, function(){
   req.flash('success', 'You are now stalking', client.username + '. Don\'t worry, we won\'t tell.');
   res.redirect('/users/' + req.params.userId);
   });
   });
   };

   exports.unfavorite = function(req, res){
   User.findById(req.params.userId, function(err, client){
   res.locals.user.stalkStop(req.params.userId, function(){
   req.flash('success', 'We\'ve made a note that you lost interest in', client.username + '.');
   res.redirect('/users/' + req.params.userId);
   });
   });
   };

   exports.request = function(req, res){
   res.locals.user.request(req.params.userId, function(){
   req.flash('success', 'Your request was sent!');
   res.redirect('/users/' + req.params.userId);
   });
   };

   exports.hookup = function(req, res){
   res.locals.user.hookup(req.params, function(){
   req.flash('success', 'Congrats! You are now hooked up!');
   res.redirect('/profile');
   });
   };

   exports.reject = function(req, res){
   res.locals.user.reject(req.params, function(){
   req.flash('success', 'Hey killer. We would have said no as well.');
   res.redirect('/profile');
   });
   };

   exports.breakup = function(req, res){
   res.locals.user.breakup(req.params.userId, function(){
   req.flash('success', 'Time to put that relationship in a box in the ground.');
   res.redirect('/users/' + req.params.userId);
   });
   };
   */
