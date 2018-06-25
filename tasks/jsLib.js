'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports = function(options) {

  return function() {
    return gulp.src(options.base)
      .pipe($.uglify())
      .pipe(gulp.dest(options.dest));
  };

};
