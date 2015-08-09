(function (){
  'use strict';

  angular
    .module('app.auth', ['ngResource'])
    .factory('authFactory', authFactory);
    
  authFactory.$inject = ['$resource'];

  function authFactory($resource) {
    // var authFactory = {};
    
    // authFactory.getUsers = $resource('api/v1/users');

    authFactory.login = $resource('api/v1/login');

    return authFactory;

    // return $resource('api/v1/login', {}, {
    //   login: {
    //     method: 'POST'
    //   }
    // })
  }


}());