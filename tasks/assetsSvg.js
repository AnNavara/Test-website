'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports = function(options) {

  return function() {
    return gulp.src(options.src, {since: gulp.lastRun('assets:img')})
      .pipe($.svgSprite({
        mode: {
          css: {
            dest: '.',
            bust: false,
            sprite: '../img/sprite.svg',
            layout: 'vertical',
            prefix: '%%',
            dimensions: true,
            render: {
              scss: {
                dest: 'sprite.scss'
              }
            }
          }
        }
      }))
      .pipe($.if('*.scss', gulp.dest(options.mixin), gulp.dest(options.dest)));
  };

};
