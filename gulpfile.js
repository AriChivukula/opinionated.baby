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
  shell.task("rm -rf _stage*"),
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
  "stage0-typescript",
  () => gulp.src(["src/**/*.tsx"])
    .pipe(project())
    .js
    .pipe(gulp.dest("_stage0")),
);

gulp.task(
  "stage0-typescript-lint",
  shell.task("tslint -p . **/*.tsx"),
);

gulp.task(
  "stage0-relay",
  shell.task("relay-compiler --src _stage0/ --schema src/server/schema.graphql"),
);

gulp.task(
  "stage0",
  gulp.series(
    gulp.parallel(
      "stage0-typescript",
      "stage0-typescript-lint",
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
  "stage1-sass",
  () => gulp.src("src/**/*.scss")
    .pipe(sass({
      includePaths: "node_modules",
      outputStyle: "compressed",
    }))
    .pipe(gulp.dest("_stage1")),
);

gulp.task(
  "stage1-sass-lint",
  shell.task("sass-lint src/**/*.scss"),
);

gulp.task(
  "stage1-static",
  () => gulp.src([
    "src/**/*.graphql",
    "src/**/*.html",
    "src/**/*.jpg",
    "src/**/*.png",
    "src/**/*.snap",
    "src/**/*.txt",
  ])
    .pipe(gulp.dest("_stage1")),
);

gulp.task(
  "stage1",
  gulp.parallel(
    "stage1-babel",
    "stage1-sass",
    "stage1-sass-lint",
    "stage1-static",
  ),
);

gulp.task(
  "jest",
  shell.task("jest --collectCoverage"),
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
  "stage2-application-local",
  () => gulp.src("_stage1/application/index.js")
    .pipe(sourcemaps.init({
      loadMaps: true,
    }))
    .pipe(rollup(
      {},
      {
        format: "cjs",
      },
    ))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename("index.local.js"))
    .pipe(gulp.dest("_stage2/application")),
);

gulp.task(
  "stage2-application-remote",
  () => gulp.src("_stage2/application/index.local.js")
    .pipe(rename("index.remote.js"))
    .pipe(sourcemaps.init({
      loadMaps: true,
    }))
    .pipe(purgeSourcemaps())
    .pipe(uglify())
    .pipe(gulp.dest("_stage2/application")),
);

gulp.task(
  "stage2-application",
  gulp.series(
    "stage2-application-local",
    "stage2-application-remote",
  ),
);

gulp.task(
  "stage2-server-local",
  () => gulp.src("_stage1/server/index.js")
    .pipe(sourcemaps.init({
      loadMaps: true,
    }))
    .pipe(rollup(
      {},
      {
        format: "cjs",
      },
    ))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename("index.local.js"))
    .pipe(gulp.dest("_stage2/server")),
);

gulp.task(
  "stage2-server-remote",
  () => gulp.src("_stage2/server/index.local.js")
    .pipe(rename("index.remote.js"))
    .pipe(sourcemaps.init({
      loadMaps: true,
    }))
    .pipe(purgeSourcemaps())
    .pipe(uglify())
    .pipe(gulp.dest("_stage2/server")),
);

gulp.task(
  "stage2-server",
  gulp.series(
    "stage2-server-local",
    "stage2-server-remote",
  ),
);

gulp.task(
  "stage2-static",
  () => gulp.src([
    "_stage1/**/*.css",
    "_stage1/**/*.graphql",
    "_stage1/**/*.html",
    "_stage1/**/*.jpg",
    "_stage1/**/*.png",
    "_stage1/**/*.txt",
  ])
    .pipe(gulp.dest("_stage2")),
);

gulp.task(
  "stage2-website-local",
  () => gulp.src("_stage1/website/index.js")
    .pipe(rename("index.local.js"))
    .pipe(sourcemaps.init({
      loadMaps: true,
    }))
    .pipe(browserify({
      ignore: ["electron"],
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("_stage2/website")),
);

gulp.task(
  "stage2-website-remote",
  () => gulp.src("_stage2/website/index.local.js")
    .pipe(rename("index.remote.js"))
    .pipe(sourcemaps.init({
      loadMaps: true,
    }))
    .pipe(purgeSourcemaps())
    .pipe(uglify())
    .pipe(gulp.dest("_stage2/website")),
);

gulp.task(
  "stage2-website",
  gulp.series(
    "stage2-website-local",
    "stage2-website-remote",
  ),
);

gulp.task(
  "stage2",
  gulp.parallel(
    "stage2-application",
    "stage2-server",
    "stage2-static",
    "stage2-website",
  ),
);

gulp.task(
  "build",
  gulp.series(
    "stage0",
    "stage1",
    "stage2",
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
