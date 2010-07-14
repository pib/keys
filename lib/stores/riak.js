
/*!
 * Keys - Riak
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var riak = require('riak-node');

var Riak = module.exports = function Riak(options) {
    options = options || {};
    options.debug = options.debug === undefined
        ? false
        : options.debug;
    this.client = new riak.Client(options);
    this.bucket = options.bucket || 'keys';
};

Riak.prototype.get = function(key, fn){
    this.client.get(this.bucket, key)(fn);
};

Riak.prototype.set = function(key, val, fn){
    this.client.save(this.bucket, key, val)(fn);
};

Riak.prototype.remove = function(key, fn){
    this.client.remove(this.bucket, key, fn);
};

Riak.prototype.has = function(key, fn){
    this.client.get(key, function(err, val){
        fn(err, !!val);
    });
};

Riak.prototype.length = function(fn){
    // this.client.dbsize(fn);
};

Riak.prototype.expire = function(key, ms, fn){
    // this.client.expire(key, ms, fn || noop);
};

Riak.prototype.clear = function(fn){
    this.client.removeAll(this.bucket)(fn);
};
