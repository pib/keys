
/**
 * Module dependencies.
 */

var helpers = require('./helpers'),
    nStore = require('keys').nStore;

var store = new nStore({ path: '/tmp/nstore.db', reapInterval: 15 });
helpers.test(exports, store, function(){
    store.reaper.destroy();
});