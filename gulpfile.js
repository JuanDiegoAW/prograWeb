const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass'); 
const uglify = require('gulp-uglify');
const minify =require('gulp-minify-css');
const browserSync = require('browser-sync').create();

//constantes de trabajo
const files = {
    scssPath: 'src/scss/**/*.scss',
    javascriptPath: 'src/javascript/**/*.js',
    htmlPath: 'dist/**/*.html'
}
//funciones para la optimizacion de css y javascript
function helloWorldTask(done) {
    console.log("Hello world! :D");
    done();
}

function scssTask (d){
    return src(files.scssPath)
    .pipe(sass())
    .pipe(minify())
    .pipe(dest('dist/css')); 
}
function jsTask(d){
    return src(files.javascriptPath)
    .pipe(uglify())
    .pipe(dest('dist/javascript')); 
}
function watchTask(){
    watch(
        [files.scssPath, files.htmlPath, files.javascriptPath],
        series(scssTask, jsTask, reloadTask)
        )
}
function serveTask(d){
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    d();
}
function reloadTask(d){
    browserSync.reload();
    d();
}

exports.default = series(scssTask, jsTask, serveTask, watchTask);
exports.css = scssTask;
exports.js = jsTask;