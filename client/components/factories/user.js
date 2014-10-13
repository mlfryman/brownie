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

    function updateProfile(){
      return $http.put('/user');
    }
    return {register:register, login:login, logout:logout, checkSession:checkSession, updateProfile:updateProfile};
  }]);
})();

