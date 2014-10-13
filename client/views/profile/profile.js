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
      toastr.success('Bummer. You made your friend sad by taking away Brownie Points.');
    }

    function success3(response){
      toastr.success('Awww... how trusting. A mystery prize is on the way!');
    }

    function success4(response){
      toastr.success('Let\'s go get drinks!');
    }

    function success5(response){
      toastr.success('Don\'t know what it is \'bout the Predators scorin, but I like it! I love it! I want some more of it.');
    }

    function success6(response){
      toastr.success('Let\'s go to a fancy dinner!');
    }

    function success7(response){
      toastr.success('Dat code. Consider it done!');
    }

    function success8(response){
      toastr.success('Hubba! Hubba!');
    }

    function failure(response){
      toastr.failure('Sorry, something went wrong on our side!... or you fail at clicking.');
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
    $scope.buyDrinks = function(user){
      User.subPoints(user).then(success4, failure);
    };
    $scope.buyPreds = function(user){
      User.subPoints(user).then(success5, failure);
    };
    $scope.buyDinner = function(user){
      User.subPoints(user).then(success6, failure);
    };
    $scope.buyCode = function(user){
      User.subPoints(user).then(success7, failure);
    };
    $scope.buyLuv = function(user){
      User.subPoints(user).then(success8, failure);
    };

  }]);
})();

