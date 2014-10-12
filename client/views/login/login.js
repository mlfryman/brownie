(function(){
  'use strict';

  angular.module('brownie')
  .controller('LoginCtrl', ['$scope', '$location', '$rootScope', 'User' , 'AUTH_EVENTS', function($scope, $location, $rootScope, User, AUTH_EVENTS){
    $scope.user = {};
    $scope.formIsValid = false;

    $scope.$watch('loginForm.$valid', function(){
      $scope.formIsValid = !$scope.formIsValid;
    });

    function successLogin(response){
      toastr.success('Welcome Back!');
      $scope.setCurrentUser(response.data.user);
      $location.path('/dashboard');
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
