(function(){
  'use strict';

  angular.module('brownie', ['ngRoute', 'LocalForageModule'])
  .config(['$routeProvider', '$httpProvider', '$localForageProvider', function($routeProvider, $httpProvider, $localForageProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/register', {templateUrl:'/views/register/register.html', controller:'RegisterCtrl'})
    .when('/login',    {templateUrl:'/views/login/login.html',       controller:'LoginCtrl'})
    .when('/logout',   {templateUrl:'/views/logout/logout.html',     controller:'LogoutCtrl'})
    .when('/dashboard',   {templateUrl:'/views/dashboard/dashboard.html'})
    .when('/profile',   {templateUrl:'/views/profile/profile.html'})
    .when('/search',   {templateUrl:'/views/search/search.html'})
    .when('/logout',   {templateUrl:'/views/logout/logout.html',     controller:'LogoutCtrl'})
    .otherwise({redirectTo:'/'});

    $httpProvider.interceptors.push('HttpInterceptor');
    $localForageProvider.config({name:'brownie', storeName:'cache', version:1.0});
  }]);
})();

