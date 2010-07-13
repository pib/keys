
/*!
 * Keys - Test Helpers
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

exports.test = function(exports, store) {
    var name = store.constructor.name;

    // #set()
    exports[name + '#set()'] = function(assert, beforeExit){
        var called = 0;

        store.set('foo', 'bar', function(err){
            ++called;
            assert.ok(!err, 'error in callback');
        });

        beforeExit(function(){
            assert.equal(1, called);
        });
    };
    
    // #get()
    exports[name + '#get()'] = function(assert, beforeExit){
        var called = 0;

        store.set('name', 'tj', function(err){
            ++called;
            assert.ok(!err, 'error in callback');
            store.get('name', function(err, name){
                ++called;
                assert.ok(!err, 'error in second callback');
                assert.equal('tj', name);
            });
        });

        beforeExit(function(){
            assert.equal(2, called);
        });
    };
    
    // #del()
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
                });
            });
        });

        beforeExit(function(){
            assert.equal(3, called);
        });
    };
};