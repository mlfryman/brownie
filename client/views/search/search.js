(function(){
  'use strict';

  angular.module('brownie')
  .controller('SearchUsersCtrl', ['$scope', '$location', 'User', function($scope, $location, User){

    $scope.searchUsers = {};
    $scope.results = [];


    $scope.searchUsers = function(){
      User.searchUsers($scope.searchUsers.query, 'all').then(function(res){
        $scope.results = res.data.results;
        $scope.searchUsers.query = '';
      });
    };

  }]);
})();

