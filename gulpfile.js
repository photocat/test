var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('scss', function(){
  return gulp.src('app/scss/**/*.scss')
  .pipe(sass())
  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function(){
  return gulp.src([
    'app/libs/jquery/dist/jquery.min.js',
    'app/libs/jquery-form-validator/form-validator/jquery.form-validator.min.js',
    'app/libs/slick-carousel/slick/slick.min.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', ['scss'], function(){
  return gulp.src('app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
});

gulp.task('fonts-copy', function () {
    gulp.src([
      'app/libs/slick-carousel/slick/fonts/*'
    ])
    .pipe(gulp.dest('app/fonts'));
});

gulp.task('image-copy', function () {
    gulp.src('app/libs/slick-carousel/slick/*.gif')
    .pipe(gulp.dest('app/img'));
})

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('clean', function () {
  return del.sync('dist');
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts', 'fonts-copy', 'image-copy'], function () {
  gulp.watch('app/scss/**/*.scss', ['scss']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'css-libs', 'scripts', 'fonts-copy', 'image-copy'],  function(){
  var buildCss = gulp.src([
    'app/css/main.css',
    'app/css/libs.min.css'
  ])
    .pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

  var buildImg = gulp.src('app/img/**/*')
    .pipe(gulp.dest('dist/img'));
});
