var gulp = require('gulp');

gulp.task('default');
setTimeout(function() {
    gulp.run('js')
    // gulp.run('browser-sync')
}, 1);


gulp.task('js', function() {
    var rename = require('gulp-rename');
    var uglify = require('gulp-uglify');

    gulp.src('wu.tmpl.js')
        .pipe(uglify({
            preserveComments: 'license'
        }))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('.'));

})

// 浏览器实时刷新
// browser-sync start --server --files "**/*.css, **/*.html"
var browserSync = require('browser-sync').create();
gulp.task('browser-sync', function() {
    browserSync.init({
        // open: 'ui',
        files: ['**/*.css', '**/*.html'],
        server: {},
    });
    // gulp.watch(['**/*.js'], function() {
    //     console.log('js changed..');
    //     browserSync.reload();
    // })
});