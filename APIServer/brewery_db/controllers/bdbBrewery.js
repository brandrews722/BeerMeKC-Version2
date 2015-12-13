var BdbBrewery = require('../models/bdbBrewery');

exports.getBreweries = function(req, res) {
    BdbBrewery.find(function(err, breweries) {
        if (err)
            res.send(err);
        res.json(breweries);
    });
};
