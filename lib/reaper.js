
/*!
 * Keys - Reaper
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

var Reaper = module.exports = function Reaper(store, options) {
    this.expires = {};
    this.store = store;
    this.timer = setInterval(function(self){
        self.reap(new Date);
    }, options.reapInterval || 60000 * 15, this);
};

Reaper.prototype.reap = function(threshold){
    var keys = Object.keys(this.expires),
        now = Date.now();
    for (var i = 0, len = keys.length; i < len; ++i) {
        var key = keys[i],
            time = this.expires[key];
        if (now >= time) {
            delete this.expires[key];
            this.store.remove(key);
        }
    }
};

Reaper.prototype.expire = function(key, ms){
    this.expires[key] = +new Date + ms;
};

Reaper.prototype.destroy = function(){
    clearInterval(this.timer);
};
