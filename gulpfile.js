var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer')
var concatCSS = require('gulp-concat-css')
var ftp = require('gulp-ftp')

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "src/"
    });
	//Следим за изменением файлов
    gulp.watch("src/sass/*.sass", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// компилируем Sass в CSS и обновляем страницу
gulp.task('sass', function() {
    return gulp.src("src/sass/*.sass")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
        	browsers: ['last 2 versions'],
        	cascade: false
        	}))
        .pipe(concatCSS('style.css'))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('ftp', function(){
	return gulp.src('src/**')
	.pipe(ftp({
            host: '88.99.148.81',
            user: 'trofi155',
            pass: 'tUyP06NqOb',
            remotePath: 'www/trofinata.ru/stream'
    }))
	.pipe(gutil.noop());
});

gulp.task('default', ['serve']);



	
