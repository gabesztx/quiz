const gulp              = require('gulp');
const less              = require('gulp-less');
const minifyCss         = require('gulp-minify-css');
const watch             = require('gulp-watch');
const livereload        = require('gulp-livereload');
const gulpWebpack       = require('gulp-webpack');
const concat            = require('gulp-concat');

const sourceJs          = './static/js';
const sourceLess        = './static/less/';
const target            = './dist';

const targetWebpackFile = require('./static/webpack.js.config.js');
const targetLessFiles   = require('./static/less.files.path.js');
const targetJsFiles     = './static/js.files.path.js';

gulp.task('css', function () {
  return gulp.src(targetLessFiles)
      .pipe(less())
      .pipe(concat('style.css'))
      .pipe(minifyCss({compatibility: 'ie8'}))
      .pipe(gulp.dest(target+'/css'))
      .pipe(livereload());
});

gulp.task('js', function () {
  return gulp.src(targetJsFiles)
      .pipe(gulpWebpack(targetWebpackFile))
      .pipe(gulp.dest(target+'/js'))
      .pipe(livereload());
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(sourceJs + '/**/*.js', ['js']);
  gulp.watch(sourceLess + '/**/*.less', ['css']);
});

//gulp.task('default', ['css','js']);
gulp.task('default', ['css','js','watch']);