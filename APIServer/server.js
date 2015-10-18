/*
 server.js provided by https://github.com/scottksmith95/beerlocker/blob/master/beerlocker-6.2/server.js
 */

// Load required packages
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');
var userController = require('./bmkc_client/controllers/user');
var authController = require('./bmkc_client/controllers/auth');
var oauth2Controller = require('./bmkc_client/controllers/oauth2');
var clientController = require('./bmkc_client/controllers/client');
var uriUtil = require('mongodb-uri');
var mongoose = require('mongoose');
// Connect to the bmkc MongoDB

/**
 * Mongolab https://gist.github.com/mongolab-org/9959376 code follows for establishing connection
 */
/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

/*
 * Mongoose uses a different connection string format than MongoDB's standard.
 * Use the mongodb-uri library to help you convert from the standard format to
 * Mongoose's format.
 */
var mongodbUri = 'mongodb://cs551group4:LeeCS551@ds041144.mongolab.com:41144/bmkc';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

/*
 * Need multiple parameters for url, collections, auth mechanism, and options.
 */
mongoose.connect(mongooseUri, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
    mongoose.set('debug', true);
    // Wait for the database connection to establish, then start the app.
});

/*
End of https://gist.github.com/mongolab-org/9959376 snippet
 */

// Create our Express application
var app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({
    secret: 'Super Secret Session Key',
    saveUninitialized: true,
    resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

//// Create endpoint handlers for /beers
//router.route('/api/beers')
//    .post(authController.isAuthenticated, beerController.postBeers)
//    .get(authController.isAuthenticated, beerController.getBeers);
//
//// Create endpoint handlers for /beers/:beer_id
//router.route('/api/beers/:beer_id')
//    .get(authController.isAuthenticated, beerController.getBeer)
//    .put(authController.isAuthenticated, beerController.putBeer)
//    .delete(authController.isAuthenticated, beerController.deleteBeer);

// Create endpoint handlers for /users
router.route('/api/users')
    .post(userController.postUsers)
    .get(userController.getUsers);

// Create endpoint handlers for /clients
router.route('/api/clients')
    .post(authController.isAuthenticated, clientController.postClients)
    .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/api/oauth2/authorize')
    .get(authController.isAuthenticated, oauth2Controller.authorization)
    .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/api/oauth2/token')
    .post(authController.isClientAuthenticated, oauth2Controller.token);

router.get('/', function(req, res) {
    res.json({ message: 'You are running dangerously low on beer!' });
});

// Register all our routes
app.use(router);

// Start the server
app.listen(3000);