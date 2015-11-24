var Request = require('../request');

var Base = function(config, idEndpoint, genEndpoint) {
    this.config = config;
    this.idEndpoint = idEndpoint;
    this.genEndpoint = genEndpoint;
}

Base.prototype.getById = function(id, params, callback) {
    var untappdRequest;
    if (id instanceof Array) {
        params.ids = id.toString();
        params.client_id = this.config.client_id;
        params.client_secret = this.config.client_secret;
    }
}