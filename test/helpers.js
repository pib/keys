
/*!
 * Keys - Test Helpers
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var sys = require('sys'),
    Buffer = require('buffer').Buffer;

exports.test = function(exports, store, fn) {
    var name = store.constructor.name,
        fn = fn || function(){},
        pending = 0;

    // #set()
    ++pending;
    exports[name + '#set()'] = function(assert){
        store.set('foo', 'bar', function(err){
            assert.ok(!err, 'error in callback');
            --pending || fn();
        });
    };
    
    // #set() binary
    ++pending;
    exports[name + '#set() binary'] = function(assert){
        store.set('bin', new Buffer('foobar'), function(err){
            assert.ok(!err, 'error in callback');
            --pending || fn();
        });
    };
    
    // #get() binary
    ++pending;
    exports[name + '#get() binary'] = function(assert){
        store.set('bin-foo', new Buffer('foobar'), function(err){
            assert.ok(!err, 'error in callback');
            store.get('bin-foo', function(err, val){
                assert.ok(!err, 'error in second callback');
                assert.ok(val instanceof Buffer, name + '#get() Buffer failed');
                --pending || fn();
            });
        });
    };
    
    // #get()
    ++pending;
    exports[name + '#get()'] = function(assert){
        store.set('name', 'tj', function(err){
            assert.ok(!err, 'error in callback');
            store.get('name', function(err, name){
                assert.ok(!err, 'error in second callback');
                assert.equal('string', typeof name);
                assert.equal('tj', name);
                --pending || fn();
            });
        });
    };
    
    // #remove()
    ++pending;
    exports[name + '#remove()'] = function(assert){
        store.set('name', 'tj', function(err){
            assert.ok(!err, 'error in callback');
            store.remove('name', function(err){
                assert.ok(!err, 'error in second callback');
                store.get('name', function(err, name){
                    assert.ok(!name, '#remove() failed');
                    --pending || fn();
                });
            });
        });
    };
    
    // #has()
    ++pending;
    exports[name + ' #has()'] = function(assert){
        store.remove('email', function(){
            store.has('email', function(err, exists){
                assert.strictEqual(false, exists, '#has() was not false');
                store.set('email', 'tj@vision-media.ca', function(err){
                    store.has('email', function(err, exists){
                        assert.strictEqual(true, exists, '#has() was not true');
                        --pending || fn();
                    });
                });
            });
        });
    };
    
    // #length()
    ++pending;
    exports[name + ' #length()'] = function(assert){
        store.length(function(err, len){
            assert.ok(!err, 'error in callback');
            assert.equal('number', typeof len);
            --pending || fn();
        });
    };
    
    // #clear()
    ++pending;
    exports[name + ' #clear()'] = function(assert){
        setTimeout(function(){
            store.length(function(err, len){
                assert.ok(len > 0);
                store.clear(function(err){
                    assert.ok(!err, 'error in callback');
                    store.length(function(err, len){
                        assert.equal(0, len, '#clear() failed, got length of ' + len);
                        
                        // #each()
                        store.set('one', '1', function(){
                            store.set('two', '2', function(){
                                var keys = [],
                                    vals = [];
                                store.each(function(val, key){
                                    vals.push(val);
                                    keys.push(key);
                                }, function(err){
                                    assert.ok(!err, '#each() done got an error');
                                    assert.ok(keys.indexOf('one') >= 0);
                                    assert.ok(keys.indexOf('two') >= 0);
                                    assert.ok(vals.indexOf('1') >= 0);
                                    assert.ok(vals.indexOf('2') >= 0);
                                    --pending || fn();
                                });
                            });
                        });

                    });
                });
            });
        }, 200);
    };
    
    process.addListener('uncaughtException', fn);
};