module.exports = function connectSSI(opt) {

    'use strict';

    var ssi = require("ssi");
    var path = require("path");
    var fs = require("fs");

    var opt = opt || {};
    var baseDir = opt.baseDir || __dirname;
    var parser = new ssi(__dirname, baseDir, baseDir);


    return function(req, res, next) {

        var url = req.url === '/' ? '/index.shtml' : req.url;
        var filename = baseDir + url;

        if (fs.existsSync(filename) && url.indexOf('.shtml') > -1) {

            var contents = parser.parse(filename, fs.readFileSync(filename, {
                encoding: 'utf8'
            })).contents;

            res.writeHead(200, {
                "Content-Type": 'text/html'
            });
            res.end(contents);
        } else {
            next();
        }
    };
};
