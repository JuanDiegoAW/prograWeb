const { src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass'); 

//constantes de trabajo
const files = {
    scssPath: 'src/scss/**/*.scss'
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

exports.default = helloWorldTask;
exports.css = series(helloWorldTask,scssTask);