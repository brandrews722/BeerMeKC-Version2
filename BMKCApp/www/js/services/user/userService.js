angular.module('userServices', [])

  .service('userService', function($http, APIS) {
    var baseUrl = APIS.NODEJS.BASE_URL;
    return {
      logIn: function(username, password) {
        return $http.post(baseUrl + 'login/', {username: username, password: password})
      },

      logOut: function() {

      },

      getUsers: function () {
        return $http.get('/users')

          .then(function success(response) {
            return response;

          },
          function error(response) {
            console.error('ERR', response);
          })
      },


      getUserById: function (id) {
        return $http.get(baseUrl + '/users/' + id)

          .then(function success(response) {
            return response;

          },
          function error(response) {
            console.error('ERR', response);
          })
      },


      getUserByName: function (name) {
        return $http.get(baseUrl + 'users/byname/' + name)
          .then(function success(response) {
            return response;

          },
          function error(response) {
            console.error('ERR', response);
          })

      },


      registerNewUser: function (user) {
        return $http.post(baseUrl + 'users/', {

          "username": user.username,
          "password": user.password
        }).then(
          function success(response) {
            return response;
          },
          function error(response) {
            console.log(user.username + user.password);
            console.error('ERR', response);
            return response;
          })

      }
    }
  });
