angular.module('userServices').
  service('AuthenticationService', function() {
    var auth = {
      isLogged: false
    }

    return auth;
  });
