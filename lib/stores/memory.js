
/*!
 * Keys - Memory
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

var Memory = module.exports = function Memory(options) {
    var self = this;
    options = options || {};
    this.data = options.data || {};
    this.expires = {};
    this.reaper = setInterval(function(){
        self.reap(new Date);
    }, options.reapInterval || 60000 * 15);
};

Memory.prototype.reap = function(threshold){
    var keys = Object.keys(this.expires),
        now = Date.now();
    for (var i = 0, len = keys.length; i < len; ++i) {
        var key = keys[i],
            time = this.expires[key];
        if (now >= time) {
            delete this.expires[key];
            delete this.data[key];
        }
    }
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
    this.expires[key] = +new Date + ms;
    fn && fn();
};


