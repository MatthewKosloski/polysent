'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename');

const { src, dest, series, watch } = gulp;
  
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
		watch: ['./src/scss/**/*.scss']
	},
	js: {
		src: [
			'./node_modules/angular/angular.js',
			'./node_modules/angular-ui-router/release/angular-ui-router.js',
			'./node_modules/angular-local-storage/dist/angular-local-storage.js',
			'./src/js/**/*.js'
		],
		dest: './public/js/'
	}
};

const _moveTemplates = function() {
	const { moveTemplates } = paths;
	return src(moveTemplates.src)
    	.pipe(htmlmin({collapseWhitespace: true}))
    	.pipe(dest(moveTemplates.dest));
};

const _moveAssets = function() {
	const { moveAssets } = paths;
	return src(moveAssets.src)
    	.pipe(dest(moveAssets.dest));
};

const _moveHTML = function() {
	const { html } = paths;
	return src(html.src)
    	.pipe(dest(html.dest));
};

const _minifyHTML = series(_moveHTML, function() {
	const { html } = paths;
	return src(paths.html.src)
    	.pipe(htmlmin({collapseWhitespace: true}))
    	.pipe(dest(paths.html.dest));
});

const _sassToCSS = function() {
	const { sassToCSS } = paths;
	return src(sassToCSS.src)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(rename(sassToCSS.newName))
		.pipe(dest(sassToCSS.dest));
};

const _minifyCSS = series(_sassToCSS, function() {
	const { minifyCSS } = paths;
	return src(minifyCSS.src)
		.pipe(minifyCss())
		.pipe(rename(minifyCSS.newName))
		.pipe(dest(minifyCSS.dest));
});

const _concatJS = function() {
	const { js, concatJS } = paths;
	return src(js.src)
		// .pipe(sourcemaps.init())
		.pipe(concat(concatJS.concat))
		// .pipe(sourcemaps.write())
		.pipe(dest(js.dest));
};

const _uglifyJS = series(_concatJS, function() {
	const { uglifyJS, js } = paths;
	return src(uglifyJS.src)
		.pipe(uglify())
		.pipe(rename(uglifyJS.newName))
		.pipe(dest(js.dest));
});

const dev = function() {
	watch(paths.moveTemplates.src, {ignoreInitial: false}, _moveTemplates);
	watch(paths.moveAssets.src, {ignoreInitial: false}, _moveAssets);
	watch(paths.html.src, {ignoreInitial: false}, _moveHTML);
	watch(paths.scss.watch, {ignoreInitial: false}, _sassToCSS);
	watch(paths.js.src, {ignoreInitial: false}, _concatJS);
};

const build = series(_moveTemplates, _moveAssets, _minifyHTML, _minifyCSS, _uglifyJS);

module.exports = {
	dev, 
	build
};