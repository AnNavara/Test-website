'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports = function(options) {

  return function() {
    return gulp.src(options.src, {since: gulp.lastRun('assets:img')})
      .pipe($.imagemin({
        progressive: true,
        optimizationLevel: 3,
        multipas: true,
        svgoPlugins: [
          {removeViewBox: false}
        ]
      }))
      .pipe(gulp.dest(options.dest));
  };

};
