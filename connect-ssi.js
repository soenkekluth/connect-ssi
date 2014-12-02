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

  // second parameter in indexOf tells it to skip ahead to the end of the string instead of checking the entire thing
  // http://stackoverflow.com/questions/280634/endswith-in-javascript
  function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }


  return function(req, res, next) {

    var url = /\/$/.test(req.url) ? (req.url + 'index' + ext) : req.url;
    var filename = baseDir + url;


    if (!endsWith(url, ext)) {
      return next();
    }

    fs.exists(filename, function(exists) {

      if (!exists) {
        return next();
      }

      fs.readFile(filename, {
        encoding: 'utf8'
      }, function(err, raw) {
        if (err) {
          return next(err);
        }

        var contents = parser.parse(filename, raw).contents;
        res.end(contents);

      });

    });

  };
};
