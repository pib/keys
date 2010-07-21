
/*!
 * Keys - nStore
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Store = require('nstore');

/**
 * Initialize nStore ... store.
 *
 * Options:
 *
 *  - `path`  Path to database, defaults to CWD/store.db
 *
 * @param {Object} options
 * @api public
 */

var nStore = module.exports = function nStore(options) {
    options = options || {};
    var path = options.path || process.cwd() + '/store.db';
    this.client = Store(path);
};

/**
 * Set `key` to `val`, then callback `fn(err)`.
 *
 * @param {String} key
 * @param {String} val
 * @param {Function} fn
 * @api public
 */

nStore.prototype.get = function(key, fn){
    this.client.get(key, fn);
};

/**
 * Get `key`, then callback `fn(err, val)`.
 *
 * @param {String} key
 * @param {Function} fn
 * @api public
 */

nStore.prototype.set = function(key, val, fn){
    this.client.save(key, val, fn);
};

/**
 * Remove `key`, then callback `fn(err)`.
 *
 * @param {String} key
 * @param {Function} fn
 * @api public
 */

nStore.prototype.remove = function(key, fn){
    this.client.remove(key, fn);
};

/**
 * Check if `key` exists, callback `fn(err, exists)`.
 *
 * @param {String} key
 * @param {Function} fn
 * @api public
 */

nStore.prototype.has = function(key, fn){
    this.client.get(key, function(err, val){
        fn(err, !!val);
    });
};

/**
 * Fetch number of keys, callback `fn(err, len)`.
 *
 * @param {Function} fn
 * @api public
 */

nStore.prototype.length = function(fn){
    fn(null, this.client.length);
};

/**
 * Clear all keys, then callback `fn(err)`.
 *
 * @param {Function} fn
 * @api public
 */

nStore.prototype.clear = function(fn){
    this.client.clear();
    fn && fn();
};

/**
 * Iterate with `fn(err, val, key)`, then `done()` when finished.
 *
 * @param {Function} fn
 * @param {Function} done
 * @api public
 */

nStore.prototype.each = function(fn, done){
    var stream = this.client.stream();
    stream.addListener('data', function(doc, meta){
        fn(doc, meta.key);
    });
    stream.addListener('end', function(){
        done && done();
    });
};