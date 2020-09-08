const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass'); 
const browserSync = require('browser-sync');

//constantes de trabajo
const files = {
    scssPath: 'src/scss/**/*.scss',
    htmlPath: 'dist/**/*.html'
}

function helloWorldTask(done) {
    console.log("Hello world! :D");
    done();
}

function scssTask(d) {
    return src(files.scssPath)
        .pipe(sass())
        .pipe(dest('dist/css'));
}   

function watchTask() {
    watch(
        [files.scssPath, files.htmlPath],
        series(scssTask, reloadTask)
    )
}

function serveTask(done) {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    })
    done();
}

function reloadTask(done) {
    browserSync.reload();
    done();
}

exports.default = series(scssTask, serveTask, watchTask);