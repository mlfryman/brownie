(function(){
  'use strict';

  angular.module('brownie', ['ngRoute', 'LocalForageModule', 'ui.gravatar', 'ui.bootstrap'])
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .config(['$routeProvider', '$httpProvider', '$localForageProvider', function($routeProvider, $httpProvider, $localForageProvider){
    $routeProvider
    .when('/',         {templateUrl:'/views/home/home.html',           controller:'HomeCtrl'})
    .when('/register', {templateUrl:'/views/register/register.html',   controller:'RegisterCtrl'})
    .when('/login',    {templateUrl:'/views/login/login.html',         controller:'LoginCtrl'})
    .when('/logout',   {templateUrl:'/views/logout/logout.html',       controller:'LogoutCtrl'})
    .when('/profile',  {templateUrl:'/views/profile/profile.html',     controller:'ProfileCtrl'})
    .when('/users',    {templateUrl:'/views/profile/connections.html', controller:'ProfileCtrl'})
    .when('/404',      {templateUrl:'/views/errors/404.html',          controller:'ErrorsCtrl'})
    .otherwise({redirectTo:'/404'});

    $httpProvider.interceptors.push('HttpInterceptor');
    $localForageProvider.config({name:'brownie', storeName:'cache', version:1.0});
  }]);
})();

