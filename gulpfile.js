var gulp = require("gulp");
var include = require('gulp-html-tag-include');

gulp.task('html', function () {
    // construct all html files
    return gulp.src(['./html/**'])
        .pipe(include())
        .pipe(gulp.dest('./dist/'));
});

/*
gulp.task('popper', function () {
    // copy popper dist files
    return gulp.src(['./node_modules/popper.js/dist/popper.min.js'])
        .pipe(include())
        .pipe(gulp.dest('./lib/popper/'));
});
*/

gulp.task('default', gulp.series('html'));
