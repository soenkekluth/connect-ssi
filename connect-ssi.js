module.exports = function connectSSI(opt) {

  'use strict';

  var ssi = require('ssi');
  var path = require('path');
  var fs = require('fs');

  var opt = opt || {};
  var ext = opt.ext || '.shtml';
  var baseDir = opt.baseDir || __dirname;
  var matcher = '/**/*' + ext;
  var parser = new ssi(baseDir, baseDir, matcher);


  return function(req, res, next) {

    var url = /\/$/.test(req.url) ? (req.url + 'index' + ext) : req.url;
    var filename = baseDir + url;

    if (url.indexOf(ext) > -1 && fs.existsSync(filename)) {

      var contents = parser.parse(filename, fs.readFileSync(filename, {
        encoding: 'utf8'
      })).contents;

      res.write(contents);
      next();

    } else {
      next();
    }

  };
};
