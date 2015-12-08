//var Request = require ('../request');

var BeerSearch = function(config) {
    this.config = config;
    this.genEndpoint = "search/beer";
}

BeerSearch.prototype.beers = function(params, callback) {
    params.client_id = this.config.client_id;
    params.client_secret = this.config.client_secret;
    this.executeRequest(this.genEndpoint, params, callback);
}

BeerSearch.prototype.executeRequest = function(endpoint, params, callback) {
    var searchRequest = this.createRequest(endpoint, params, this.config);
    searchRequest.makeRequest(callback);
}

BeerSearch.prototype.createRequest = function(endpoint, params, config) {
    return new Request(endpoint, params, config);
}

module.exports = BeerSearch;