angular.module('bmkcApp.controllers')
  .controller('BreweryCtrl', function ($scope, $stateParams, $http, BreweryPassingFactory, breweryServiceBDB) {
    $scope.BreweryPassingFactory = BreweryPassingFactory;
    $scope.brewery = BreweryPassingFactory.selectedBrewery;
    var breweryId = $scope.brewery.breweryId;
    $scope.beers = [];
    console.log("breweryId: " + breweryId);
    breweryServiceBDB.getBeersForBrewery(breweryId).then(function (data) {
      $scope.beers = data.data;
      /*
       used to populate the MongoDB with the existing beers for this brewery. Saving this for later.
       */
      //data.data.data.forEach(function partB(theObject) {
      //  theObject.bdbBreweryId = breweryId;
      //
      //
      //
      //
      //    breweryServiceBDB.insertBrewery(theObject).then(function(response) {
      //      console.log("success??");
      //
      //    });
      //});
      console.log($scope.beers);
    })
  });
