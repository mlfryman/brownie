(function(){
  'use strict';

  angular.module('brownie')
  .controller('DashboardCtrl', ['$scope', 'User', 'Dashboard','$window', function($scope, User, Dashboard, $window){

    User.index(User).then(function(response){
      $scope.user = response.data.user;
    });
  }]);
})();

