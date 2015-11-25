
var bmkcAppControllers = angular.module('bmkcAppControllers', ['userService', 'apiConstants', 'breweryServiceBDB']);

bmkcAppControllers.controller('AppCtrl', function ($scope, $http, $ionicModal, $timeout, userService) {

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
  }).then(function (modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function () {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function () {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function () {
    console.log('Doing login', $scope.loginData);
    //$http.defaults.headers.common['Authorization'] = 'Basic ' + $scope.loginData.username + ':' + $scope.loginData.password;
    var newUser = {};
    newUser.username = $scope.loginData.username;
    newUser.password = $scope.loginData.password;
    console.log('here');
    userService.registerNewUser(newUser).then(function(response) {
      $scope.userPosted = response.data;
      console.log($scope.userPosted);
    });
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function () {
      $scope.closeLogin();
    }, 1000);
  };
});

bmkcAppControllers.controller('BreweriesCtrl', function ($scope, $http, BreweryPassingService, breweryServiceBDB) {


  $scope.testBreweries = breweryServiceBDB.getBreweriesInKC().then(function(response) {
    $scope.breweries = response.data.data;
  });

  $scope.passBreweryToBreweryView = function (brewery) {
    $scope.BreweryPassingService = BreweryPassingService;
    BreweryPassingService.selectedBrewery = brewery;
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
/*
 Used to pass a brewery from BreweriesCtrl to BreweryCtrl
 */
bmkcAppControllers.factory('BreweryPassingService', function () {
  return {
    brewery: {}
  }
});

bmkcAppControllers.controller('BreweryCtrl', function ($scope, $stateParams, $http, BreweryPassingService, getBeersForBreweryService, breweryServiceBDB) {
  $scope.BreweryPassingService = BreweryPassingService;
  $scope.brewery = BreweryPassingService.selectedBrewery;
  var breweryId = $scope.brewery.breweryId;
  $scope.beers = [];
  console.log("breweryId: " + breweryId);
  breweryServiceBDB.getBeersForBrewery(breweryId).then(function (data) {
    $scope.beers = data.data.data;
    console.log($scope.beers);
  })
});

bmkcAppControllers.service('getBeersForBreweryService', function ($http) {





});







bmkcAppControllers.controller('MapController', function ($scope, $ionicLoading, $ionicPlatform, Markers) {



  $ionicPlatform.ready(function () {
    var myLatlng = new google.maps.LatLng(37.3000, -120.4833);


    var mapOptions = {
      center: myLatlng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var geoImage = "img/drunk-guy.png";

    navigator.geolocation.getCurrentPosition(function (pos) {
      map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      var myLocation = new google.maps.Marker({
        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        map: map,
        icon: geoImage,
        animation: google.maps.Animation.BOUNCE,
        title: "My Location"
      });
    });

    function addInfoWindow(marker, message, record) {

      var infoWindow = new google.maps.InfoWindow({
        content: message
      });

      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
      });

    }

    function navigateMe(destination, start) {
      $cordovaLaunchNavigator.navigate(destination, start);
    }

    function loadMarkers() {

      //Get all of the markers from our Markers factory
      Markers.getMarkers().then(function (markers) {

        var records = markers.data.data;
        var beerIcon = "img/beer-icon-yellow.png";


        for (var i = 0; i < records.length; i++) {

          var record = records[i];
          var markerPos = new google.maps.LatLng(record.latitude, record.longitude);

          // Add the markerto the map

          var marker = new google.maps.Marker({
            map: map,
            icon: beerIcon,
            animation: google.maps.Animation.DROP,
            position: markerPos
          });

          var destination = [record.latitude, record.longitude];

          var infoWindowContent = "<h5>" + record.brewery.name + "</h5>";
          infoWindowContent += "<a href='https://www.google.com/maps/dir/Current+Location/" + record.latitude + "," + record.longitude + "'>" + "Click Me</a>";
          //                        infoWindowContent += "<a href='#' onclick='navigateMe()'>" + "Take me there!" + "</a>;
          //                        infoWindowContent += "<p>" + record.

          addInfoWindow(marker, infoWindowContent, record);

        }

      })

    }


    loadMarkers();
    $scope.map = map;
    console.log(Markers.getMarkers());
  });

});
bmkcAppControllers.factory('Markers', function ($http) {
  var markers = [];
  return {
    getMarkers: function () {
      return $http.get('https://api.brewerydb.com/v2/locations/?key=fd038434276f4a9e7d6a19ee2d8aa5b5&locality=Kansas%20City').then(function (response) {
        markers = response;
        return markers;
      });
    },
    getMarker: function (id) {}
  }

});


//.service("getBeersForBreweryService", function($http, $q, breweryDBURL) {
//  var deferredBeers = $q.defer();
//  $http.get(breweryDBURL).then(function(data){
//    deferredBeers.resolve(data);
//  })
//  this.getBeers = function(breweryDBURL) {
//    return deferredBeers;
//  }
//})
