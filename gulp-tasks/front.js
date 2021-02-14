var gulp            = require('gulp');
var gutil           = require('gulp-util');
var browserSync     = require('browser-sync').create();
var browserify      = require('browserify');
var sass            = require('gulp-sass');
var cssmin          = require('gulp-cssmin');
var rename          = require('gulp-rename');
var concat          = require('gulp-concat');
var sourcemaps      = require('gulp-sourcemaps');
var uglify          = require('gulp-uglify-es').default;
var buffer          = require('vinyl-buffer');
var source          = require('vinyl-source-stream');
var babelify        = require('babelify');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("resources/assets/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("public/assets"))
        .pipe(browserSync.stream())
        // Renomme le fichier avec .min
        .pipe(rename({suffix: '.min'}))
        // Compresse le fichier
        .pipe(cssmin())
        // Sauve le fichier dans public/assets
        .pipe(gulp.dest('public/assets'))
});

// process JS files and return the stream.
gulp.task('bundle', function(){
    return browserify({
        entries: './resources/assets/js/scripts.js',
        debug: true
      })
      .transform(babelify, { presets: ["@babel/preset-env"], "compact": false, "global": "true"})
      .bundle()
      .pipe(source('scripts.js'))
      .pipe(buffer())
      // Indente
      //.pipe(beautify({indentSize: 2}))
      // Sauve le fichier dans public/assets
      .pipe(gulp.dest("public/assets/"))
      // Renomme le fichier avec .min
      .pipe(rename({suffix: '.min'}))
      // Compresse le fichier
      .pipe(uglify())
      // Sauve le fichier compressé dans public/assets
      .pipe(gulp.dest('public/assets/'))
})

gulp.task('scene-build', function(){
    return gulp.src('resources/assets/js/scene/*.js')
        .pipe(concat('scene.js'))
        .pipe(gulp.dest('resources/assets/js/modules/'))
        // .pipe(gp_rename('uglify.js'))
        // .pipe(gp_uglify())
        // .pipe(gulp.dest('./resources/assets/js/'));
});



// reloading browsers
gulp.task('js-watch', gulp.series('bundle', function (done) {
    browserSync.reload();
    done();
}));

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        // proxy: "starterkit.test",
        // port: 8081,
        // open: false,
        server: './public'
      });

    gulp.watch("resources/assets/js/scene/*.js", gulp.series('scene-build'));
    gulp.watch("resources/assets/js/vendors/*.js", gulp.series('js-watch'));
    gulp.watch("resources/assets/js/modules/*.js", gulp.series('js-watch'));
    gulp.watch("resources/assets/scss/**/*.scss", gulp.series('sass'));
    gulp.watch("public/*.html").on('change', browserSync.reload);
}));

gulp.task('front', gulp.series('serve'));

