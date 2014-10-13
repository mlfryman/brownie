(function(){
  'use strict';

  angular.module('brownie')
  .factory('User', ['$http', function($http){

    function register(user){
      return $http.post('/register', user);
    }

    function login(user){
      return $http.post('/login', user);
    }

    function logout(){
      return $http.delete('/logout');
    }

    function checkSession(){
      return $http.get('/checkSession');
    }

    function all(){
      return $http.get('/users');
    }

    function subPoints(user){
      return $http.put('/users/sub/' + user._id);
    }

    function addPoints(user){
      return $http.put('/users/add/' + user._id);
    }

    return {register:register, login:login, logout:logout, checkSession:checkSession, all:all, subPoints:subPoints, addPoints:addPoints};
  }]);
})();

