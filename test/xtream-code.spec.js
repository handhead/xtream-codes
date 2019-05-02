var procreate = require("../lib")
var chai = require("chai"),
    expect = chai.expect;

describe("Xtream Code", function () {
    describe('say', function () {
        it('nothing', function () {
            expect(procreate.say()).to.be.an('undefined');
        });
        it('something', function () {
            expect(procreate.say("hi")).to.be.a('string');
        });
    });
});
