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
    
    
    .controller('CardsCtrl', function ($scope, $http) {
  var cardTypes = [
    { image: 'img/pic2.jpg', title: 'Boulevard Tank 7'},
    { image: 'img/pic3.jpg', title: 'Boulevard Wheat'},
    { image: 'img/pic4.jpg', title: 'Boulevard Sixth Glass'},
  ];

  $scope.cards = [];

  $scope.addCard = function(i) {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }

  for(var i = 0; i < 3; i++) $scope.addCard();

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

