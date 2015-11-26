


angular.module('bmkcApp.controllers').controller('BreweriesCtrl', function ($scope, $http, BreweryPassingFactory, breweryServiceBDB) {


  $scope.testBreweries = breweryServiceBDB.getBreweriesInKC().then(function(response) {
    $scope.breweries = response.data.data;
  });

  $scope.passBreweryToBreweryView = function (brewery) {
    $scope.BreweryPassingFactory = BreweryPassingFactory;
    BreweryPassingFactory.selectedBrewery = brewery;
  }

  function getBreweryById($scope, id) {
    $http.get('http://api.brewerydb.com/v2/brewery/' + id + '?key=fd038434276f4a9e7d6a19ee2d8aa5b5').then(function (resp) {
      console.log('Success - Brewery with id ' + id, resp.data);
      return resp.data
    }, function (err) {
      console.error('ERR', err);
    });
  }
});
