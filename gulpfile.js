var gulp = require('gulp')
,  jade = require('gulp-jade')
,	prettify = require('gulp-prettify')
,	sass = require('gulp-ruby-sass')
,	minifycss = require('gulp-minify-css')
,	rename = require('gulp-rename')
,	connect = require('gulp-connect');

gulp.task('init', function() {
	return gulp.src('bower/bootstrap-sass-official/vendor/assets/stylesheets/**')
	.pipe(gulp.dest('src/css'))
	.pipe(gulp.src('bower/bootstrap-sass-official/vendor/assets/fonts/**'))
	.pipe(gulp.dest('dist/css'))
	.pipe(gulp.src('bower/jquery/jquery.min.js'))
	.pipe(gulp.dest('dist/js'))
});

gulp.task('connect', connect.server({
	root: __dirname + '/dist',
	port: 1337,
	livereload: true,
	open: {} // Open default browser.
	})
);

gulp.task('jade', function() {
	return gulp.src('src/templates/*.jade')
	.pipe(jade())
	.pipe(gulp.dest('dist'))
	// If you need prettify HTML, uncomment below 2 lines.
	// .pipe(prettify())
	// .pipe(gulp.dest('dist'))
	.pipe(connect.reload());
});

gulp.task('styles', function() {
	return gulp.src('src/css/*.scss')
	.pipe(sass({ style: 'expanded' }))
	.pipe(gulp.dest('dist/css'))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest('dist/css'))
	.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(['src/css/**'], ['styles']);
	gulp.watch(['src/templates/**'], ['jade']);
});

gulp.task('default', ['connect', 'styles', 'jade', 'watch']);
