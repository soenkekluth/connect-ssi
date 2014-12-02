connect-ssi
===========

SSI (Server Side Includes) Middleware for [Connect] and [Express]

## Install

    npm install connect-ssi

## Examples

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


[Connect]: http://senchalabs.github.com/connect
[Express]: http://expressjs.com/
[gulp-connect]: https://github.com/avevlad/gulp-connect
