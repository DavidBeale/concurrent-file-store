# concurrent-file-store [![Build Status](https://travis-ci.org/bealearts/concurrent-file-store.png?branch=master)](https://travis-ci.org/bealearts/concurrent-file-store) [![npm version](https://badge.fury.io/js/concurrent-file-store.svg)](http://badge.fury.io/js/concurrent-file-store) [![Dependency Status](https://david-dm.org/bealearts/concurrent-file-store.png)](https://david-dm.org/bealearts/concurrent-file-store)

Multi-process safe simple data store, using the filesystem for storage


# Usage
```js
import cfs from 'concurrent-file-store';

const store = cfs('path/to/store/folder');

// Create a new object
store.create({
        count: 0;
    })
    .then(console.info)  // Object with id field
    .catch(console.error);


// Read an object
store.read('fg45f-342f')
    .then(console.info) // object
    .catch(console.error);


// Update an object
store.update('fg45f-342f')
    .then(obj => {
        return obj.count++;
    })
    .then(store.save)
    .catch(error => {
        console.error(error);
        store.free('fg45f-342f');
    });


// Delete an object
store.delete('fg45f-342f')
    .catch(console.error);


// List object ids
store.list()
    .then(console.info)  // Array of ids
    .catch(console.error);
```

# Install
```shell
npm install concurrent-file-store --save
```

# API

* `const store = new cfs(storePath[, options])` - Creates a store instance

    * `storePath` Path to a filesystem directory to contain the store's files

    Options
    * `idField`: `id` Property to use for the Identity property of each stored object
    * `idFunction`: `shortid.generate` Function used to generate a unique id for each object added to the store. `function(object)`
    * `lockTimeout`: `30000` How long (in miliseconds) an operation with wait to aquier a lock on an object. Locks are assumed to have expired after 10 * `lockTimeout`

    Returns a store instance (see below)

* `store.create(object)` - Creates an object in the store, giving it a unique Identity property
    
    * `object` A JSON serialisable object to save in the store
    
    Returns a Promise with the stored object with the added Identity property

* `store.read(id)`  - Reads an object from the store

    * `id`  The Identity property value for the object to retrive
    
    Returns a Promise with the stored object
    
* `store.update(id)` - Update an object in the store

    * `id`  The Identity property value for the object to update
    
    Returns a Promise with the stored object, to be used with `save` or `free`

* `store.save(object)` - Used with `update` to save an updated object

    * `object` A JSON serialisable object to save in the store
    
    Returns a Promise with the stored object

* `store.free(id)` - Used with `update` to release a lock on an object

    * `id`  The Identity property value for the object to free
    
    Returns a Promise

* `store.delete(id)` - Delete an object from the store

    * `id`  The Identity property value for the object to delete
    
    Returns a Promise

* `store.list()` - List the Identity values of all the objects in the store

    Returns a Promise with an array of object Indentities

# Test
```shell
npm install
npm test
```
