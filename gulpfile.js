// @flow

var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var rollup = require('gulp-better-rollup');
var rollupBabel = require('rollup-plugin-babel');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task(
  'delete-all-artifacts',
  shell.task('rm -rf _*')
);

gulp.task(
  'delete-flow-typed',
  shell.task('rm -rf flow-typed && rm -rf .flow-typed-cache')
);

gulp.task(
  'delete-node-modules',
  shell.task('rm -rf node_modules')
);

gulp.task(
  'delete-yarn-lock',
  shell.task('rm -rf yarn*')
);

gulp.task(
  'yarn-install',
  shell.task('yarn install')
);

gulp.task(
  'yarn-upgrade',
  shell.task('yarn upgrade --latest')
);

gulp.task(
  'flow-typed',
  shell.task('yarn flow-typed install')
);

gulp.task(
  'prep',
  gulp.series(
    gulp.parallel(
      'delete-all-artifacts',
      'delete-flow-typed',
      'delete-node-modules',
      'delete-yarn-lock'
    ),
    'yarn-install',
    gulp.parallel(
      'yarn-upgrade',
      'flow-typed',
    ),
  )
);

gulp.task(
  'compile-relay',
  shell.task('relay-compiler --src src/client --schema src/server/schema.graphql')
);

gulp.task(
  'flow-lint',
  shell.task('flow')
);

gulp.task(
  'sass-lint',
  shell.task('sass-lint src/**/*.scss')
);

gulp.task(
  'compile-test',
  () => gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('_test')),
);

gulp.task(
  'copy-test',
  () => gulp.src(['src/**/*.snap', 'src/**/*.graphql'])
    .pipe(gulp.dest('_test')),
);

gulp.task(
  'run-test',
  shell.task('jest _test/')
);

gulp.task(
  'test',
  gulp.series(
    'compile-relay',
    gulp.parallel(
      'flow-lint',
      'sass-lint',
      'compile-test',
      'copy-test'
    ),
    'run-test'
  )
);

gulp.task(
  'copy-html',
  () => gulp.src('src/client/static/index.html')
    .pipe(gulp.dest('_bin/client'))
);

gulp.task(
  'compile-sass',
  () => gulp.src('src/client/static/index.scss')
    .pipe(sass({includePaths: 'node_modules', outputStyle: 'compressed'}))
    .pipe(gulp.dest('_bin/client'))
);

gulp.task(
  'copy-images',
  () => gulp.src('src/client/static/images/*.jpg')
    .pipe(gulp.dest('_bin/client/images'))
);

gulp.task(
  'compile-local-client',
  () => gulp.src('src/client/index.js')
    .pipe(rename('index.local.js'))
    .pipe(sourcemaps.init())
    .pipe(browserify({
      transform: ['babelify']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('_bin/client'))
);

gulp.task(
  'compile-remote-client',
  () => gulp.src('src/client/index.js')
    .pipe(rename('index.remote.js'))
    .pipe(browserify(
      { transform: ['babelify'] }
    ))
    .pipe(uglify())
    .pipe(gulp.dest('_bin/client'))
);

gulp.task(
  'build-client',
  gulp.parallel(
    'copy-html',
    'compile-sass',
    'copy-images',
    'compile-local-client',
    'compile-remote-client'
  )
);

gulp.task(
  'copy-graphql',
  () => gulp.src('src/server/schema.graphql')
    .pipe(gulp.dest('_bin/server'))
);

gulp.task(
  'compile-local-server',
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
  'compile-remote-server',
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
    'copy-graphql',
    'compile-local-server',
    'compile-remote-server'
  )
);

gulp.task(
  'build',
  gulp.series(
    'compile-relay',
    gulp.parallel(
      'build-client',
      'build-server'
    ),
  )
);

gulp.task(
  'move-client',
  shell.task('cp _bin/client/index.local.js _bin/client/index.js')
);

gulp.task(
  'move-server',
  shell.task('cp _bin/server/index.local.js _bin/server/index.js')
);

gulp.task(
  'localhost',
  shell.task('DEBUG=* node _bin/server/index.js')
);

gulp.task(
  'start',
  gulp.series(
    gulp.parallel(
      'move-client',
      'move-server'
    ),
    'localhost'
  )
);

gulp.task(
  'compile-snap',
  () => gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('_snap'))
);

gulp.task(
  'run-snap',
  shell.task('jest -u _snap/client')
);

gulp.task(
  'update-snap',
  shell.task('cp -R _snap/client/__tests__/__snapshots__/ src/client/__tests__/__snapshots__/')
);

gulp.task(
  'snap',
  gulp.series(
    'compile-snap',
    'run-snap',
    'update-snap'
  )
);

gulp.task(
  'compile-sql',
  () => gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('_sql'))
);

gulp.task(
  'run-sql',
  shell.task('node_modules/.bin/sequelize db:migrate')
);

gulp.task(
  'sql',
  gulp.series(
    'compile-sql',
    'run-sql'
  )
);
