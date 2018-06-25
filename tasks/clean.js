'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combine = require('stream-combiner2').obj;

module.exports = function(options) {

  return function() {
    return combine(
      gulp.src(options.paths[0], {read: false}),
      $.clean(),
      gulp.src(options.paths[1], {read: false}),
      $.clean(),
      gulp.src(options.paths[2], {read: false}),
      $.clean(),
      gulp.src(options.paths[3], {read: false}),
      $.clean()
    ).on('error', $.notify.onError());
  };

};
