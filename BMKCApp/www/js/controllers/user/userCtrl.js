angular.module('bmkcApp.controllers')
  .controller('LoginCtrl', function AdminUserCtrl($scope, $location, $window, userService, authenticationService) {

      //Admin User Controller (login, logout)
      $scope.logIn = function logIn(username, password) {
        if (username !== undefined && password !== undefined) {

          userService.logIn(username, password).success(function(data) {
            authenticationService.isLogged = true;
            $window.sessionStorage.token = data.token;
            $location.path("/beerMe");
          }).error(function(status, data) {
            console.log(status);
            console.log(data);
          });
        }
      };

      $scope.logOut = function logOut() {
        if (authenticationService.isLogged) {
          authenticationService.isLogged = false;
          delete $window.sessionStorage.token;
          $location.path("/login");
        }
      };
    }
  );
