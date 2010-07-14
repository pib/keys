
# Keys

 Unified interface for key/value store clients written for [node](http://nodejs.org).

## Supported Stores

Currently the following stores are supported:

  * Memory
  * [nStore](http://github.com/creationix/nStore)
  * [Redis](http://github.com/fictorial/redis-node-client)
  * [Riak](http://github.com/frank06/riak-js)

## API

  * `#get(key, callback)`         Fetches `key` -> `callback(err, val)`
  * `#set(key, val, callback)`    Sets `key` to `val` -> `callback(err)`
  * `#remove(key, callback)`      Removes `key` -> `callback(err)`
  * `#has(key, callback)`         Check if `key` exists -> `callback(err, exists)`
  * `#length(callback)`           Fetches number of keys -> `callback(err, len)`
  * `#expire(key, ms, callback)`  Expire `key` in `ms` -> `callback(err)`
  * `#clear(callback)`            Clears all keys -> `callback(err)`