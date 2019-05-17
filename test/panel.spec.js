var Panel = require("../lib").Panel
var chai = require("chai"),
    expect = chai.expect;

const dotenv = require('dotenv').config({ path: '.env.test' });
if (dotenv.error) { throw dotenv.error }

describe("Xtream Code Panel", () => {
    let panel = null;
    describe('Instance', () => {
        it('is an function', () => {
            expect(Panel).to.be.an('function');
        });
        it('empty', () => {
            var empty = new Panel();
            expect(empty).to.be.an.instanceof(Panel);
            expect(empty).to.have.property('url', undefined);
            expect(empty).to.have.property('key', undefined);
        });
        it('new', () => {
            panel = new Panel(process.env.URL, process.env.KEY);
            expect(panel).to.be.an.instanceof(Panel);
            expect(panel).to.have.property('url', process.env.URL);
            expect(panel).to.have.property('key', process.env.KEY);
        });
    });

    describe('Line', () => {
        let line = {
            username: 'vinicius',
            password: 'vini1234',
            max_connections: 2,
            exp_date: parseInt(Date.now() / 1000) + 120,
            bouquet: [1],
        };
        it('new empty', () => {
            expect(panel.newLine({})).to.be.an('error');
        });
        it('new with success', done => {
            panel.newLine(line)
                .then(created => {
                    expect(created).to.be.an('object');
                    expect(created.result).to.be.true;
                    expect(created).to.have.property('created_id');
                    expect(created).to.have.property('username', line.username);
                    expect(created).to.have.property('password', line.password);
                    done();
                }).catch((error) => done(error));
        });
        it('new with duplicity', done => {
            panel.newLine(line)
                .then(duplicated => {
                    expect(duplicated).to.be.an('object');
                    expect(duplicated.result).to.be.false;
                    expect(duplicated).to.have.property('error', 'EXISTS');
                    done();
                }).catch((error) => done(error));
        });
        // it('delete', done => {
        //     panel.deleteLine(line)
        //         .then(deleted => {
        //             expect(deleted).to.be.an('object');
        //             expect(deleted.result).to.be.true;
        //             done();
        //         }).catch((error) => done(error));
        // });
    });
});
