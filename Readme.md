
# Keys

 Unified interface for [node](http://nodejs.org) key/value stores.

## Supported Stores

Currently the following stores are supported:

  * Memory -- no dependency
  * [nStore](http://github.com/creationix/nStore) -- requires _nstore_
  * [Redis](http://github.com/fictorial/redis-node-client) -- requires _redis-client_

Stores that specify "requires MODULE" must have the **MODULE** available to `require()`.

## API

### Store#get(key, callback)

 Fetches the given _key_ and `callback(err, val)`.

### Store#set(key, val[, callback])

 Sets _key_ to _val_ and `callback(err)`.

### Store#remove(key[, callback])

 Removes _key_ and `callback(err)`.

### Store#has(key, callback)

 Checks if _key_ exists and `callback(err, exists)`.

### Store#length(callback)

 Fetches the number of keys stored and `callback(err, len)`.

### Store#clear([callback])

 Clears the store and `callback(err)`.

## Testing

Run all tests:

	$ make test

Run specific test(s):

	$ make test TESTS=test/memory.test.js

Setup to run all tests:

	$ redis-server &
