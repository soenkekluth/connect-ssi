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

## Configuration

    {
        ext: '.shtml', // file extension. Only urls ending in this will be evaluated.
        baseDir: __dirname // base path to look in for files
    }

All config options are passed to [node-ssi] so,any additional options that it supports
(such as `payload`) may be added to the configuration object.

[Connect]: http://senchalabs.github.com/connect
[Express]: http://expressjs.com/
[gulp-connect]: https://github.com/avevlad/gulp-connect
[node-ssi]: https://github.com/yanni4night/node-ssi
