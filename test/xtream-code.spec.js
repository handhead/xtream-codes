var Panel = require("../lib").Panel
var chai = require("chai"),
    expect = chai.expect;

describe("Xtream Code", function () {
    describe('Instance', function () {
        it('is an function', function () {
            expect(Panel).to.be.an('function');
        });
        it('empty', function () {
            var empty = new Panel();
            expect(empty).to.be.an.instanceof(Panel)
                .and.to.have.property('url', undefined)
                .and.to.have.property('key', undefined);
        });
        it('new', function () {
            // http://179.124.136.19:8000/api.php?action=user&sub=create
            // username
            // password
            // max_connections
            // is_restreamer
            // exp_date
            // bouquet
            // api_pass

            var panel = new Panel('http://179.124.136.19:8000', 'handhead@2019');
            expect(panel).to.be.an.instanceof(Panel)
                .and.to.have.property('url', 'http://179.124.136.19:8000')
                .and.to.have.property('key', 'handhead@2019');
        });
    });


});
