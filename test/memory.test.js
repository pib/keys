
/**
 * Module dependencies.
 */

var helpers = require('./helpers'),
    Memory = require('keys').Memory;

var store = new Memory({ reapInterval: 15 });
helpers.test(exports, store, function(){
    store.reaper.destroy();
});