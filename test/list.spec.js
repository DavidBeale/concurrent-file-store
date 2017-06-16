
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import fs from 'fs-extra';

import cfs from '../';

chai.use(chaiAsPromised);
const expect = chai.expect;


describe('list', () => {
    let store;
    let id;

    beforeEach(() => {
        store = cfs('./store');

        return fs.emptyDir('./store')
            .then(() => store.create({
                count: 0
            }))
            .then((obj) => {
                id = obj.id;
            });
    });

    it('returns an array of object ids', () => {
        const result = store.list();

        return expect(result).to.become([id]);
    });
});
