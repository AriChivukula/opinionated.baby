// @flow

var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var rollup = require('gulp-better-rollup');
var rollupBabel = require('rollup-plugin-babel');
var shell = require('gulp-shell');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('clean', shell.task('rm -rf _*'));

gulp.task('lint-relay', shell.task('relay-compiler --src src/client --schema src/server/schema.graphql'));

gulp.task('lint-flow', shell.task('flow'));

gulp.task('lint-sass', shell.task('sass-lint src/**/*.scss'));

gulp.task('lint', gulp.series('lint-relay', 'lint-flow', 'lint-sass'));

gulp.task('test-build', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('_test'));
});

gulp.task('test-run', shell.task('jest _test/'));

gulp.task('test', gulp.series('lint', 'test-build', 'test-run'));

gulp.task('build-copy', function () {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('_build'));
});

gulp.task('build-html', function () {
  return gulp.src('_build/client/static/index.html')
    .pipe(gulp.dest('_bin/client'));
});

gulp.task('build-sass', function () {
  return gulp.src('_build/client/static/index.scss')
    .pipe(sass())
    .pipe(gulp.dest('_bin/client'));
});

gulp.task('build-material', function () {
  return gulp.src('node_modules/material-components-web/dist/material-components-web.min.css')
    .pipe(gulp.dest('_bin/client'));
});

gulp.task('build-client', function () {
  return gulp.src('_build/client/client.js')
    .pipe(browserify(
      { transform: ['babelify'] }
    ))
    .pipe(uglify())
    .pipe(gulp.dest('_bin/client'));
});

gulp.task('build-server', function () {
  return gulp.src('_build/server/server.js')
    .pipe(rollup(
      { plugins: [
        rollupBabel({
          babelrc: false,
          exclude: 'node_modules/**',
          "presets": [
            [
              "env",
              { "modules": false }
            ],
            "flow",
            "react"
          ]
        }),
      ] },
      { format: 'cjs' }
    ))
    .pipe(uglify())
    .pipe(gulp.dest('_bin/server'));
});

gulp.task('build-graphql', function () {
  return gulp.src('_build/server/schema.graphql')
    .pipe(gulp.dest('_bin/server'));
});

gulp.task('build', gulp.series('lint', 'build-copy', 'build-html', 'build-sass', 'build-material', 'build-client', 'build-server', 'build-graphql'));

gulp.task('localhost', shell.task('source secrets && DEBUG=* node _bin/server/server.js'));

gulp.task('migrate-build', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('_sql'));
});

gulp.task('migrate-run', shell.task('source secrets && node_modules/.bin/sequelize db:migrate'));

gulp.task('migrate', gulp.series('migrate-build', 'migrate-run'));
