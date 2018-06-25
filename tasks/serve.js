'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create('serve');

module.exports = function(options) {

  return function() {
    browserSync.init({
      open: false,
      port: options.PORT_VAL,
      ui: {
        port: options.PORT_UI
      },
      server: {
        baseDir: options.base
      }
    });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
  };

};
