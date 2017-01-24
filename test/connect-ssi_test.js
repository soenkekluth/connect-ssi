/*global describe,it*/
var fs = require('fs'),
    request = require('supertest'),
    assert = require('assert'),
    express = require('express'),
    connectSSI = require('../lib/connect-ssi.js');

describe('connect-ssi', function() {

    var app = express();

    app.use('/', connectSSI({
        baseDir: __dirname + '/fixtures', // this file gets red and executed one level higher :/
        ext: '.html',
        payload: {
            title: 'Kitty',
            mqtt: 10
        }
    }));

    app.ERR_404 = 'custom 404 error';
    app.use("/", function(req, res) {
        res.status(404).send(app.ERR_404);
    });

    it("should serve up matching files with SSI instructions executed", function(done) {
        request(app)
            .get('/index.html')
            .expect(200)
            // this part was hijacked from node-ssi's tests
            .expect(/Kitty/) //from payload
            .expect(/<nav>/) //from header.html
            .expect(/Download/) //from menu.html
            .expect(/MQTT/) //from payload not equal
            //check a series of special chars
            .expect(/\\v/)
            .expect(/\\r/)
            .expect(/\\f/)
            .expect(/\\t/)
            .expect(/\\b/)
            .expect(/\\n/)
            .expect(/\\u/)
            .expect(/&#8226;/)
            .expect(/&amp;/)
            .end(done);
    });


    it("should serve index.{ext} as a default", function(done) {
        request(app)
            .get('/')
            .expect(200)
            // this part was hijacked from node-ssi's tests
            .expect(/Kitty/) //from payload
            .expect(/<nav>/) //from header.html
            .end(done);
    });


    it("should serve up matching files as-is if there are no SSI instructions", function(done) {
        request(app)
            .get('/empty.html')
            .expect(200)
            // note: express always serves up files with \n, but git on windows checks files out with \r\n by default
            .expect(fs.readFileSync(__dirname + '/fixtures/empty.html').toString().replace(/\r/g, ''))
            .end(done);
    });

    it("should allow requests to continue onto other middleware if the extension matches but the file does not exist", function(done) {
        request(app)
            .get('/404.html')
            .expect(404)
            .expect(app.ERR_404)
            .end(done);
    });

    it("should NOT serve files that don't match the extension (even if they exist)", function(done) {
        request(app)
            .get('/empty.txt')
            .expect(404)
            .expect(app.ERR_404)
            .end(done);
    });

    it('should set a Content-Type header', function(done) {
        request(app)
            .get('/index.html')
            .expect(200)
            .expect('content-type', 'text/html; charset=UTF-8')
            .end(done);
    });

});
