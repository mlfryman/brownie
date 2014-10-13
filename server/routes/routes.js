'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    debug          = require('../lib/debug'),
    security       = require('../lib/security'),
    home           = require('../controllers/home'),
    prizes         = require('../controllers/prizes'),
    dashboards     = require('../controllers/dashboards'),
    //messages       = require('../controllers/messages'),
    users          = require('../controllers/users');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../../public'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));

  app.use(security.authenticate);
  app.use(debug.info);

  app.get('/home', home.index);
  app.post('/register', users.register);
  app.post('/login', users.login);
  //session check
  app.get('/checkSession', users.checkSession);

  app.use(security.bounce);
  app.delete('/logout', users.logout);
  app.post('/users', users.index);
  app.put('/user', users.connect);
  app.put('/user', users.updateProfile);
  app.get('/profile', users.showProfile);
  app.get('/dashboard', dashboards.show);

  app.post('/prizes', prizes.create);
  app.get('/prizes', prizes.index);
  app.delete('/prizes/:prizeId', prizes.remove);
  app.put('/prizes/:prizeId', prizes.update);

  //app.post('/message/compose', messages.create);
  //app.get('/inbox', messages.index);
  //app.delete('/message/:msgId', messages.remove);
  //app.put('/message/:msgId', messages.update);

  console.log('Express: Routes Loaded');
};

