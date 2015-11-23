/*
 user.js inspired by https://github.com/scottksmith95/beerlocker/blob/master/beerlocker-6.2/controllers/user.js
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
            res.json({ message: 'New BMKC beer drinker added to the MongoLab!' });
        }

    });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
    User.find(function(err, users) {
        if (err)
            res.send("!"+err);

        res.json(users);
    });
};

exports.removeUser = function(req, res) {
    User.remove({
        _id: req.params.id
    }, function(err, user) {
        if (err)
            res.send(err);
        res.json({message: 'User with username: ' + user.username + ' successfully removed from MongoDB'});

    })
};

exports.getUser = function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    })
};

exports.updateUser = function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
        if (err)
            res.send(err);

        for (prop in req.body) {
            user[prop] = req.body[prop];
        }

        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'User successfully updated!'});
        });

        res.json(user)
    });
};
