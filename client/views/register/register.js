(function(){
  'use strict';

  angular.module('brownie')
  .controller('RegisterCtrl', ['$scope', '$location', 'User', function($scope, $location, User){
    $scope.user = {};
    $scope.formIsValid = false;

    $scope.$watch('userForm.$valid', function(){
      $scope.formIsValid = !$scope.formIsValid;
    });

    function success(response){
      toastr.success('Successfully registered!');
      $location.path('/profile');
    }

    function failure(response){
      toastr.error('That email is already taken, or the password is too short. Please try again.');
      $scope.user = {};
    }

    $scope.register = function(){
      if(!$scope.formIsValid){
        toastr.error('All fields are required');
      }else{
        User.register($scope.user).then(success, failure);
      }
    };
  }]);
})();

