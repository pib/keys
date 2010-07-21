
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
    this.client = Store(path);
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

nStore.prototype.length = function(fn){
    fn(null, this.client.length);
};

nStore.prototype.clear = function(fn){
    this.client.clear();
    fn && fn();
};

nStore.prototype.each = function(fn, done){
    var stream = this.client.stream();
    stream.addListener('data', function(doc, meta){
        fn(doc, meta.key);
    });
    stream.addListener('end', function(){
        done && done();
    });
};