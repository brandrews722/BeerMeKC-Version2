angular.module('bmkcApp.controllers')
  .controller('BreweryCtrl', function ($scope, $stateParams, $http, BreweryPassingFactory, breweryServiceBDB) {
    $scope.BreweryPassingFactory = BreweryPassingFactory;
    $scope.brewery = BreweryPassingFactory.selectedBrewery;
    var breweryId = $scope.brewery.breweryId;
    $scope.beers = [];
    console.log("breweryId: " + breweryId);
    breweryServiceBDB.getBeersForBrewery(breweryId).then(function (data) {
      $scope.beers = data.data.data;
      console.log($scope.beers);
    })
  });
