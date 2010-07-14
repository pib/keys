
/**
 * Module dependencies.
 */

var helpers = require('./helpers'),
    Riak = require('keys').Riak;

var store = new Riak;
helpers.test(exports, store);