connect-ssi
===========

SSI (Server Side Includes) Middleware for connect


##Examples:
<pre>
// using gulp-connect:
gulp.task('connect', connect.server({
    root: ['app'],
    middleware: function() {
        return [connectSSI({
            baseDir: __dirname + '/app'
        })];
    }
}));
</pre>

more soon...
