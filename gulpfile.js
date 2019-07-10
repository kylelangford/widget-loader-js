var browser = require('browser-sync').create();
var concat = require('gulp-concat');
var gulp = require('gulp');
var notify = require('gulp-notify');
var rimraf = require('rimraf');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var modernizr = require('gulp-modernizr');

// Tasks
gulp.task('build', gulp.series(css, js));
gulp.task('default', gulp.series('build', server, watch));
gulp.task('publish', gulp.series(publish, publishMinified));

// Compile Scss into CSS
function css() {
  return gulp
    .src('./demo/src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded',
        sourceMap: true,
      })
    )
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./demo/assets/css'))
    .pipe(
      notify({
        title: 'SASS Compiled',
        message: 'All SASS files have been recompiled to CSS.',
        onLast: true,
      })
    );
}

// JS
function js() {
  function createErrorHandler(name) {
    return function(err) {
      console.error('Error from ' + name + ' in compress task', err.toString());
    };
  }

  return gulp
    .src(['./src/block-loader.js'])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .on('error', createErrorHandler('uglify'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./demo/assets/js'))
    .pipe(
      notify({
        title: 'JS Minified',
        message: 'All JS files in the theme have been minified.',
        onLast: true,
      })
    );
}

// function buildJS() {
//   function createErrorHandler(name) {
//     return function(err) {
//       console.error('Error from ' + name + ' in compress task', err.toString());
//     };
//   }

//   return gulp
//     .src(['./src/js/demo-block.js', './src/js/demo-block-init.js'])
//     .pipe(concat('demo-block-bundle.js'))
//     .pipe(sourcemaps.init())
//     .pipe(uglify())
//     .on('error', createErrorHandler('uglify'))
//     .pipe(sourcemaps.write('./maps'))
//     .pipe(gulp.dest('./dist/build/js'))
//     .pipe(
//       notify({
//         title: 'JS Minified',
//         message: 'All JS files in the theme have been minified.',
//         onLast: true,
//       })
//     );
// }

function publishMinified() {
  return gulp
    .src(['./src/block-loader.js'])
    .pipe(concat('block-loader.min.js'))
    .pipe(uglify())
    .on('error', createErrorHandler('uglify'))
    .pipe(gulp.dest('./dist/'))
    .pipe(
      notify({
        title: 'JS Minified',
        message: 'All JS files in the theme have been minified.',
        onLast: true,
      })
    );
}

function publish() {
  return gulp
    .src(['./src/block-loader.js'])
    .pipe(gulp.dest('./dist/'))
    .pipe(
      notify({
        title: 'JS Minified',
        message: 'All JS files in the theme have been minified.',
        onLast: true,
      })
    );
}

/**
 * Start a server with LiveReload to preview the site in
 */
function server(done) {
  browser.init({
    server: {
      baseDir: './demo/',
      port: 3000,
    },
  });
  done();
}

// Watch for file changes
function watch() {
  gulp
    .watch(['./demo/src/scss/**/*.scss'])
    .on('change', gulp.series(css, browser.reload));
  gulp
    .watch(['./demo/src/js/**/*.js', './src/*.js'])
    .on('change', gulp.series(js, browser.reload));
  gulp.watch(['./demo/*.html']).on('change', gulp.series(browser.reload));
}
