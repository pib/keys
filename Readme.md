
# Keys

 Unified interface for [node](http://nodejs.org) key/value stores.

## Supported Stores

Currently the following stores are supported:

  * Memory
  * [nStore](http://github.com/creationix/nStore) 
  * [Redis](http://github.com/fictorial/redis-node-client)

Stores which do not natively support expiration utilize the `Reaper`.

## API

    #get(key, callback)         Fetches key -> callback(err, val)
    #set(key, val, callback)    Sets key to val -> callback(err)
    #remove(key, callback)      Removes key -> callback(err)
    #has(key, callback)         Check if key exists -> callback(err, exists)
    #length(callback)           Fetches number of keys -> callback(err, len)
    #clear(callback)            Clears all keys -> callback(err)

## Testing

Run all tests:

	$ make test

Run specific test(s):

	$ make test TESTS=test/memory.test.js

Setup to run all tests:

	$ redis-server &
