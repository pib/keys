
/*!
 * Keys - Riak
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca> and <francisco.treacy@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var riak = require('riak-js'),
    Buffer = require('buffer').Buffer;

/**
 * Check if `res` is an `Error`.
 * 
 * @return {Boolean}
 * @api private
 */
 
function getError(res) {
    if (res instanceof Error) {
        return res;
    }
};

/**
 * Bucket name.
 *
 * @type String
 */

var bucket;

/**
 * Initialize Riak store for a given bucket.
 *
 * Options:
 *
 *  - `port`    Optional port
 *  - `host`    Optional host
 *  - `bucket`  Bucket name
 *  - `debug`   Optional debugging output
 *  - ...       Other options passed to `Riak.getClient()`
 *
 * @param {Object} options
 * @api public
 */

var Riak = module.exports = function Riak(options) {
    if (!options || !options.bucket) throw new Error('Options must contain a bucket property.');
    bucket = options.bucket;
    if (options.debug === undefined) options.debug = false;
    this.client = riak.getClient(options);
};

/**
 * Set `key` to `val`, then callback `fn(err)`.
 *
 * @param {String} key
 * @param {String} val
 * @param {Function} fn
 * @api public
 */

Riak.prototype.set = function(key, val, fn){
    val = val instanceof Buffer
        ? val
        : new Buffer(val);
    this.client.save(bucket, key, val.toString('base64'))(function(res) {
        fn(getError(res));
    });
};

/**
 * Get `key`, then callback `fn(err, val)`.
 *
 * @param {String} key
 * @param {Function} fn
 * @api public
 */

Riak.prototype.get = function(key, fn){
    this.client.get(bucket, key)(function(res, meta) {
        fn(getError(res), meta.statusCode < 300 ? base64(res) : null);
    });
};

/**
 * Remove `key`, then callback `fn(err)`.
 *
 * @param {String} key
 * @param {Function} fn
 * @api public
 */

Riak.prototype.remove = function(key, fn){
    this.client.remove(bucket, key)(function(res) {
        fn(getError(res));
    });
};

/**
 * Check if `key` exists, callback `fn(err, exists)`.
 *
 * @param {String} key
 * @param {Function} fn
 * @api public
 */

Riak.prototype.has = function(key, fn){
    this.client.head(bucket, key)(function(response, meta) {
        fn(getError(response), meta.statusCode !== 404);
    });      
};

/**
 * Fetch number of keys, callback `fn(err, len)`.
 *
 * @param {Function} fn
 * @api public
 */

Riak.prototype.length = function(fn){
    this.client.count(bucket)(function(count) {
        fn(getError(count), count[0]);
    });
};

/**
 * Clear all keys, then callback `fn(err)`.
 *
 * @param {Function} fn
 * @api public
 */

Riak.prototype.clear = function(fn){
    this.client.removeAll(bucket)(function(res) {
        fn(getError(res));
    });
};

/**
 * Iterate with `fn(err, val, key)`, then `done()` when finished.
 *
 * Implementation note: riak-js adds documents as JSON by default -
 * As this "keys" impl does not assume any content-type and #getAll() returns raw data,
 * we have to JSON.parse the result
 *
 * @param {Function} fn
 * @param {Function} done
 * @api public
 */

Riak.prototype.each = function(fn, done){
    var self = this;
    this.client.getAll(bucket, { withId: true })(function(res) {
        var err = getError(res);
        if (err) {
            done && done(err);
        } else {
            for (var i = 0, len = res.length; i < len; ++i) {
                fn(base64(res[i][1]), res[i][0]);
            }
            done && done();
        }
    });
};

/**
 * Base64 the given `val`, split on NUL and return a `Buffer`.
 *
 * @param {String} val
 * @return {Buffer}
 * @api private
 */

function base64(val) {
    val = new Buffer(val, 'base64').toString();
    val = val.split('\0')[0];
    val = new Buffer(val);
    return val;
}