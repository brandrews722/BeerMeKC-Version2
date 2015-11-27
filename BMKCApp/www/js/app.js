// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('bmkcApp', [
  'ionic',
  'userServices',
  'bmkcApp.controllers',

  'breweryDBServices',
  'apiConstants'

])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      if (window.cordova && window.cordova.logger) {
        window.cordova.logger.__onDeviceReady();
      }

      $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute){
        if (nextRoute.access.loginRequired && !authenticationService.isLogged) {
          $location.path('/login');
        }
      });
    });
  })



  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $ionicConfigProvider.views.maxCache(10);
    $ionicConfigProvider.tabs.position('bottom');

    $httpProvider.interceptors.push('tokenInterceptor');

    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl',
        access: { loginRequired: false }
      })

      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
          }

        },
        access: { loginRequired: false }
      })

      .state('app.beerMe', {
        url: '/beerMe',
        views: {
          'menuContent': {
            templateUrl: 'templates/beerMe.html'
          }
        },
        access: { loginRequired: false }
      })

      .state('app.map', {
        url: '/map',
        views: {
          'menuContent': {
            templateUrl: 'templates/map.html',
            controller: 'MapController'
          }
        },
        access: { loginRequired: true }
      })
      .state('app.breweries', {
        url: '/breweries',
        views: {
          'menuContent': {
            templateUrl: 'templates/breweries.html',
            controller: 'BreweriesCtrl'
          }
        },
        access: { loginRequired: true }
      })
      .state('app.brewery', {
        url: '/breweries/:breweryId',
        views: {
          'menuContent': {
            templateUrl: 'templates/brewery.html',
            controller: 'BreweryCtrl'
          }
        },
        access: { loginRequired: true }

      })
      .state('app.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'templates/about.html'
          }
        },
        access: { loginRequired: false }
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/about');

  });
