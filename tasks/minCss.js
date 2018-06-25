'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combine = require('stream-combiner2').obj;

module.exports = function(options) {

  return function() {
    return gulp.src(options.src)
      .pipe($.csso())
      .pipe($.rename(options.rename))
      .pipe(gulp.dest(options.dest));
  };

};
