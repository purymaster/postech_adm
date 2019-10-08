const gulp = require('gulp'),
	run = require('run-sequence'),
	clean = require('gulp-clean'),
	cache = require('gulp-cached'),
	sync = require('browser-sync').create(),
	include = require('gulp-file-include'),
	// csscomb = require('gulp-csscomb'),
	prefix = require('gulp-autoprefixer'),
	pretty = require('gulp-pretty-html'),
	beautify = require('gulp-beautify'),
	imagemin = require('gulp-imagemin'),
	config = require('./config.js');
	// combConfig = require('./csscomb.json');

// Clean
gulp.task('clean', () => {
	return gulp
		.src(config.dev)
		.pipe(clean());
});

// HTML
gulp.task('html_merge', () => {
	return gulp
		.src(config.srcPath.html)
		// .pipe(cache('html'))
		.pipe(include({
			prefix: '@@',
			basepath: config.srcPath.include
		}))
		.pipe(pretty({
			indent_with_tabs: true
		}))
		.pipe(gulp.dest(config.devPath.html))
		.pipe(
			sync.reload({
				stream: true
			})
		);
});

gulp.task('html', ['html_merge'], () => {
	return gulp
		.src(config.devPath.include)
		.pipe(clean());
});

// CSS
gulp.task('css', () => {
	return gulp
		.src(config.srcPath.css)
		.pipe(prefix({
			browsers: ['last 2 versions'],
			cascade: false
		}).on('error', function (err) {
			console.log(err);
			this.emit('end');
		}))
		// .pipe(csscomb(combConfig))
		.pipe(gulp.dest(config.devPath.css))
		.pipe(
			sync.reload({
				stream: true
			})
		);
});

// Fonts
gulp.task('font', () => {
	return gulp
		.src(config.srcPath.font)
		.pipe(cache('font'))
		.pipe(gulp.dest(config.devPath.font))
		.pipe(
			sync.reload({
				stream: true
			})
		);
});

// JS
gulp.task('js', () => {
	return gulp
		.src(config.srcPath.js)
		.pipe(cache('js'))
		.pipe(beautify())
		.pipe(gulp.dest(config.devPath.js))
		.pipe(
			sync.reload({
				stream: true
			})
		);
});

// Image
gulp.task('img', () => {
	return gulp
		.src(config.srcPath.img)
		.pipe(cache('img'))
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			optimizationLevel: 7,
			svgoPlugins: [{ removeViewBox: false }],
			verbose: true,
			use: []
		}))
		.pipe(gulp.dest(config.devPath.img))
		.pipe(
			sync.reload({
				stream: true
			})
		);
});

// Sync
gulp.task('sync', ['html'], () => {
	sync.init({
		port: 8080,
		server: {
			baseDir: './',
			index: 'map_list.html'

		},
		browser: ['google chrome', 'chrome']
		// browser: ['google chrome', 'chrome', 'firefox', 'iexplore', 'opera', 'safari']
	});
});

// Watch
gulp.task('watch', () => {
	gulp.watch([config.srcPath.html, config.srcPath.include], ['html']);
	gulp.watch(config.srcPath.css, ['css']);
	gulp.watch(config.srcPath.font, ['font']);
	gulp.watch(config.srcPath.js, ['js']);
	gulp.watch(config.srcPath.img, ['img']);
});

// Default
gulp.task('default', () => {
	run('clean', [
		'html',
		'css',
		'js',
		'font',
		'img',
		'sync',
		'watch'
	]);
});