var Request = require('../request');

var BaseService = function(config, idEndpoint, genEndpoint) {
    this.config = config;
    this.idEndpoint = idEndpoint;
    this.genEndpoint = genEndpoint;
}

BaseService.prototype.getById = function(id, params, callback) {
    var untappdRequest;
    if (id instanceof Array) {
        params.ids = id.toString();
        params.client_id = this.config.client_id;
        params.client_secret = this.config.client_secret;
        this.executeRequest(this.getEndpoint, params, callback);
    } else {
        params.client_id = this.config.client_id;
        params.client_secret = this.config.client_secret;
        this.executeRequest(this.idEndpoint + '/' + id, params, callback);
    }
}

BaseService.prototype.find = function(params, callback) {
    params.client_id = this.config.client_id;
    params.client_secret = this.config.client_secret;
    this.executeRequest(this.genEndpoint, params, callback);
}

BaseService.prototype.executeRequest = function(endpoint, params, callback) {
    var baseRequest = this.createRequest(endpoint, params, this.config);
    baseRequest.makeRequest(callback);
}

BaseService.prototype.createRequest = function(endpoint, params, config) {
    return new Request(endpoint, params, config);
}

module.exports = BaseService;