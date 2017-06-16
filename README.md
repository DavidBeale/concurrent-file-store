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
    .catch(console.error);


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

# Test
```shell
npm install
npm test
```
