// REQUIRE PACKAGES
// For Gulp
let gulp = require('gulp');
let runSequence = require('run-sequence');
let clean = require('gulp-clean');
let browserSync = require('browser-sync').create();
let strip = require('gulp-strip-comments');
let stripDebug = require('gulp-config-strip-debug');
let sourcemaps = require('gulp-sourcemaps');
let noop = require('gulp-noop');

// For Css
let sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var purify = require('gulp-purifycss');

// For Js
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');

// For Images
let imagemin = require('gulp-imagemin');

// For html
let htmlmin = require('gulp-htmlmin');

// Define I/O paths
let root = './';
let src = 'src/';
let dist = 'dist/';

let path = {
  css: {
    i: `${root + src}scss/**/*.scss`,
    o: `${root + dist}css/`,
  },
  js: {
    i: `${root + src}js/**/*.js`,
    o: `${root + dist}js/`,
  },
  img: {
    i: `${root + src}img/**/*`,
    o: `${root + dist}img/`,
  },
  html: {
    i: `${root + src}**/*.html`,
    o: `${root + dist}`,
  },
};

// Define options
let envProd = false;

let plugins = [];

let sassOptions = {
  errLogToConsole: !envProd,
  outputStyle: 'expanded',
};
let cssNanoOptions = {
  discardComments: {
    removeAll: true,
  },
};

// TASKS
gulp.task('default', function(callback) {
  runSequence('clean', 'sass', 'js', 'img', 'html', callback);
});

// Watching for changes
gulp.task('watch', function(callback) {
  runSequence('clean', 'default', function() {
    browserSync.init({
      server: 'dist',
    });
    gulp.watch(path.js.i, ['js', browserSync.reload]);
    gulp.watch(path.css.i, ['sass', browserSync.reload]);
    gulp.watch(path.html.i, ['html', browserSync.reload]);
    gulp.watch(path.img.i, ['img', browserSync.reload]);
  });
});

// Bundle everything up ready for dropping onto the server
// Destroy comments, remove console.log, remove comments, minify without sourcemaps - the works!
gulp.task('production', function(callback) {
  envProd = true;
  console.log('production build started');
  sassOptions.outputStyle = 'compressed';
  plugins = [autoprefixer(), cssnano(cssNanoOptions)];
  runSequence('clean', 'sass', 'js', 'img', 'html', () => {
    console.log('production build finished');
  });
});

// Delete the distribution folder
gulp.task('clean', function() {
  return gulp.src('./dist', { read: false }).pipe(clean());
});

// HTML files
gulp.task('html', function() {
  gulp
    .src([path.html.i])
    .pipe(envProd ? htmlmin({ collapseWhitespace: true }) : noop())
    .pipe(gulp.dest(path.html.o));
});

// Images
gulp.task('img', function() {
  gulp
    .src([path.img.i])
    .pipe(envProd ? imagemin({ progressive: true }) : noop())
    .pipe(gulp.dest(path.img.o));
});

// Scss
gulp.task('sass', function() {
  return gulp
    .src(path.css.i)
    .pipe(envProd ? noop() : sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(envProd ? noop() : sourcemaps.write())
    .pipe(envProd ? purify([`${root + dist}/js/app.js`, `${root + dist}/styleguide.html`]) : noop())
    .pipe(postcss(plugins))
    .pipe(gulp.dest(path.css.o));
});

// Javascript
gulp.task('js', function() {
  gulp
    .src(path.js.i)
    .pipe(envProd ? noop() : sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(babel())
    .pipe(envProd ? uglify() : noop())
    .pipe(envProd ? stripDebug() : noop())
    .pipe(envProd ? strip() : noop())
    .pipe(envProd ? noop() : sourcemaps.write('.'))
    .pipe(gulp.dest(path.js.o));
});
