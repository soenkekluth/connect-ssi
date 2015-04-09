connect-ssi
===========

SSI (Server Side Includes) Middleware for [Connect] and [Express]

## Install

    npm install connect-ssi

## Examples

### In your .shtml file

Uses [node-ssi] under the hood, supports all of the following:


    <!--# include file="path" -->

    <!--# set var="k" value="v" -->

    <!--# echo var="n" default="default" -->

    <!--# if expr="test" -->
    <!--# elif expr="" -->
    <!--# else -->
    <!--# endif -->

Next, wire it up to Connect or Express like so:

### Using [gulp-connect]

    gulp.task('connect', connect.server({
        root: ['app'],
        middleware: function() {
            return [connectSSI({
                baseDir: __dirname + '/app'
            })];
        }
    }));


### Using [Express]
    var connectSSI = require('connect-ssi')
    app.use(connectSSI({
        baseDir: __dirname + '/public'
    }));

### Using [grunt-contrib-connect] version 0.9.0 or greater
    var connectSSI = require('connect-ssi');
    
and then inside the `grunt.initConfig`
    
    connect: {
        options: {
            middleware: function(connect, options, middlewares) {
				if (!Array.isArray(options.base)) {
					options.base = [options.base];
				}
				var directory = options.directory || options.base[options.base.length - 1];

				middlewares.unshift(connectSSI({
					baseDir: directory,
					ext: '.html'
				}));                
                return middlewares;
            }
        }
    }

## Configuration

    {
        ext: '.shtml', // file extension. Only urls ending in this will be evaluated.
        baseDir: __dirname // base path to look in for files
    }

All config options are passed to [node-ssi] so,any additional options that it supports
(such as `payload`) may be added to the configuration object.

[Connect]: http://senchalabs.github.com/connect
[Express]: http://expressjs.com/
[grunt-contrib-connect]: https://github.com/gruntjs/grunt-contrib-connect
[gulp-connect]: https://github.com/avevlad/gulp-connect
[node-ssi]: https://github.com/yanni4night/node-ssi
