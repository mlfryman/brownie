(function(){
  'use strict';

  angular.module('brownie')
  .controller('LoginCtrl', ['$scope', '$location', '$rootScope', 'User' , 'AUTH_EVENTS', function($scope, $location, $rootScope, User, AUTH_EVENTS){
    $scope.user = {};

    function successLogin(response){
      toastr.success('Welcome!');
      $scope.setCurrentUser(response.data.user);
      $location.path('/');
    }

    function failureLogin(response){
      toastr.error('Username or password incorrect, please try again.');
      $scope.user = {};
    }

    $scope.login = function(){
      User.login($scope.user).then(successLogin, failureLogin);
    };

  }]);
})();
