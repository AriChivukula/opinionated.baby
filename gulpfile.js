var gulp = require("gulp");
var babel = require("gulp-babel");
var browserify = require("gulp-browserify");
var purgeSourcemaps = require("gulp-purge-sourcemaps");
var rename = require("gulp-rename");
var rollup = require("gulp-better-rollup");
var sass = require("gulp-sass");
var shell = require("gulp-shell");
var sourcemaps = require("gulp-sourcemaps");
var ts = require("gulp-typescript");
var uglify = require("gulp-uglify");

var project = ts.createProject("tsconfig.json");

gulp.task(
  "delete-artifacts",
  shell.task("rm -rf _stage"),
);

gulp.task(
  "delete-modules",
  shell.task("rm -rf node_modules"),
);

gulp.task(
  "delete-yarn",
  shell.task("rm -rf yarn*"),
);

gulp.task(
  "modules",
  shell.task("yarn install"),
);

gulp.task(
  "relay",
  shell.task("relay-compiler --src src/ --schema src/server/schema.graphql --language typescript"),
);

gulp.task(
  "prep",
  gulp.series(
    gulp.parallel(
      "delete-artifacts",
      "delete-modules",
      "delete-yarn"
    ),
    "modules",
    "relay",
  ),
);

gulp.task(
  "stage0-sass-lint",
  shell.task("sass-lint src/**/*.scss"),
);

gulp.task(
  "stage0-typescript-lint",
  shell.task("tslint -p . **/*.tsx"),
);

gulp.task(
  "stage0-copy",
  () => gulp.src([
    "src/**/*.html",
    "src/**/*.jpg",
    "src/**/*.png",
    "src/**/*.snap",
    "src/**/*.txt",
  ])
    .pipe(gulp.dest("_stage0")),
);

gulp.task(
  "stage0-sass",
  () => gulp.src("src/**/*.scss")
    .pipe(sass({
      includePaths: "node_modules",
      outputStyle: "compressed",
    }))
    .pipe(gulp.dest("_stage0")),
);

gulp.task(
  "stage0-typescript",
  () => gulp.src(["src/**/*.tsx"])
    .pipe(project())
    .js
    .pipe(gulp.dest("_stage0")),
);

gulp.task(
  "stage0-relay",
  shell.task("relay-compiler --src _stage0/ --schema src/server/schema.graphql"),
);

gulp.task(
  "stage0",
  gulp.series(
    gulp.parallel(
      "stage0-sass-lint",
      "stage0-typescript-lint",
    ),
    gulp.parallel(
      "stage0-copy",
      "stage0-sass",
      "stage0-typescript",
    ),
    "stage0-relay",
  ),
);

gulp.task(
  "stage1-babel",
  () => gulp
    .src("_stage0/**/*.js")
    .pipe(sourcemaps.init({
      loadMaps: true,
    }))
    .pipe(babel({
      plugins: [[
        "relay",
        {
          "schema": "src/server/schema.graphql",
        },
      ]],
      presets: ["@babel/preset-env"],
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("_stage1")),
);

gulp.task(
  "stage1-copy",
  () => gulp.src([
    "src/**/*.graphql",
    "_stage0/**/*.css",
    "_stage0/**/*.html",
    "_stage0/**/*.jpg",
    "_stage0/**/*.png",
    "_stage0/**/*.snap",
    "_stage0/**/*.txt",
  ])
    .pipe(gulp.dest("_stage1")),
);

gulp.task(
  "stage1",
  gulp.parallel(
    "stage1-babel",
    "stage1-copy",
  ),
);

gulp.task(
  "jest",
  shell.task("jest --collectCoverage _stage1/"),
);

gulp.task(
  "test",
  gulp.series(
    "stage0",
    "stage1",
    "jest",
  ),
);

gulp.task(
  "copy-html",
  () => gulp.src("src/website/static/index.html")
    .pipe(gulp.dest("_bin/website")),
);

gulp.task(
  "compile-sass",
  () => gulp.src("src/website/static/index.scss")
    .pipe(sass({includePaths: "node_modules", outputStyle: "compressed"}))
    .pipe(gulp.dest("_bin/website")),
);

gulp.task(
  "copy-images",
  () => gulp.src([
    "src/website/static/images/*.jpg",
    "src/website/static/images/*.png"
  ])
    .pipe(gulp.dest("_bin/website/images")),
);

gulp.task(
  "compile-local-website",
  () => gulp.src("src/website/index.js")
    .pipe(rename("index.local.js"))
    .pipe(sourcemaps.init())
    .pipe(browserify({
      ignore: ["electron"],
      transform: ["babelify"]
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("_bin/website")),
);

gulp.task(
  "compile-remote-website",
  () => gulp.src("_bin/website/index.local.js")
    .pipe(rename("index.remote.js"))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(purgeSourcemaps())
    .pipe(uglify())
    .pipe(gulp.dest("_bin/website")),
);

gulp.task(
  "build-website",
  gulp.parallel(
    "copy-html",
    "compile-sass",
    "copy-images",
    gulp.series(
      "compile-local-website",
      "compile-remote-website"
    )
  ),
);

gulp.task(
  "copy-graphql",
  () => gulp.src("src/server/schema.graphql")
    .pipe(gulp.dest("_bin/server")),
);

gulp.task(
  "compile-local-server",
  () => gulp.src("src/server/index.js")
    .pipe(sourcemaps.init())
    .pipe(rollup(
      {
        plugins: [
          rollupBabel({
            babelrc: false,
            exclude: "node_modules/**",
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
      { format: "cjs" }
    ))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename("index.local.js"))
    .pipe(gulp.dest("_bin/server")),
);

gulp.task(
  "compile-remote-server",
  () => gulp.src("_bin/server/index.local.js")
    .pipe(rename("index.remote.js"))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(purgeSourcemaps())
    .pipe(uglify())
    .pipe(gulp.dest("_bin/server")),
);

gulp.task(
  "build-server",
  gulp.parallel(
    "copy-graphql",
    gulp.series(
      "compile-local-server",
      "compile-remote-server"
    )
  ),
);

gulp.task(
  "copy-application-static",
  () => gulp.src("_bin/website/**")
    .pipe(gulp.dest("_bin/application/static")),
);

gulp.task(
  "compile-local-application",
  () => gulp.src("src/application/index.js")
    .pipe(sourcemaps.init())
    .pipe(rollup(
      {
        plugins: [
          rollupBabel({
            babelrc: false,
            exclude: "node_modules/**",
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
      { format: "cjs" }
    ))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename("index.local.js"))
    .pipe(gulp.dest("_bin/application")),
);

gulp.task(
  "compile-remote-application",
  () => gulp.src("_bin/application/index.local.js")
    .pipe(rename("index.remote.js"))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(purgeSourcemaps())
    .pipe(uglify())
    .pipe(gulp.dest("_bin/application")),
);

gulp.task(
  "build-application",
  gulp.parallel(
    "copy-application-static",
    gulp.series(
      "compile-local-application",
      "compile-remote-application"
    )
  ),
);

gulp.task(
  "build",
  gulp.series(
    gulp.parallel(
      "build-website",
      "build-server"
    ),
    "build-application"
  ),
);

gulp.task(
  "move-website",
  shell.task("cp _bin/website/index.local.js _bin/website/index.js"),
);

gulp.task(
  "move-server",
  shell.task("cp _bin/server/index.local.js _bin/server/index.js"),
);

gulp.task(
  "localhost",
  shell.task("DEBUG=* node _bin/server/index.js"),
);

gulp.task(
  "serve",
  gulp.series(
    gulp.parallel(
      "move-website",
      "move-server"
    ),
    "localhost"
  ),
);

gulp.task(
  "move-application",
  shell.task("cp _bin/application/index.local.js _bin/application/index.js"),
);

gulp.task(
  "move-application-static",
  shell.task("cp _bin/application/static/index.local.js _bin/application/static/index.js"),
);

gulp.task(
  "localrun",
  shell.task("ELECTRON_ENABLE_LOGGING=1 DEBUG=* electron _bin/application/index.js"),
);

gulp.task(
  "launch",
  gulp.series(
    gulp.parallel(
      "move-application",
      "move-application-static"
    ),
    "localrun"
  ),
);

gulp.task(
  "jest-snap",
  shell.task("jest -u _stage1/website"),
);

gulp.task(
  "copy-snap",
  shell.task("cp -R _stage1/website/__tests__/__snapshots__/ src/website/__tests__/__snapshots__/"),
);

gulp.task(
  "snap",
  gulp.series(
    "stage0",
    "stage1",
    "jest-snap",
    "copy-snap",
  ),
);

gulp.task(
  "sql-sync",
  shell.task("typeorm schema:sync"),
);

gulp.task(
  "sql",
  gulp.series(
    "stage0",
    "stage1",
    "sql-sync",
  ),
);
