/**
 * Created by Jordan on 11/25/2015.
 */
var breweryServiceBDB = angular.module('breweryServiceBDB', ['apiConstants']);

breweryServiceBDB.service('breweryServiceBDB', function($http, APIS) {
    var baseUrl = APIS.BREWERYDB.BASE_URL;
    var breweryDBKey = APIS.BREWERYDB.KEY;
    return {
      getBreweriesInKC: function () {
        return $http.get(baseUrl + 'locations/' + breweryDBKey + '&locality=Kansas%20City')

          .then(function success(response) {
            return response;

          },
          function error(response) {
            console.error('ERR', response);
          })
      },
      getBreweryByID: function (id) {

      },

      getBeersForBrewery: function (breweryId) {
        return $http.get(baseUrl + 'brewery/' + breweryId + '/beers/' + breweryDBKey)

          .then(function success(response) {
            return response;
          },
          function error(response) {
            console.error('ERR', response);
          })
      }

    }

  });
