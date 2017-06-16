
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import fs from 'fs-extra';

import cfs from '../';

chai.use(chaiAsPromised);
const expect = chai.expect;


describe('create', () => {
    let store;

    beforeEach(() => {
        store = cfs('./store');
    });

    it('returns the obj with an id', () => {
        const result = store.create({
            count: 0
        });

        return Promise.all([
            expect(result).to.eventually.have.property('id'),
            expect(result).to.eventually.have.property('count')
        ]);
    });

    it('creates a file', () => {
        const result = store.create({
            count: 0
        });

        return expect(
            result.then(obj => fs.pathExists(`./store/${obj.id}.json`))
        ).to.eventually.equal(true);
    });
});
