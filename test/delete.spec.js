
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import fs from 'fs-extra';

import cfs from '../';

chai.use(chaiAsPromised);
const expect = chai.expect;


describe('delete', () => {
    let store;
    let id;

    beforeEach(() => {
        store = cfs('./store');

        return store.create({
            count: 0
        })
            .then((obj) => {
                id = obj.id;
            });
    });

    it('deletes the obj with an id', () => {
        const result = store.delete(id);

        return expect(
            result
                .then(() => store.read(id))
        ).to.be.rejectedWith(Error);
    });

    it('deletes the file', () => {
        const result = store.delete(id);

        return expect(
            result.then(() => fs.pathExists(`./store/${id}.json`))
        ).to.eventually.equal(false);
    });
});
