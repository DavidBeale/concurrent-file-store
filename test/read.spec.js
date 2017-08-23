
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import fs from 'fs-extra';

import cfs from '../';

chai.use(chaiAsPromised);
const expect = chai.expect;


describe('read', () => {
    let store;
    let id;

    beforeEach(() => {
        store = cfs('./store', {
            lockTimeout: 500
        });

        return store.create({
            count: 0
        })
            .then((obj) => {
                id = obj.id;
            });
    });

    it('returns an obj for an id', () => {
        const result = store.read(id);

        return Promise.all([
            expect(result).to.eventually.have.property('id'),
            expect(result).to.eventually.have.property('count')
        ]);
    });

    it('returns an error if object is not in the store', () => {
        const result = store.read('not-real');

        return expect(
            result
        ).to.be.rejectedWith(Error);
    });

    it('should fail if a lock is not cleared in time', () => {
        const result = fs.writeFile(`./store/${id}.lock`, '')
            .then(() => store.read(id));


        return expect(result).to.be.rejectedWith(Error);
    });

    it('Waits for a lock to clear', () => {
        const result = fs.writeFile(`./store/${id}.lock`, '')
            .then(() => store.read(id));

        setTimeout(() => {
            fs.remove(`./store/${id}.lock`);
        }, 400);

        return expect(result).to.eventually.have.property('id');
    });
});
