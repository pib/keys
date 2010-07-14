
/*!
 * Keys - Memory
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Reaper = require('./../reaper');

var Memory = module.exports = function Memory(options) {
    var self = this;
    options = options || {};
    this.data = options.data || {};
    this.reaper = new Reaper(this, options);
};

Memory.prototype.set = function(key, val, fn){
    this.data[key] = val;
    fn && fn();
};

Memory.prototype.get = function(key, fn){
    fn(null, this.data[key]);
};

Memory.prototype.remove = function(key, fn){
    delete this.data[key];
    fn && fn();
};

Memory.prototype.has = function(key, fn){
    fn(null, key in this.data);
};

Memory.prototype.length = function(fn){
    fn(null, Object.keys(this.data).length);
};

Memory.prototype.clear = function(fn){
    this.data = {};
    fn && fn();
};

Memory.prototype.expire = function(key, ms, fn){
    this.reaper.expire(key, ms);
    fn && fn();
};


