/**
 * Created by Jordan on 11/25/2015.
 */
angular.module('breweryDBServices')

.service('breweryServiceBDB', function($http, APIS) {
    var baseUrl = APIS.BREWERYDB.BASE_URL;
    var baseLocalUrl = APIS.NODEJS.BASE_URL;
    var breweryDBKey = APIS.BREWERYDB.KEY;
    return {
      getBreweriesInKC: function () {
  //    return $http.get(baseUrl + 'locations/' + breweryDBKey + '&locality=Kansas%20City')
          return $http.get(baseLocalUrl + 'brewery_db/breweries')
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
      //  return $http.get(baseUrl + 'brewery/' + breweryId + '/beers/' + breweryDBKey)
          return $http.get(baseLocalUrl + 'brewery_db/beers_for_brewery/' + breweryId)

          .then(function success(response) {
            return response;
          },
          function error(response) {
            console.error('ERR', response);
          })
      },

      insertBrewery: function (theObject) {
        return $http.post("http://localhost:1337/192.168.1.120:3000/post", theObject)
          .then(function success(response) {
            return response;
          },
          function error(response) {
            console.error('ERR', response);
          })
      }

    }

  });
