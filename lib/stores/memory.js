
/*!
 * Keys - Memory
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

var Memory = module.exports = function Memory() {
    this.data = {};
};

Memory.prototype.set = function(key, val, fn){
    this.data[key] = val;
    fn && fn();
};

Memory.prototype.get = function(key, fn){
    fn(null, this.data[key]);
};

Memory.prototype.del = function(key, fn){
    delete this.data[key];
    fn && fn();
};
