
/*!
 * Keys - Redis
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var redis = require('redis-client');

var Redis = module.exports = function Redis(options) {
    options = options || {};
    this.client = new redis.createClient(options.port, options.host, options);
};

Redis.prototype.get = function(key, fn){
    this.client.get(key, fn);
};

Redis.prototype.set = function(key, val, fn){
    this.client.set(key, val, fn);
};

Redis.prototype.del = function(key, fn){
    this.client.del(key, fn);
};
