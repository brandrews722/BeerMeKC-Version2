angular.module('bmkcApp.controllers')

  .directive('noScroll', function() {
    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {
        $element.on('touchmove', function(e) {
          e.preventDefault();
        });
      }
    }
  })


  .controller('CardsCtrl', function ($scope, breweryServiceBDB) {
    $scope.binderBeers = breweryServiceBDB.getDemoBeers().then(function(response) {
      console.log("these are the beers");
      console.log(response.data);
      var cardTypes = [];
      angular.forEach(response.data, function(beer) {
        console.log("adding item to binderBeers");
        console.log(beer);
        console.log(getImage(beer) + beer.name);
        cardTypes.push({image: getImage(beer), title: beer.name});
      });

      function getImage(beer) {
        if (typeof beer.labels != "undefined") {
          if (typeof beer.labels.bmkc == "undefined") {
            if (typeof beer.labels.medium != "undefined") {
              return beer.labels.medium;
            }
          } else {
            return beer.labels.bmkc;
          }
        }

      };

      $scope.cards = [];

      $scope.addCard = function(i) {
        var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
        newCard.id = Math.random();
        $scope.cards.push(angular.extend({}, newCard));
      };

      for(var i = 0; i < cardTypes.length; i++) $scope.addCard();

      $scope.cardSwipedLeft = function(index) {
        console.log('Left swipe');
      }

      $scope.cardSwipedRight = function(index) {
        console.log('Right swipe');
      }

      $scope.cardDestroyed = function(index) {
        $scope.cards.splice(index, 1);
        console.log('Card removed');
      }
    });


  });

