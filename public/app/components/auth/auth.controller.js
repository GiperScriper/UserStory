(function (){
  'use strict';

  angular
    .module('app.auth')
    .controller('authController', authController);

  authController.$inject = ['$scope', 'authFactory'];

  function authController($scope, authFactory) {
    $scope.data = [];

    //authFactory.getUsers.query(function (data) {
    //   $scope.data = data;
    // });

    // authFactory.login.save({username:'test', password:'test'}, function (response) {
    //   console.log(response.token);
    // })

      authFactory.login.save({username:'test', password:'test'}, function (response) {
        console.log(response.token);
      });
  }


}());