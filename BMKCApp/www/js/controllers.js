angular.module('starter.controllers', [])

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

  .controller('BreweriesCtrl', function($scope, $http) {
    $http.get('https://api.brewerydb.com/v2/locations/?key=fd038434276f4a9e7d6a19ee2d8aa5b5&locality=Kansas%20City').then(function(resp) {
      console.log('Success', resp.data);

      angular.forEach(resp.data.data, function(item) {
        console.log(item.breweryId);
        getBreweryById(item.breweryId);
      })
    }, function(err) {
      console.error('ERR', err);
    })

    $scope.breweries = [
      { name: 'Big Rip', id: 1 },
      { name: 'Cinder Block', id: 2 },
      { name: 'Boulevard', id: 3 },
      { name: 'Torn Label', id: 4 },
      { name: 'Stockyards', id: 5 },
      { name: 'Eye For An Eye', id: 6 }
    ];

    function getBreweryById(id) {
      $http.get('http://api.brewerydb.com/v2/brewery/' + id + '?key=fd038434276f4a9e7d6a19ee2d8aa5b5').then(function(resp) {
        console.log('Success - Brewery with id ' + id, resp.data);
      }, function(err) {
        console.error('ERR', err);
      });
    }
  })

//.controller('PlaylistsCtrl', function($scope) {
//  $scope.playlists = [
//    { title: 'Reggae', id: 1 },
//    { title: 'Chill', id: 2 },
//    { title: 'Dubstep', id: 3 },
//    { title: 'Indie', id: 4 },
//    { title: 'Rap', id: 5 },
//    { title: 'Cowbell', id: 6 }
//  ];
//})
//
//.controller('PlaylistCtrl', function($scope, $stateParams) {
//});
