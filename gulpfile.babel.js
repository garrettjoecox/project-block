import gulp from 'gulp';
import babel from 'gulp-babel';
import stream from 'add-stream';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import plumber from 'gulp-plumber';
import cleanCSS from 'gulp-clean-css';
import ngAnnotate from 'gulp-ng-annotate';
import templateCache from 'gulp-angular-templatecache';

gulp.task('default', ['server', 'client']);

gulp.task('watch', ['server:watch', 'client:watch']);

/*** Server ***/

gulp.task('server', ['server:build']);

gulp.task('server:watch', ['server:build'], () => {
  // todo
});

gulp.task('server:build', () => {
  return gulp.src('server/src/**/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('server/dist'));
});

/*** Client ***/

gulp.task('client', ['client:build']);

gulp.task('client:watch', ['client:build'], () => {
  // todo
});

gulp.task('client:build', ['client:js', 'client:css']);

gulp.task('client:js', () => {
  return gulp.src('client/src/**/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(stream.obj(gulp.src('client/src/**/*.html')
      .pipe(templateCache({ module: 'project-block' }))))
    .pipe(concat('main.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('client/dist'));
});

gulp.task('client:css', () => {
  return gulp.src('client/src/**/*.css')
    .pipe(plumber())
    .pipe(concat('main.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('client/dist'));
});

gulp.task('client:vendor', ['client:vendor:js', 'client:vendor:css']);

const vendorjs = [
  'node_modules/angular/angular.min.js',
  'node_modules/angular-ui-router/release/angular-ui-router.min.js'
];

gulp.task('client:vendor:js', () => {
  return gulp.src(vendorjs)
    .pipe(plumber())
    .pipe(concat('vendor.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('client/dist'));
});

const vendorcss = [];

gulp.task('client:vendor:css', () => {
  return gulp.src(vendorcss)
    .pipe(plumber())
    .pipe(concat('vendor.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('client/dist'));
});
