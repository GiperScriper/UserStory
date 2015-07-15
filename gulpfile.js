var gulp = require('gulp');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var notify = require('gulp-notify');


var jsFiles = ['./app/**/*.js', './app.js'];

gulp.task('default', ['jslint'], function () {
  console.log('default task');
});


gulp.task('jslint', function () {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));    
});


gulp.task('watch', function () {

});