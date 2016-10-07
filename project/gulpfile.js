var gulp = require('gulp');
var concat = require('gulp-concat');
var header = require('gulp-header');
var connect = require("gulp-connect");
var less = require("gulp-less");
var autoprefixer = require('gulp-autoprefixer');
var ejs = require("gulp-ejs");
var uglify = require('gulp-uglify');
var ext_replace = require('gulp-ext-replace');
var cssmin = require('gulp-cssmin');
// var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var filter = require('gulp-filter');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var pkg = require("../package.json");

var banner = 
"/** \n\
* my-workflow" + pkg.version + " \n\
* By bhz\n\
* http://lihongxun945.github.io/jquery-weui/\n \
*/\n";

//有问题
// gulp.task('js', function(callback) {
//   return gulp.src('src/js/')
//       .pipe(named())
//       .pipe(webpack( require('./webpack.config.js') ))
//       .pipe(gulp.dest('dist/js'));
// });

// gulp.task('images', function() {
//   return gulp.src('src/images/**/*')
//       .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
//       .pipe(gulp.dest('dist/images'))
//       .pipe(notify({ message: 'Images task complete' }));
// });

// gulp.task('uglify', ["js"], function() {
//   return gulp.src(['./dist/js/*.js', '!./dist/js/*.min.js'])
//     .pipe(uglify({
//       preserveComments: "license"
//     }))
//     .pipe(ext_replace('.min.js'))
//     .pipe(gulp.dest('./dist/js'));
// });


gulp.task('less', function () {
  return gulp.src(['./src/style/*.less'])
  .pipe(less())
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(header(banner))
  .pipe(gulp.dest('./dist/style/'))
  .pipe(reload({stream:true}));
});

gulp.task('cssmin', ["less"], function () {
  gulp.src(['./dist/style/*.css', '!./dist/css/*.min.css'])
    .pipe(cssmin())
    .pipe(header(banner))
    .pipe(ext_replace('.min.css'))
    .pipe(gulp.dest('./dist/style/'))
    .pipe(reload({stream:true}));
});

gulp.task('ejs', function () {
  return gulp.src(["./src/*.html", "!./src/_*.html"])
    .pipe(ejs({}))
    .pipe(gulp.dest("./dist/"))
    .pipe(reload({stream:true}));
});

// gulp.task('copy', function() {
//   gulp.src(['./src/lib/**/*'])
//     .pipe(gulp.dest('./dist/lib/'));

//   gulp.src(['./style/*.css'])
//     .pipe(gulp.dest('./dist/style/'));
// });

gulp.task('watch', function () {
  // gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/style/**/*.less', ['less']);
  gulp.watch('src/*.html', ['ejs']);
  gulp.watch('dist/js/*.js').on('change',reload);
  // gulp.watch('src/style/*.css', ['copy']);
  // gulp.watch('src/images/**.*', ['images']);
});

gulp.task('server', ['watch'], function () {
  connect.server();
});

//browser-sync ../这个相对路径开头的资源无法引用
// 静态服务器
gulp.task('b', ['watch'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

// 代理

// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "你的域名或IP"
//     });
// });

gulp.task("default", ['cssmin', 'ejs']);
