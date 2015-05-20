var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var wait = require('gulp-wait');
var waitTime = 750;

gulp.task('styles', function(){
	return gulp.src([
		'bower_components/normalize.css/normalize.css',
		'assets/styles/main.scss',
		])
	  .pipe(sass({
				includePaths:[
					''
				]
			}))
	  .pipe(concat('app.css'))
	  .pipe(gulp.dest('public/css/'))
	  .pipe(wait(waitTime))
	  .pipe(livereload({ start: true }));
});

gulp.task('scripts', function() {
	return gulp.src([
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/jquery-mousewheel/jquery.mousewheel.min.js',
			'assets/scripts/app.js'
    	])
      .pipe(concat('app.js'))
      .pipe(gulp.dest('public/js/'))
      .pipe(wait(waitTime))
      .pipe(livereload({ start: true }));
});

gulp.task('reload', function() {
	return gulp.src('public/*.php').pipe(wait(waitTime)).pipe(livereload({ start: true }));
});

gulp.task('watch', function() {
	var server = livereload({ start: true });
	livereload.listen({ reloadPage: "public/index.php" });
	gulp.watch('public/*.php', ['reload']);
    gulp.watch('assets/styles/**/*', ['styles']);
    gulp.watch('assets/scripts/**/*', ['scripts']);
});


gulp.task('default',['styles', 'scripts', 'watch']);