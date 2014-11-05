(function(){
  'use strict';
  angular.module('brownie')
  .controller('EditProfileCtrl', ['$scope', '$modalInstance', 'User', 'user', function($scope, $modalInstance, User, user){

    $scope.user = user;

    $scope.editProfile = function(){
      $modalInstance.close();
      User.update($scope.user).then(function(response){
        user.fullName = response.data.user.fullName;
        user.username = response.data.user.username;
        user.email    = response.data.user.email;
        toastr.success('Your profile has been edited, it will load on refresh!');
      });
    };

    $scope.ok = function(){
      $modalInstance.close();
    };

  }]);
})();
