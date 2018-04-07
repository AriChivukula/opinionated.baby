// @flow

var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var rollup = require('gulp-better-rollup');
var rollupBabel = require('rollup-plugin-babel');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task(
  'clean-build',
  shell.task('rm -rf _*')
);

gulp.task(
  'clean-flow',
  shell.task('rm -rf flow-typed')
);

gulp.task(
  'clean-node',
  shell.task('rm -rf node_modules')
);

gulp.task(
  'clean-yarn',
  shell.task('rm -rf yarn*')
);

gulp.task(
  'clean-install',
  shell.task('yarn install')
);

gulp.task(
  'clean-upgrade',
  shell.task('yarn upgrade --latest')
);

gulp.task(
  'clean-types',
  shell.task('yarn flow-typed install')
);

gulp.task(
  'clean',
  gulp.series(
    gulp.parallel(
      'clean-build',
      'clean-flow',
      'clean-node',
      'clean-yarn'
    ),
    'clean-install',
    'clean-upgrade',
    'clean-types'
  )
);

gulp.task(
  'artifact-clean',
  shell.task('rm -rf _artifact')
);

gulp.task(
  'artifact-purge',
  shell.task('rm -rf src/client/views/__generated__')
);

gulp.task(
  'artifact-transform',
  () => gulp.src('src/**/*.js')
    .pipe(babel({
			babelrc: false,
      "plugins": [
        "@babel/plugin-proposal-async-generator-functions",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-function-bind",
        "@babel/plugin-proposal-logical-assignment-operators",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-optional-catch-binding",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-pipeline-operator",
        "@babel/plugin-proposal-throw-expressions",
      ],
      "presets": [
        "@babel/preset-flow",
        "@babel/preset-react"
      ]
		}))
    .pipe(gulp.dest('_artifact'))
);

gulp.task(
  'artifact-compile',
  shell.task('relay-compiler --src _artifact/client --schema src/server/schema.graphql')
);

gulp.task(
  'artifact-copy',
  shell.task('cp -r _artifact/client/views/__generated__ src/client/views/__generated__')
);

gulp.task(
  'artifact',
  gulp.series(
    'artifact-clean',
    'artifact-purge',
    'artifact-transform',
    'artifact-compile',
    'artifact-copy'
  )
);

gulp.task('lint-flow', shell.task('flow'));

gulp.task('lint-sass', shell.task('sass-lint src/**/*.scss'));

gulp.task('lint', gulp.series('lint-flow', 'lint-sass'));

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

gulp.task('build-client-remote', function () {
  return gulp.src('_build/client/index.remote.js')
    .pipe(browserify(
      { transform: ['babelify'] }
    ))
    .pipe(uglify())
    .pipe(gulp.dest('_bin/client'));
});

gulp.task('build-client-local', function () {
  return gulp.src('_build/client/index.local.js')
    .pipe(sourcemaps.init())
    .pipe(browserify(
      { transform: ['babelify'] }
    ))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('_bin/client'));
});

gulp.task('build-server-remote', function () {
  return gulp.src('_build/server/index.remote.js')
    .pipe(rollup(
      { plugins: [
        rollupBabel({
          babelrc: false,
          exclude: 'node_modules/**',
          "presets": [
            [
              "@babel/preset-env",
              { "modules": false }
            ],
            "@babel/preset-flow",
            "@babel/preset-react"
          ]
        }),
      ] },
      { format: 'cjs' }
    ))
    .pipe(uglify())
    .pipe(gulp.dest('_bin/server'));
});

gulp.task('build-server-local', function () {
  return gulp.src('_build/server/index.local.js')
    .pipe(sourcemaps.init())
    .pipe(rollup(
      { plugins: [
        rollupBabel({
          babelrc: false,
          exclude: 'node_modules/**',
          "presets": [
            [
              "@babel/preset-env",
              { "modules": false }
            ],
            "@babel/preset-flow",
            "@babel/preset-react"
          ]
        }),
      ] },
      { format: 'cjs' }
    ))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('_bin/server'));
});

gulp.task('build-graphql', function () {
  return gulp.src('_build/server/schema.graphql')
    .pipe(gulp.dest('_bin/server'));
});

gulp.task('build', gulp.series('lint', 'build-copy', 'build-html', 'build-sass', 'build-material', 'build-client-remote', 'build-client-local', 'build-server-remote', 'build-server-local', 'build-graphql'));

gulp.task('prepare', shell.task('cp _bin/client/index.local.js _bin/client/index.js && cp _bin/server/index.local.js _bin/server/index.js'));

gulp.task('localhost', shell.task('source secrets && DEBUG=* node _bin/server/index.js'));

gulp.task('start', gulp.series('prepare', 'localhost'));

gulp.task('migrate-build', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('_sql'));
});

gulp.task('migrate-run', shell.task('source secrets && node_modules/.bin/sequelize db:migrate'));

gulp.task('migrate', gulp.series('migrate-build', 'migrate-run'));
