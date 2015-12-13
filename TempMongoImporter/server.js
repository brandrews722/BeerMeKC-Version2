/**
 * Server.js obtained from http://www.informit.com/articles/article.aspx?p=2301560
 */


var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};

var databaseUrl = "bmkc";
//var collections = ["bdbBrewery"];
var collections = ["bdbBeer"];
var db = require('mongojs');

var dbConnect = db(databaseUrl, collections);
var server = http.createServer(function onRequest(request, response) {
    var urlParts = url.parse(request.url);
    var fullPath = urlParts.pathname;
    var page = 'pages' + urlParts.pathname;
    var jsonOject = '';
    //if (fullPath == "/post") {
    //    var userName = '';
    //    request.on('data', function(chunk) {
    //        jsonObject = JSON.parse(chunk.toString());
    //        brewery = jsonObject.brewery;
    //        breweryId = jsonObject.breweryId;
    //        db.testData.insert({name: userName, email: userEmail}, function(err, testData) {
    //            if( err || !testData) console.log("Unable to add user");
    //        });
    //    });
    //}
    if (fullPath == "/post") {
        request.on('data', function(chunk) {
            jsonObject = JSON.parse(chunk.toString());
            //dbConnect.bdbBrewery.insert(jsonObject, function(err, testData) {
            dbConnect.bdbBeer.insert(jsonObject, function(err, testData) {
                if ( err || !testData) console.log("unable to add json object");
            });
        });
    }
    var mimeType = mimeTypes[path.extname(page).split(".")[1]];
    fs.exists(page, function fileExists(exists) {
        if (exists) {
            response.writeHead(200, mimeType);
            fs.createReadStream(page).pipe(response);
        } else {
            response.write('Page Not Found');
            response.end();
        }
    });
}).listen(3000);