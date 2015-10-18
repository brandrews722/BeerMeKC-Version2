/*
 user.js provided by https://github.com/scottksmith95/beerlocker/blob/master/beerlocker-6.2/controllers/user.js
 */
// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function(err) {
        if (err)
            res.send(err);
        else {
            res.json({ message: 'New beer drinker added to the database!' });
        }

    });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
    User.find(function(err, user) {
        if (err)
            res.send(err);

        res.json(user);
    });
};
