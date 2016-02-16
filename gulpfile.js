
// Import node modules 
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    htmlmin = require('gulp-htmlmin'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    uncss = require('gulp-uncss'),
    rename = require('gulp-rename');

//---------------------------
//
// paths
// =====
//
// Includes strings and arrays of source paths to files,
// new file names for compiled files, and new directories
// for those files.
//
//---------------------------
var paths = {
  moveTemplates: {
    src: './src/templates/**/*.html',
    dest: './public/templates'
  },
  moveAssets: {
    src: './src/assets/**/*',
    dest: './public/assets'
  },
  sassToCSS: {
    src: './src/scss/main.scss',
    newName: 'style.css',
    dest: './public/css'
  },
  unCSS: {
    src: './public/css/style.css',
    html: [
      './src/*.html',
      './src/templates/**/*.html'
    ],
    dest: './public/css',
    ignore: []
  },
  minifyCSS: {
    src: './public/css/style.css',
    newName: 'style.min.css',
    dest: './public/css'
  },
  concatJS: {
    concat: 'script.js'
  },
  uglifyJS: {
    src: './public/js/script.js',
    newName: 'script.min.js'
  },
  html: {
    src: './src/*.html',
    dest: 'public'
  },
  scss: {
    src: './src/scss/main.scss', 
    dest: './public/css',
    watch: [
      './src/scss/**/*.scss'
    ]
  },
  js: {
    src: [
      './bower_components/angular/angular.js',
      './bower_components/angular-ui-router/release/angular-ui-router.js',
      './bower_components/angular-local-storage/dist/angular-local-storage.js',

      './src/js/vendor/angular-ui/ui-bootstrap-custom-1.0.3.js',
      './src/js/vendor/angular-ui/ui-bootstrap-custom-tpls-1.0.3.js',

      './src/js/app.js',

      './src/js/controllers.js',
      './src/js/services.js',
      './src/js/directives.js',
      './src/js/filters.js',

      './src/js/controllers/*.js',
      './src/js/services/*.js',
      './src/js/directives/*.js',
      './src/js/filters/*.js',

      './src/js/analytics.js'
    ],
    dest: './public/js/'
  }
};

//---------------------------
//
// moveTemplates
// ========
//
// - Grabs all the html files from src folder
// - Moves them in a folder called 'template' in public
//
//---------------------------
gulp.task('moveTemplates', function(){
  return gulp.src(paths.moveTemplates.src)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.moveTemplates.dest));
});

//---------------------------
//
// moveAssets
// ========
//
// - Grabs all the directories (and all their files) from the src folder.
// - Puts those directories in the public/assets folder.
//
//---------------------------
gulp.task('moveAssets', function(){
  return gulp.src(paths.moveAssets.src)
    .pipe(gulp.dest(paths.moveAssets.dest));
});

//---------------------------
//
// moveHTML
// ========
//
// - Grabs all the html files from the src folder.
// - Puts them into the public folder.
//
//---------------------------
gulp.task('moveHTML', function(){
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
});

//---------------------------
//
// minifyHTML
// ==========
//
// - Runs the 'moveHTML' task first, which will move all the
//   html files from the src folder into the public folder.
// - Grabs all the html files from the src folder.
// - Runs the `htmlmin()` function.
// - Puts those html files into the public folder.
//
//---------------------------
gulp.task('minifyHTML', ['moveHTML'], function() {
  return gulp.src(paths.html.src)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.html.dest));
});

//---------------------------
//
// sassToCSS
// =========
//
// - Grabs the 'main.css' file from the src folder.
// - Initializes the sourcemaps.
// - Runs the `sass()` function.
// - Creates a sourcemap.
// - Renames file to 'style.css.'
// - Puts that css file into the css folder.
//
//---------------------------
gulp.task('sassToCSS', function() {
  return gulp.src(paths.sassToCSS.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(rename(paths.sassToCSS.newName))
    .pipe(gulp.dest(paths.sassToCSS.dest));
});

//---------------------------
//
// unCSS
// =====
//
// - Runs the 'sassToCSS' task first, which will compile
//   the sass to css.
// - Grabs the style.css file.
// - Runs the `uncss()` function.
// - Puts that css file into the css folder.
//
//---------------------------
gulp.task('unCSS', ['sassToCSS'], function() {
  return gulp.src(paths.unCSS.src)
    .pipe(uncss({
      html: paths.unCSS.html,
      ignore: paths.unCSS.ignore,
    }))
    .pipe(gulp.dest(paths.unCSS.dest));
});

//---------------------------
//
// minifyCSS
// =========
//
// - Runs the 'unCSS' task first, which will remove all 
//   the unused css rules.
// - Grabs the style.css file.
// - Runs the `minifyCss()` function.
// - Renames the file to 'style.min.css.'
// - Puts that css file into the css folder.
//
//---------------------------
gulp.task('minifyCSS', ['sassToCSS'], function() {
  return gulp.src(paths.minifyCSS.src)
    .pipe(minifyCss())
    .pipe(rename(paths.minifyCSS.newName))
    .pipe(gulp.dest(paths.minifyCSS.dest));
});

//---------------------------
//
// ConcatJS
// ========
//
// - Grabs all the js files from the js array.
// - Runs the `sourcemaps.init()` function.
// - Calls the `concat()` function which will combine all the
//   javascript files into one javascript file named 'script.js.'
// - Writes a sourcemap.
// - Puts that large javascript file into the js folder.
//
//---------------------------
gulp.task('concatJS', function() {
  return gulp.src(paths.js.src)
    // .pipe(sourcemaps.init())
    .pipe(concat(paths.concatJS.concat))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.js.dest));
});

//---------------------------
//
// UglifyJS
// ========
//
// - Runs the 'concatJS' task first, which will create a big javascript
//   file from the array of smaller javascript files.
// - Grabs the 'script.js' file.
// - Runs the `Uglify()` function which significantly 
//   compresses the hell out of the javascript file. 
// - Renames the file to 'script.min.js.'
// - Puts that compressed file into the js folder.
//
//---------------------------
gulp.task('uglifyJS', ['concatJS'], function() {
  return gulp.src(paths.uglifyJS.src)
    .pipe(uglify())
    .pipe(rename(paths.uglifyJS.newName))
    .pipe(gulp.dest(paths.js.dest));
});

//---------------------------
//
// Watch
// =====
//
// Watches for changes.
// Example : gulp.watch('./path/to/file/', ['tasks', 'to', 'run', 'when', 'file', 'is', 'modified'])
//
//---------------------------
gulp.task('watch', function() {
  gulp.watch(paths.moveTemplates.src, ['moveTemplates']);
  gulp.watch(paths.moveAssets.src, ['moveAssets']);
  gulp.watch(paths.html.src, ['moveHTML']);
  gulp.watch(paths.scss.watch, ['sassToCSS']);
  gulp.watch(paths.js.src, ['concatJS']);
});

//---------------------------
//
// Default task
// ============
// 
// - Called when you run `gulp` from cli.
//
//---------------------------
gulp.task('default', ['moveTemplates', 'moveAssets', 'moveHTML', 'sassToCSS', 'concatJS', 'watch']);

//---------------------------
//
// Build task
// ==========
// 
// - Compresses html, css, and javascript.
// - Removed unused css rules.
//
//---------------------------
gulp.task('build', ['moveTemplates', 'moveAssets', 'minifyHTML', 'minifyCSS', 'uglifyJS']);
