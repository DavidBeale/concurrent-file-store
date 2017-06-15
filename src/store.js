import shortid from 'shortid';
import fs from 'fs-extra';
import path from 'path';


const defaultOptions = {
    idField: 'id',
    idFunction: shortid.generate,
    lockTimeout: 30
};

export default function store(folder, options) {
    const opts = { ...defaultOptions, ...options };
    const getPath = id => path.join(folder, `${id}.json`);
    
    return {
        create(obj) {
            const clone = { ...obj, ...{[opts.idField]: opts.idFunction()} };
            const path = getPath(clone[opts.idField]);
            
            return fs.ensureFile(path)
                .then(() => fs.writeJson(path, clone, { spaces: 2 }))
                .then(() => clone);
        },
        
        read(id) {
            const path = getPath(id);
            
            // TODO: read lock
            return fs.readJson(path)
                .then(obj => {
                    // TODO: release lock
                    return obj;
                });
        },
        
        update(id) {
            
        },
        
        save(obj) {
            
        },
        
        delete(id) {
            const path = getPath(id);
            
            // TODO: write lock
            return fs.remove(path)
                .then(() => {
                    // TODO: release lock
                });
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