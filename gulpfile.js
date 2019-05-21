var browser     = require('browser-sync').create();
var concat      = require('gulp-concat');
var gulp        = require('gulp');
var notify      = require('gulp-notify');
var rimraf      = require('rimraf');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var modernizr   = require('gulp-modernizr');

// Tasks
gulp.task('build', 
  gulp.series(files, data, css, js, buildJS));

gulp.task('default',
  gulp.series(clean, 'build', server, watch));

// Compile Scss into CSS
function css() {
  return gulp.src('./src/scss/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
    sourceMap: true 
  }))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./dist/css'))
  .pipe(notify({
    title: "SASS Compiled",
    message: "All SASS files have been recompiled to CSS.",
    onLast: true
  }));
}

// JS
function js() {

  function createErrorHandler(name) {
    return function (err) {
      console.error('Error from ' + name + ' in compress task', err.toString());
    };
  }

  return gulp.src([
      './src/js/*.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .on('error', createErrorHandler('uglify'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(notify({
      title: "JS Minified",
      message: "All JS files in the theme have been minified.",
      onLast: true
    }));
}

function buildJS() {

  function createErrorHandler(name) {
    return function (err) {
      console.error('Error from ' + name + ' in compress task', err.toString());
    };
  }

  return gulp.src([
      './src/js/demo-block.js',
      './src/js/demo-block-init.js'
    ])
    .pipe(concat('demo-block-bundle.js'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .on('error', createErrorHandler('uglify'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/build/js'))
    .pipe(notify({
      title: "JS Minified",
      message: "All JS files in the theme have been minified.",
      onLast: true
    }));
}

// Copy Misc Files
function files() {
  return gulp.src([
    './src/*.html',
    ])
  .pipe(gulp.dest('dist/'));
}

// Copy Misc Files
function data() {
  return gulp.src([
    './src/data/*.json',
    ])
  .pipe(gulp.dest('dist/data'));
}

// Delete the "dist" folder
function clean(done) {
  rimraf('dist', done);
}

/**
 * Start a server with LiveReload to preview the site in
 */
function server(done) {
	browser.init({
    server: {
      baseDir: 'dist',
      port: 3000
    }
  });
  done();
}

// Watch for file changes
function watch() {
  gulp.watch(['./src/js/**/*.js']).on('change', gulp.series( js, buildJS, browser.reload));
  gulp.watch(['./src/scss/*.scss']).on('change', gulp.series( css, browser.reload));
  gulp.watch(['./src/data/*.json']).on('change', gulp.series( data, browser.reload));
  gulp.watch(['./src/index.html']).on('change', gulp.series( files, browser.reload));
}

