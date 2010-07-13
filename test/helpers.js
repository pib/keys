
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
    exports[name + '#set()'] = function(assert, beforeExit){
        var called = 0;

        store.set('foo', 'bar', function(err){
            ++called;
            assert.ok(!err, 'error in callback');
            --pending || fn();
        });

        beforeExit(function(){
            assert.equal(1, called);
        });
    };
    
    // #get()
    ++pending;
    exports[name + '#get()'] = function(assert, beforeExit){
        var called = 0;

        store.set('name', 'tj', function(err){
            ++called;
            assert.ok(!err, 'error in callback');
            store.get('name', function(err, name){
                ++called;
                assert.ok(!err, 'error in second callback');
                assert.equal('tj', name);
                --pending || fn();
            });
        });

        beforeExit(function(){
            assert.equal(2, called);
        });
    };
    
    // #del()
    ++pending;
    exports[name + '#del()'] = function(assert, beforeExit){
        var called = 0;

        store.set('name', 'tj', function(err){
            ++called;
            assert.ok(!err, 'error in callback');
            store.del('name', function(err){
                ++called;
                assert.ok(!err, 'error in second callback');
                store.get('name', function(err, name){
                    ++called;
                    assert.ok(!name, '#del() failed');
                    --pending || fn();
                });
            });
        });

        beforeExit(function(){
            assert.equal(3, called);
        });
    };
    
    // #has()
    ++pending;
    exports[name + ' #has()'] = function(assert, beforeExit){
        var called = 0;

        store.del('email', function(){
            ++called;
            store.has('email', function(err, exists){
                ++called;
                assert.strictEqual(false, exists, '#has() was not false');
                store.set('email', 'tj@vision-media.ca', function(err){
                    ++called;
                    store.has('email', function(err, exists){
                        ++called;
                        assert.strictEqual(true, exists, '#has() was not true');
                        --pending || fn();
                    });
                });
            });
        });

        beforeExit(function(){
            assert.equal(4, called);
        });
    };
};