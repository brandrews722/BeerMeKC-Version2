angular.module('starter.controllers', ['starter.constants'])

  .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('BreweriesCtrl', function($scope, $http, BreweryPassingService) {
    var baseUrl = 'https://api.brewerydb.com/v2/';
    var breweryDBKey = '?key=fd038434276f4a9e7d6a19ee2d8aa5b5';
    $scope.breweries = [];

    $http.get(baseUrl + 'locations/' + breweryDBKey + '&locality=Kansas%20City').then(function (resp) {
      //$http.get('/api/get-all-beers/').then(function (resp) {
      console.log('Success', resp.data);

      angular.forEach(resp.data.data, function(item) {
        $scope.breweries.push(item);
      });
    }, function(err) {
      console.error('ERR', err);
    });

    $scope.passBreweryToBreweryView = function(brewery) {
      $scope.BreweryPassingService = BreweryPassingService;
      BreweryPassingService.selectedBrewery = brewery;
    }

    function getBreweryById($scope, id) {
      $http.get('http://api.brewerydb.com/v2/brewery/' + id + '?key=fd038434276f4a9e7d6a19ee2d8aa5b5').then(function(resp) {
        console.log('Success - Brewery with id ' + id, resp.data);
        return resp.data
      }, function(err) {
        console.error('ERR', err);
      });
    }





  })
  /*
   Used to pass a brewery from BreweriesCtrl to BreweryCtrl
   */
  .factory('BreweryPassingService',function(){
    return {brewery:{}}
  })

  .controller('BreweryCtrl', function($scope, $stateParams, $http, BreweryPassingService, getBeersForBreweryService) {
    $scope.BreweryPassingService=BreweryPassingService;
    $scope.brewery = BreweryPassingService.selectedBrewery;
    var breweryId = $scope.brewery.breweryId;

    $scope.beers = [];
    console.log("breweryId: " + breweryId);
    getBeersForBreweryService.getBeers(breweryId).then(function(data) {
      $scope.beers = data.data.data;
      console.log($scope.beers);
    })


    //getBeersForBrewery(breweryId);
    //console.log('Success - Brewery with id ' + breweryId + ' has the following beerss: ', $scope.beers);
    //function getBeersForBrewery($scope, $http, breweryId) {
    //  var baseUrl = 'https://api.brewerydb.com/v2/';
    var breweryDBKey = '?key=fd038434276f4a9e7d6a19ee2d8aa5b5';
    //
    //  //$http.get('http://api.brewerydb.com/v2/brewery/' + breweryId + '/beers/' + breweryDBKey).then(function (resp) {
    //  //
    //  //  $scope.beers = resp.data;
    //  //  console.log('Success - Brewery with id ' + breweryId + ' has the following beers: ', resp.data);
    //  //}, function (err) {
    //  //  console.error('ERR', err);
    //  //});
    //}

    //this.getBeers = getBeersForBreweryService.getBeers('http://api.brewerydb.com/v2/brewery/' + breweryId + '/beers/' + breweryDBKey).success(function () {
    //  $scope.beers =
    //}).error(function(err) {
    //  console.error('ERR', err);
    //});
    //beersPromise.then(function(data) {
    //  $scope.beers = data;
    //})


  })

  .service('getBeersForBreweryService', function($http) {


    return {
      getBeers: function (breweryId) {
        return $http.get('http://api.brewerydb.com/v2/brewery/' + breweryId + '/beers/' + '?key=fd038434276f4a9e7d6a19ee2d8aa5b5')

          .then(function success(response) {
            return response;
          },
          function error(response) {
            console.error('ERR', response);
          });
      }
    };


  })

.service('userService', function($http) {
    return {
      getUsers: function() {
        return $http.get('http://localhost:3000/api/users')

          .then(function success(response) {
            return response;

          },
        function error(response) {
          console.error('ERR', response);
        });
      }
    };

    return {
      getUserById: function(id) {
        return $http.get('http://localhost:3000/api/users/' + id)

          .then(function success(response) {
            return response;

          },
          function error(response) {
            console.error('ERR', response);
          });
      }
    };

    return {
      getUserByName: function(name) {
        return $http.get('http://localhost:3000/api/users/byname/' + name)
          .then(function success(response) {
            return response;

          },
          function error(response) {
            console.error('ERR', response);
          });
      }
    };

  })



//.service("getBeersForBreweryService", function($http, $q, breweryDBURL) {
//  var deferredBeers = $q.defer();
//  $http.get(breweryDBURL).then(function(data){
//    deferredBeers.resolve(data);
//  })
//  this.getBeers = function(breweryDBURL) {
//    return deferredBeers;
//  }
//})




