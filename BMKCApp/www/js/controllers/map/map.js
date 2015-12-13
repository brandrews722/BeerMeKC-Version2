angular.module('bmkcApp.controllers').controller('MapController', function ($scope, $ionicLoading, $q, $ionicPlatform, Markers) {



$ionicPlatform.ready(function () {

        var myMapText = "";
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
        navigator.geolocation.getCurrentPosition(GetLocation);
        var myLat, myLong;

        function GetLocation(location) {
            myLat = location.coords.latitude;
            myLong = location.coords.longitude;
        }

    
        
        function calculateDistances(recordLat, recordLong, curLat, curLong) {
            var myOrigin = new google.maps.LatLng(curLat, curLong)
            console.log("myorigin", myOrigin);
            var myDestination = new google.maps.LatLng(recordLat, recordLong);
            console.log("thelat", recordLat);
            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix({
                origins: [myOrigin], //array of origins
                destinations: [myDestination], //array of destinations
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                avoidHighways: false,
                avoidTolls: false
            }, callback);
        }

        function callback(response, status) {
            if (status == google.maps.DistanceMatrixStatus.OK) {
                console.log("thisresp", response);
            }
        }
      //  myMapText += rteDistance + "</div><div class='col'>" + rteDuration + "</div></div>";

        //                    //start address == origin
        //                    var start = origin;
        //                    //end address is the furthest desitnation from the origin.
        //                    var end = sortable[sortable.length - 1][0];
        //                    //calculate the route with the waypoints        
        //                    calculateRoute(start, end, waypoints);
        //                    //log the routes and duration.
        //                    $('#results').html(resultText);
    


/////////////
function loadMarkers() {

    //Get all of the markers from our Markers factory
    Markers.getMarkers().then(function (markers) {

        var records = markers.data.data;
        console.log("makersmarkers", records);
        var beerIcon = "img/beer-icon-yellow.png";

        //gets current location to be later used for distance calculation of breweries

        console.log("lat", myLat);
        console.log("long", myLong);


        for (var i = 0; i < records.length; i++) {

            var record = records[i];
            console.log("thisrec", record);
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
            infoWindowContent += "<a href='https://www.google.com/maps/dir/Current+Location/" + record.latitude + "," + record.longitude + "'>" + "Take Me There!</a>";
            //                        infoWindowContent += "<a href='#' onclick='navigateMe()'>" + "Take me there!" + "</a>;
            //                        infoWindowContent += "<p>" + record.

            addInfoWindow(marker, infoWindowContent, record);


            //                        Distance.getDistance(myLat, myLong, record).then(function(result){
            //                            console.log("disteresult", result);
            //                            dist = result;
            //                        }, function (error){
            //                            console.log("error");
            //                                           });

            //                        console.log("dister", dist);
            //                        var dur = Distance.getDuration(myLat, myLong, record);
            myMapText += "<div class='row'><div class='col'>" + record.brewery.name + "</div><div class='col'>";
            calculateDistances(record.latitude, record.longitude, myLat, myLong);
//            document.getElementById("mapList").innerHTML += myMapText;
            //                        document.getElementById("mapList").innerHTML += "<div class='row'><div class='col'>" + record.brewery.name + "</div><div class='col'>" + "" + "</div>" + "<div class='col'>" + "" + "</div></div>";

        }



    })

}

loadMarkers();
$scope.map = map;
console.log(Markers.getMarkers());
});

})
//https://maps.googleapis.com/maps/api/distancematrix/json?origins=Seattle&destinations=San+Francisco&key=YOUR_API_KEY
//    .factory('Distance', function ($http, $q) {
//        var returnDistance = [];
//        var returnDuration = [];
//        var apiLink = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=";
//        var apiKey = "&key=AIzaSyCCFNl9nQvcN1ZLlydw-_w4CBL4deNn3vc"
//        var deffered = $q.defer();
//        return {
//            getDistance: function (thisLat, thisLong, thisRecord) {
//                return $http.get(apiLink + thisLat + "," + thisLong + "&destinations=" + thisRecord.latitude + "," + thisRecord.longitude + "&units=imperial" + apiKey).then(function (response) {
//                    console.log("theresp", response);
//                    deffered.resolve(response.data.rows[0].elements[0].distance.text);
//                    localStorage.setItem("distance", returnDistance);
//                    return deffered.promise;
//                })
//            },
//            getDuration: function (thisLat, thisLong, thisRecord) {
//                return $http.get(apiLink + thisLat + "," + thisLong + "&destinations=" + thisRecord.latitude + "," + thisRecord.longitude + "&units=imperial" + apiKey).then(function (response) {
//                    //                    console.log("duration", response);
//                    returnDuration = response.data.rows[0].elements[0].duration.text;
//                    return returnDuration;
//                })
//            }
//        }
//    });