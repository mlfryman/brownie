(function(){
  'use strict';

  angular.module('brownie')
  .controller('ProfileCtrl', ['$scope', '$routeParams', 'User', function($scope, $routeParams, User){
    $scope.user = {};
    $scope.users = [];
    $scope.userId = $routeParams.userId;

    User.all().then(function(response){
      $scope.users = response.data.users.filter(function(f){
        return f._id !== $scope.currentUser._id;
      });
    });

    function success1(response){
      toastr.success('Success! You made your friend\'s day by giving them Brownie Points!');
    }

    function success2(response){
      toastr.success('You made your friend sad by taking away Brownie Points.');
    }

    function success3(response){
      toastr.success('A hug is on the way!');
    }

    function failure(response){
      toastr.failure('Sorry, something went wrong on our side! Please try again.');
    }

    $scope.addPoints = function(user){
      User.addPoints(user).then(success1, failure);
    };

    $scope.subPoints = function(user){
      User.subPoints(user).then(success2, failure);
    };

    $scope.buyPrize = function(user){
      User.subPoints(user).then(success3, failure);
    };

  }]);
})();

