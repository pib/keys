
/*!
 * Keys - nStore
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Store = require('nstore');

var nStore = module.exports = function nStore(options) {
    options = options || {};
    var path = options.path || process.cwd() + '/store.db';
    this.client = Store('/tmp/nstore.db');
};

nStore.prototype.get = function(key, fn){
    this.client.get(key, fn);
};

nStore.prototype.set = function(key, val, fn){
    this.client.save(key, val, fn);
};

nStore.prototype.remove = function(key, fn){
    this.client.remove(key, fn);
};

nStore.prototype.has = function(key, fn){
    this.client.get(key, function(err, val){
        fn(err, !!val);
    });
};

