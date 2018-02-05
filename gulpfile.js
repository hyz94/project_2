var gulp = require('gulp');
var sass = require('gulp-sass');
//编译sass
gulp.task('compileSass',function(){
    gulp.src('./src/sass/*.scss')
    .pipe(sass({outputStyle:'compact'}).on('error', sass.logError))
    .pipe(gulp.dest('./src/css/'))
});
//监听
gulp.task('jtSass',function(){
    gulp.watch('./src/sass/*.scss',['compileSass'])
});
//自动刷新页面
// 自动刷新页面
var browserSync = require('browser-sync');
gulp.task('server',function(){
    browserSync({
        port:2220,
        proxy:'http://localhost:2221',
        files:['./src/**/*.html','./src/css/*.css','./src/api/*.php']
    });
    gulp.watch('./src/sass/*.scss',['compileSass']);
});
