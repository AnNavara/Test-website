'use strict';
/* eslint off */

const gulp = require('gulp');

const PORT_UI = 8082;
const PORT_VAL = 8080;

function lazyRequireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
}

lazyRequireTask('html', './tasks/html', {
  src: ['./source/*.pug', '!./source/templates/_*.pug'],
  dest: './public/',
});

lazyRequireTask('styles', './tasks/styles', {
  src: 'source/styles.scss',
  dest: './public/css',
  rename: '.css',
});

lazyRequireTask('min:css', './tasks/minCss', {
  src: './public/css/styles.css',
  rename: 'styles.min.css',
  dest: './public/css/'
});

lazyRequireTask('critical', './tasks/criticalCss', {
  base: './public',
  src: 'index.html',
  styles: './public/css/styles.min.css',
  dimensions: [
    {
      height: 400,
      width: 400
    },
    {
      height: 900,
      width: 1300
    }
  ],
  dest: 'build/index.html'
});

lazyRequireTask('serve', './tasks/serve', {
  base: './public',
  PORT_VAL,
  PORT_UI
});

lazyRequireTask('js:main', './tasks/js', {
  base: './source/_js/*.js',
  name: 'script.js',
  dest: './public/js/'
});

lazyRequireTask('js:lib', './tasks/jsLib', {
  base: './source/_js/lib/*.js',
  dest: './public/js/lib/'
});

gulp.task('js', gulp.parallel('js:main', 'js:lib'));

lazyRequireTask('assets:img', './tasks/assetsImg', {
  src: 'source/img/*.{png,jpg}',
  dest: './public/img'
});

lazyRequireTask('assets:svg', './tasks/assetsSvg', {
  src: 'source/_img/*.svg',
  dest: './public/img',
  mixin: './tmp/styles'
});

lazyRequireTask('clean', './tasks/clean', {
  paths: ['build/js/*.js', 'build/img/*', 'build/*.html', 'tmp/*']
});

gulp.task('watch', function() {
  gulp.watch(['source/**/*.pug', 'source/locals.js'], gulp.series('html'));
  gulp.watch('source/styles/**/*.scss', gulp.series('styles'));
  gulp.watch('source/_img/*.{jpg,png}', gulp.series('assets:img'));
  gulp.watch('source/_img/*.svg', gulp.series('assets:svg', 'styles'));
  gulp.watch('source/_js/*.js', gulp.series('js:main'));
  gulp.watch('source/_js/lib/*.js', gulp.series('js:lib'));
  gulp.watch('source/img/*', gulp.series('assets:img'));
});

gulp.task('build', gulp.series('html', 'js:lib', 'js:main', 'assets:img', 'styles', 'watch'));
