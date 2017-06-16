
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import cfs from '../';

chai.use(chaiAsPromised);
const expect = chai.expect;


describe('read', () => {
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
});
