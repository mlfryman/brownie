(function(){
  'use strict';
  angular.module('brownie')
  .controller('EditProfileCtrl', ['$scope', '$modalInstance', 'User', 'user', function($scope, $modalInstance, User, user){

    $scope.user = user;

    $scope.updateProfile = function(){
      $modalInstance.close($scope.user);
      User.updateProfile($scope.user).then(function(response){
        console.log(response);
        user.fullName = response.data.user.fullName;
        user.username = response.data.user.username;
        user.email    = response.data.user.email;
        user.about    = response.data.user.about;
        if(response.status === 200){
          toastr.success('You succesfully edited your profile!');
        } else {
          toastr.error('Sorry something went wrong on our side.');
        }
      });
    };

    $scope.cancel = function(){
      $modalInstance.dismiss('cancel');
    };

  }]);
})();
