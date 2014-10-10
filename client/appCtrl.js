(function(){
  'use strict';

  var appControls = angular.module('brownie');

  appControls.controller('AppCtrl', ['$scope', function($scope){
    $scope.currentUser = {username: 'anonymous'};

    $scope.setCurrentUser = function(user){
      $scope.currentUser = user;
    };

    $scope.destroySession = function(){
      $scope.currentUser = {username: 'Anonymous'};
    };

  }]);

})();
