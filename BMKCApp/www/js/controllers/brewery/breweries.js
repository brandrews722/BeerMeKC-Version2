


angular.module('bmkcApp.controllers').controller('BreweriesCtrl', function ($scope, $http, BreweryPassingFactory, breweryServiceBDB) {


  $scope.testBreweries = breweryServiceBDB.getBreweriesInKC().then(function(response) {
    console.log(response.data);

    /*
    used to populate the MongoDB with the existing breweries. Saving this for later.
     */
    //response.data.data.forEach(function(theObject) {
    //    breweryServiceBDB.insertBrewery(theObject).then(function(response) {
    //      console.log("success??");
    //
    //    });
    //});




    $scope.breweries = response.data;
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
