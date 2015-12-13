var BdbBeer = require('../models/bdbBeer');

exports.getBeersForBrewery = function(req, res) {
    BdbBeer.find(
        {bdbBreweryId : req.params.bdbBreweryId},
     function(err, breweries) {
        if (err)
            res.send(err);
        res.json(breweries);
    });
};
