
/**
 * Module dependencies.
 */

var keys = require('./../lib/keys');

var store = new keys.Memory({ reapInterval: 200 });

store.set('foo', 'bar', function(){
    store.set('bar', 'baz', function(){
        // Iterate
        store.each(function(val, key){
            console.log('%s: %s', key, val);
        }, function(){
            
            // Clear
            store.clear(function(){
                
                // Length
                store.length(function(err, len){
                    console.log('length: %d', len);
                    
                    // Expire
                    store.set('foo', 'bar', function(){
                        store.expire('foo', 3000);
                        setTimeout(function(){
                            store.has('foo', function(err, exists){
                                console.log('expired? %s', !exists);
                            });
                        }, 4000);
                    });
                });
            });
        });
    });
});