import shortid from 'shortid';
import fs from 'fs-extra';
import path from 'path';


const defaultOptions = {
    idField: 'id',
    idFunction: shortid.generate
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
            
            return fs.readJson(path);
        },
        
        update(id) {
            
        },
        
        save(obj) {
            
        },
        
        delete(id) {
            
        },
        
        list() {
            
        }
    };
}