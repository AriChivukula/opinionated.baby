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
  'clean-relay',
  shell.task('relay-compiler --src src/client --schema src/server/schema.graphql')
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
    'clean-types',
    'clean-relay'
  )
);

gulp.task(
  'build-lint-flow',
  shell.task('flow')
);

gulp.task(
  'build-lint-sass',
  shell.task('sass-lint src/**/*.scss')
);

gulp.task(
  'build-lint',
  gulp.parallel(
    'build-lint-flow',
    'build-lint-sass'
  )
);

gulp.task(
  'build-test-transform',
  () => gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('_test')),
);

gulp.task(
  'build-test-copy',
  () => gulp.src(['src/**/*.snap', 'src/**/*.graphql'])
    .pipe(gulp.dest('_test')),
);

gulp.task(
  'build-test-run',
  shell.task('touch secrets && . secrets && jest _test/')
);

gulp.task(
  'build-test',
  gulp.series(
    'build-test-transform',
    'build-test-copy',
    'build-test-run'
  )
);

gulp.task(
  'build-client-html',
  () => gulp.src('src/client/static/index.html')
    .pipe(gulp.dest('_bin/client'))
);

gulp.task(
  'build-client-sass',
  () => gulp.src('src/client/static/index.scss')
    .pipe(sass())
    .pipe(gulp.dest('_bin/client'))
);

gulp.task(
  'build-client-material',
  () => gulp.src('node_modules/material-components-web/dist/material-components-web.min.css')
    .pipe(gulp.dest('_bin/client'))
);

gulp.task(
  'build-client-local',
  () => gulp.src('src/client/index.local.js')
    .pipe(sourcemaps.init())
    .pipe(browserify({
      transform: ['babelify']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('_bin/client'))
);

gulp.task(
  'build-client-remote',
  () => gulp.src('src/client/index.remote.js')
    .pipe(browserify(
      { transform: ['babelify'] }
    ))
    .pipe(uglify())
    .pipe(gulp.dest('_bin/client'))
);

gulp.task(
  'build-client',
  gulp.parallel(
    'build-client-html',
    'build-client-sass',
    'build-client-material',
    'build-client-local',
    'build-client-remote'
  )
);

gulp.task(
  'build-server-graphql',
  () => gulp.src('src/server/schema.graphql')
    .pipe(gulp.dest('_bin/server'))
);

gulp.task(
  'build-server-local',
  () => gulp.src('src/server/index.local.js')
    .pipe(sourcemaps.init())
    .pipe(rollup(
      {
        plugins: [
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
        ]
      },
      { format: 'cjs' }
    ))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('_bin/server'))
);

gulp.task(
  'build-server-remote',
  () => gulp.src('src/server/index.remote.js')
    .pipe(rollup(
      {
        plugins: [
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
        ]
      },
      { format: 'cjs' }
    ))
    .pipe(uglify())
    .pipe(gulp.dest('_bin/server'))
);

gulp.task(
  'build-server',
  gulp.parallel(
    'build-server-graphql',
    'build-server-local',
    'build-server-remote'
  )
);

gulp.task(
  'build',
  gulp.parallel(
    'build-lint',
    'build-test',
    'build-client',
    'build-server'
  )
);

gulp.task(
  'start-client',
  shell.task('cp _bin/client/index.local.js _bin/client/index.js')
);

gulp.task(
  'start-server',
  shell.task('cp _bin/server/index.local.js _bin/server/index.js')
);

gulp.task(
  'start-localhost',
  shell.task('touch secrets && . secrets && DEBUG=* node _bin/server/index.js')
);

gulp.task(
  'start',
  gulp.series(
    gulp.parallel(
      'start-client',
      'start-server'
    ),
    'start-localhost'
  )
);

gulp.task(
  'sql-build',
  () => gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('_sql'))
);

gulp.task(
  'sql-run',
  shell.task('touch secrets && . secrets && node_modules/.bin/sequelize db:migrate')
);

gulp.task(
  'sql',
  gulp.series(
    'sql-build',
    'sql-run'
  )
);
