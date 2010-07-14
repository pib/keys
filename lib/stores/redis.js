
/*!
 * Keys - Redis
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var redis = require('redis-client'),
    noop = function(){};

var Redis = module.exports = function Redis(options) {
    options = options || {};
    this.client = new redis.createClient(options.port, options.host, options);
};

Redis.prototype.get = function(key, fn){
    this.client.get(key, function(err, buf){
        fn(err, buf ? buf.toString() : buf);
    });
};

Redis.prototype.set = function(key, val, fn){
    this.client.set(key, val, fn || noop);
};

Redis.prototype.remove = function(key, fn){
    this.client.del(key, fn);
};

Redis.prototype.has = function(key, fn){
    this.client.exists(key, function(err, exists){
        fn(err, !!exists);
    });
};

Redis.prototype.length = function(fn){
    this.client.dbsize(fn);
};

Redis.prototype.clear = function(fn){
    this.client.flushdb(fn || noop);
};
