
/*!
 * Keys - Test Helpers
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

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
    
    // #get()
    ++pending;
    exports[name + '#get()'] = function(assert){
        store.set('name', 'tj', function(err){
            assert.ok(!err, 'error in callback');
            store.get('name', function(err, name){
                assert.ok(!err, 'error in second callback');
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
};