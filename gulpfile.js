var gulp = require('gulp');
var browserify = require('gulp-browserify');
var purgeSourcemaps = require('gulp-purge-sourcemaps');
var rename = require('gulp-rename');
var rollup = require('gulp-better-rollup');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task(
  'delete-all-artifacts',
  shell.task('rm -rf _*')
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
  'prep',
  gulp.series(
    gulp.parallel(
      'delete-all-artifacts',
      'delete-node-modules',
      'delete-yarn-lock'
    ),
    'yarn-install'
  )
);

gulp.task(
  'compile-relay',
  shell.task('relay-compiler --src src/ --schema src/server/schema.graphql --language typescript')
);

gulp.task(
  'typescript-lint',
  shell.task('tslint -p . src/**/*.tsx')
);

gulp.task(
  'sass-lint',
  shell.task('sass-lint src/**/*.scss')
);

gulp.task(
  'run-test',
  shell.task('jest --collectCoverage src/')
);

gulp.task(
  'test',
  gulp.series(
    'compile-relay',
    gulp.parallel(
      'typescript-lint',
      'sass-lint',
      'run-test'
    )
  )
);

gulp.task(
  'copy-html',
  () => gulp.src('src/website/static/index.html')
    .pipe(gulp.dest('_bin/website'))
);

gulp.task(
  'compile-sass',
  () => gulp.src('src/website/static/index.scss')
    .pipe(sass({includePaths: 'node_modules', outputStyle: 'compressed'}))
    .pipe(gulp.dest('_bin/website'))
);

gulp.task(
  'copy-images',
  () => gulp.src([
    'src/website/static/images/*.jpg',
    'src/website/static/images/*.png'
  ])
    .pipe(gulp.dest('_bin/website/images'))
);

gulp.task(
  'compile-local-website',
  () => gulp.src('src/website/index.js')
    .pipe(rename('index.local.js'))
    .pipe(sourcemaps.init())
    .pipe(browserify({
      ignore: ['electron'],
      transform: ['babelify']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('_bin/website'))
);

gulp.task(
  'compile-remote-website',
  () => gulp.src('_bin/website/index.local.js')
    .pipe(rename('index.remote.js'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(purgeSourcemaps())
    .pipe(uglify())
    .pipe(gulp.dest('_bin/website'))
);

gulp.task(
  'build-website',
  gulp.parallel(
    'copy-html',
    'compile-sass',
    'copy-images',
    gulp.series(
      'compile-local-website',
      'compile-remote-website'
    )
  )
);

gulp.task(
  'copy-graphql',
  () => gulp.src('src/server/schema.graphql')
    .pipe(gulp.dest('_bin/server'))
);

gulp.task(
  'compile-local-server',
  () => gulp.src('src/server/index.js')
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
    .pipe(rename('index.local.js'))
    .pipe(gulp.dest('_bin/server'))
);

gulp.task(
  'compile-remote-server',
  () => gulp.src('_bin/server/index.local.js')
    .pipe(rename('index.remote.js'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(purgeSourcemaps())
    .pipe(uglify())
    .pipe(gulp.dest('_bin/server'))
);

gulp.task(
  'build-server',
  gulp.parallel(
    'copy-graphql',
    gulp.series(
      'compile-local-server',
      'compile-remote-server'
    )
  )
);

gulp.task(
  'copy-application-static',
  () => gulp.src('_bin/website/**')
    .pipe(gulp.dest('_bin/application/static'))
);

gulp.task(
  'compile-local-application',
  () => gulp.src('src/application/index.js')
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
              "@babel/preset-flow"
            ]
          }),
        ]
      },
      { format: 'cjs' }
    ))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename('index.local.js'))
    .pipe(gulp.dest('_bin/application'))
);

gulp.task(
  'compile-remote-application',
  () => gulp.src('_bin/application/index.local.js')
    .pipe(rename('index.remote.js'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(purgeSourcemaps())
    .pipe(uglify())
    .pipe(gulp.dest('_bin/application'))
);

gulp.task(
  'build-application',
  gulp.parallel(
    'copy-application-static',
    gulp.series(
      'compile-local-application',
      'compile-remote-application'
    )
  )
);

gulp.task(
  'build',
  gulp.series(
    'compile-relay',
    gulp.parallel(
      'build-website',
      'build-server'
    ),
    'build-application'
  )
);

gulp.task(
  'move-website',
  shell.task('cp _bin/website/index.local.js _bin/website/index.js')
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
  'serve',
  gulp.series(
    gulp.parallel(
      'move-website',
      'move-server'
    ),
    'localhost'
  )
);

gulp.task(
  'move-application',
  shell.task('cp _bin/application/index.local.js _bin/application/index.js')
);

gulp.task(
  'move-application-static',
  shell.task('cp _bin/application/static/index.local.js _bin/application/static/index.js')
);

gulp.task(
  'localrun',
  shell.task('ELECTRON_ENABLE_LOGGING=1 DEBUG=* electron _bin/application/index.js')
);

gulp.task(
  'launch',
  gulp.series(
    gulp.parallel(
      'move-application',
      'move-application-static'
    ),
    'localrun'
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
  shell.task('jest -u _snap/website')
);

gulp.task(
  'update-snap',
  shell.task('cp -R _snap/website/__tests__/__snapshots__/ src/website/__tests__/__snapshots__/')
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
