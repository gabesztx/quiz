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

const targetWebpackFile = require('./static/webpack.config.js');
const targetLessFiles   = require('./static/less.files.path.js');
const targetJsFiles     = './static/entry.js';

gulp.task('css',()=> {
  return gulp.src(targetLessFiles)
      .pipe(less())
      .pipe(concat('style.css'))
      .pipe(minifyCss({compatibility: 'ie8'}))
      .pipe(gulp.dest(target+'/css'))
      .pipe(livereload());
});

gulp.task('js',()=> {
  return gulp.src(targetJsFiles)
      .pipe(gulpWebpack(targetWebpackFile))
      .pipe(gulp.dest(target+'/js'))
      .pipe(livereload());
});

gulp.task('watch',()=> {
  livereload.listen();
  gulp.watch(sourceJs + '/**/*.js', ['js']);
  gulp.watch(sourceLess + '/**/*.less', ['css']);
});

//gulp.task('default', ['css','js']);
gulp.task('default', ['css','js','watch']);