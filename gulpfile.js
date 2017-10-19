var gulp = require('gulp')
    , sass = require('gulp-sass')
    , browserSync = require('browser-sync').create()
    , concat = require("gulp-concat")
    , uglify = require("gulp-uglifyjs")
    , cssnano = require('gulp-cssnano')
    , rename = require('gulp-rename')
    , imagemin = require('gulp-imagemin')
    , pngquant = require('imagemin-pngquant')
    , cache = require('gulp-cache')
    , autoprefixer = require('gulp-autoprefixer')
    , spritesmith = require('gulp.spritesmith')
    , rimraf = require('rimraf')
    , pug = require('gulp-pug')
    , sourcemaps = require('gulp-sourcemaps');
/* -------- JS  -------- */
gulp.task('js',function(){
    return gulp.src([
        'source/js/form.js',
        'source/js/main.js',
        'source/js/navigation.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});


/* -------- Server  -------- */
gulp.task('server', function () {
    browserSync.init({
        server: {
            port: 9000
            , baseDir: "build"
        }
    });
    gulp.watch('build/**/*').on('change', browserSync.reload);
});
gulp.task('templates:compile', function buildHTML() {
    return gulp.src('source/template/index.pug').pipe(pug({
        pretty: true
    })).pipe(gulp.dest('build'));
});
gulp.task('styles:compile', function () {
    return gulp.src('source/styles/main.scss').pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError)).pipe(rename('main.min.css')).pipe(gulp.dest('build/css'));
});
gulp.task('sprite', function (cb) {
    const spriteData = gulp.src('source/images/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png'
        , imgPath: '../images/sprite.png'
        , cssName: 'sprite.scss'
    }));
    spriteData.img.pipe(gulp.dest('build/images/'));
    spriteData.css.pipe(gulp.dest('source/styles/global/'));
    cb();
});
/* ------------ Delete ------------- */
gulp.task('clean', function del(cb) {
    return rimraf('build', cb);
});
gulp.task('copy:fonts', function () {
    return gulp.src('source/fonts/**/*.*').pipe(gulp.dest('build/fonts'));
});
gulp.task('copy:images', function () {
    return gulp.src('source/images/**/*.*').pipe(gulp.dest('build/images'));
});
/* ------------ Copy ------------- */
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));
/* ------------ Watchers ------------- */
gulp.task('watch', function () {
    gulp.watch('source/template/**/*.pug', gulp.series('templates:compile'));
    gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile')),
    gulp.watch('source/js/**/*.js',
    gulp.series('js'));
});
gulp.task('default', gulp.series('clean', gulp.parallel('templates:compile', 'styles:compile','js', 'sprite', 'copy'), gulp.parallel('watch', 'server')));