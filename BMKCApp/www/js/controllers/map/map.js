angular.module('bmkcApp.controllers').controller('MapController', function ($scope, $ionicLoading, $ionicPlatform, Markers) {



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
