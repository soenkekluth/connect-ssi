'use strict';

var SSI  = require('node-ssi');
var path = require('path');
var defaults = require('defaults');
var parseurl = require('parseurl');

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
    // This is for when we're mounted in a subdir in express, it strips the subdir from the file path.
    // For example:
    //
    //   app.use('/subdir', connectSSI({baseDir: __dirname + '/public'});
    //
    // Normally, a request for /subdir/index.shtml would try to load /public/subdir/index.shtml
    // With parseurl, it's correctly converted to /public/index.shtml.
    var url = parseurl(req).pathname;

    url = /\/$/.test(url) ? (url + 'index' + opt.ext) : url;

    if (!endsWith(url, opt.ext)) {
      return next();
    }

    var filePath = path.join(opt.baseDir, url);

    ssi.compileFile(filePath, function(err, content){
      if (err) {
        // let 404 errors pass on to the default 404 handler
        // but only for the file we were trying to load.
        // If err.path is different, then it means that there was an include that could not be found.
        if (err.code == 'ENOENT' && err.path == filePath) {
          return next();
        }
        // handle other errors here
        return next(err);
      }
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      res.end(content);
    });

  };
};
