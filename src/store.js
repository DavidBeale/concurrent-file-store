import shortid from 'shortid';
import fs from 'fs-extra';
import path from 'path';
import pify from 'pify';
import lockfile from 'lockfile';

const defaultOptions = {
    idField: 'id',
    idFunction: shortid.generate,
    lockTimeout: 30,
    cacheLimit: Infinity
};


export default function store(folder, options) {
    const opts = { ...defaultOptions, ...options };

    const getPath = id => path.join(folder, `${id}.json`);
    const lock = pify((id, callback) => lockfile.lock(path.join(folder, `${id}.lock`), {}, callback));
    const unlock = pify((id, callback) => lockfile.unlock(path.join(folder, `${id}.lock`), callback));

    return {
        create(obj) {
            const clone = { ...obj, ...{ [opts.idField]: opts.idFunction() } };
            const objPath = getPath(clone[opts.idField]);

            return fs.ensureFile(objPath)
                .then(() => fs.writeJson(objPath, clone, { spaces: 2 }))
                .then(() => clone);
        },


        read(id) {
            const objPath = getPath(id);

            return lock(id)
                .then(() => fs.readJson(objPath))
                .then(obj => unlock(id)
                    .then(() => obj));
        },


        update(id) {
            const objPath = getPath(id);

            return lock(id)
                .then(() => fs.readJson(objPath));
        },


        save(obj) {
            const id = obj[opts.idField];
            const objPath = getPath(id);

            return fs.writeJson(objPath, obj, { spaces: 2 })
                .then(() => unlock(id)
                    .then(() => obj));
        },


        delete(id) {
            const objPath = getPath(id);

            return lock(id)
                .then(() => fs.remove(objPath))
                .then(() => unlock(id));
        },


        list() {
            return fs.readdir(folder)
                .then(files => files.reduce((result, file) => {
                    const parts = path.parse(file);
                    if (parts.ext === '.json') {
                        result.push(parts.name);
                    }
                    return result;
                }, []));
        }
    };
}
