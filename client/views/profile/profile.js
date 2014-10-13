(function(){
  'use strict';

  angular.module('brownie')
  .controller('ProfileCtrl', ['$scope', 'User', '$modal', function($scope, User, $modal){

    $scope.user = {};

    $scope.open = function(size){
      var modalInstance = $modal.open({
        templateUrl: '/views/editProfile/editProfile.html',
        controller: 'EditProfileCtrl',
        size: size,
        resolve: {
          house: function(){
            return $scope.house;
          }
        }
      });

      modalInstance.result.then(function(user){
        $scope.user = user;
      });
    };

    User.updateProfile().then(function(response){
      $scope.user = response.data.user;
    });

  }]);
})();

