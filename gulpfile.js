var gulp = require('gulp')
,  jade = require('gulp-jade')
,	prettify = require('gulp-prettify')
,	sass = require('gulp-ruby-sass')
,	minifycss = require('gulp-minify-css')
,	rename = require('gulp-rename');

gulp.task('init', function() {
	return gulp.src('bower/bootstrap-sass-official/vendor/assets/stylesheets/**')
	.pipe(gulp.dest('src/css'))
	.pipe(gulp.src('bower/bootstrap-sass-official/vendor/assets/fonts/**'))
	.pipe(gulp.dest('dist/css'))
	.pipe(gulp.src('bower/jquery/jquery.min.js'))
	.pipe(gulp.dest('dist/js'))
});

gulp.task('jade', function() {
	return gulp.src('src/templates/*.jade')
	.pipe(jade())
	.pipe(gulp.dest('dist'))
	// If you need prettify HTML, Uncomment below lines.
	// .pipe(prettify())
	// .pipe(gulp.dest('dist'))
});

gulp.task('styles', function() {
	return gulp.src('src/css/*.scss')
	.pipe(sass({ style: 'expanded' }))
	.pipe(gulp.dest('dist/css'))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest('dist/css'))
});

gulp.task('default', function() {
	gulp.run('styles', 'jade');
	gulp.watch('src/css/**', function() {
		gulp.run('styles');
	});
	gulp.watch('src/templates/**', function() {
		gulp.run('jade');
	});
});
