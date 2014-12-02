'use strict';

var SSI  = require('node-ssi');
var path = require('path');
var defaults = require('defaults');

module.exports = function connectSSI(opt) {

  opt = defaults(opt, {
    baseDir: '.',
    ext: '.shtml'
    // all options are passed to node-ssi, see https://github.com/yanni4night/node-ssi for other options
  });

  var ssi = new SSI(opt);

  // second parameter in indexOf tells it to skip ahead to the end of the string instead of checking the entire thing
  // http://stackoverflow.com/questions/280634/endswith-in-javascript
  function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }


  return function(req, res, next) {

    var url = /\/$/.test(req.url) ? (req.url + 'index' + opt.ext) : req.url;


    if (!endsWith(url, opt.ext)) {
      return next();
    }

    ssi.compileFile(opt.baseDir + url, function(err, content){
      if (err) {
        // let 404 errors pass on to the default 404 handler
        if (err.code == 'ENOENT') {

          return next();
        }
        // handle other errors here
        return next(err);
      }
      res.end(content);
    });

  };
};
