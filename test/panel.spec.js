var Panel = require("../lib").Panel
var chai = require("chai"),
    expect = chai.expect;

const dotenv = require('dotenv').config({ path: '.env.test' });
if (dotenv.error) { throw dotenv.error }

describe("Xtream Code Panel", function () {
    let panel = null;
    describe('Instance', function () {
        it('is an function', function () {
            expect(Panel).to.be.an('function');
        });
        it('empty', function () {
            var empty = new Panel();
            expect(empty).to.be.an.instanceof(Panel);
            expect(empty).to.have.property('url', undefined);
            expect(empty).to.have.property('key', undefined);
        });
        it('new', function () {
            panel = new Panel(process.env.URL, process.env.KEY);
            expect(panel).to.be.an.instanceof(Panel);
            expect(panel).to.have.property('url', process.env.URL);
            expect(panel).to.have.property('key', process.env.KEY);
        });
    });

    describe('Line', function () {
        let line = {
            username: 'vinicius',
            password: 'vinicius123',
            max_connections: 1,
            is_restreamer: false,
            exp_date: parseInt(Date.now() / 1000) + 10,
            bouquet: [1],
        };
        it('new empty', function () {
            expect(panel.newLine({})).to.be.an('error');
        });
        it('new with success', function (done) {
            const created = panel.newLine(line);
            expect(created).to.be.an('object');
            expect(created.result).to.be.true;
            // .then(created => {
            //     expect(created).to.be.an('object');
            //     expect(created.result).to.be.true;
            //     done();
            // });
        });
    });
});
