'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const critical = require('critical');
const combine = require('stream-combiner2').obj;

module.exports = function (options) {
  return function () {
    return combine(
      gulp.task('critical', () => {
        critical.generate({
          inline: true,
          base: options.base,
          src: options.src,
          minify: true,
          css: options.styles,
          dimensions: options.dimensions,
          dest: options.dest,
          extract: false,
          ignore: '@font-face'
        });
      })
    ).on('error', $.notify.onError());
  };
};
