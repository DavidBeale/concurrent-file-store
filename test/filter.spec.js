
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import fs from 'fs-extra';

import cfs from '../';

chai.use(chaiAsPromised);
const expect = chai.expect;


describe('filter', () => {
    let store;
    const objs = [];

    beforeEach(() => {
        store = cfs('./store');

        return fs.emptyDir('./store')
            .then(() => store.create({
                count: 0,
                name: 'Bob'
            }))
            .then(() => store.create({
                count: 4,
                name: 'Bob'
            }))
            .then((obj) => {
                objs.push(obj);
            })
            .then(() => store.create({
                count: 6,
                name: 'Bob'
            }))
            .then((obj) => {
                objs.push(obj);
            });
    });

    it('returns an array of objects', () => {
        const result = store.filter(obj => obj.name === 'Bob' && obj.count > 3);

        return expect(result).to.become(objs);
    });
});
