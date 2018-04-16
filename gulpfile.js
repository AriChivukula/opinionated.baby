var gulp = require("gulp");
var babel = require("gulp-babel");
var browserify = require("browserify");
var sass = require("gulp-sass");
var shell = require("gulp-shell");
var ts = require("gulp-typescript");
var source = require("vinyl-source-stream");
var uglify = require('gulp-uglify');

var project = ts.createProject("tsconfig.json");

/* PREP */

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
  "prep",
  gulp.series(
    gulp.parallel(
      "delete-artifacts",
      "delete-modules",
      "delete-yarn"
    ),
    "modules",
  ),
);

/* BUILD */

gulp.task(
  "src-relay",
  shell.task("relay-compiler --src src/ --schema src/server/schema.graphql --language typescript"),
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
    "src-relay",
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
    .pipe(babel({
      plugins: ["relay"],
      presets: ["@babel/preset-env"],
    }))
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
  "stage2-application",
  () => browserify({
    bundleExternal: false,
    entries: "_stage1/application/index.js",
    detectGlobals: false,
    node: true,
  })
    .bundle()
    .pipe(source("index.js"))
    .pipe(gulp.dest("_stage2/application")),
);

gulp.task(
  "stage2-server",
  () => browserify({
    bundleExternal: false,
    entries: "_stage1/server/index.js",
    detectGlobals: false,
    node: true,
  })
    .bundle()
    .pipe(source("index.js"))
    .pipe(gulp.dest("_stage2/server")),
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
  "stage2-website",
  () => browserify({
    entries: "_stage1/website/index.js",
    ignore: ["electron"],
  })
    .bundle()
    .pipe(source("index.js"))
    .pipe(gulp.dest("_stage2/website")),
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
  "stage3-static",
  () => gulp.src([
    "_stage1/**/*.css",
    "_stage1/**/*.graphql",
    "_stage1/**/*.html",
    "_stage1/**/*.jpg",
    "_stage1/**/*.png",
    "_stage1/**/*.txt",
  ])
    .pipe(gulp.dest("_stage3")),
);

gulp.task(
  "stage3-uglify",
  () => gulp.src("_stage2/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("_stage3")),
);

gulp.task(
  "stage3",
  gulp.parallel(
    "stage3-static",
    "stage3-uglify",
  ),
);

gulp.task(
  "build",
  gulp.series(
    "stage0",
    "stage1",
    "stage2",
    "stage3",
  ),
);

/* TEST */

gulp.task(
  "test",
  shell.task("jest --collectCoverage"),
);

/* SERVE */

gulp.task(
  "website-static",
  shell.task("cp _stage2/website/index.js _stage2/website/static/index.js"),
);

gulp.task(
  "website-host",
  shell.task("DEBUG=* node _stage2/server/index.js"),
);

gulp.task(
  "serve",
  gulp.series(
    "website-static",
    "website-host",
  ),
);

/* LAUNCH */

gulp.task(
  "application-static",
  shell.task("cp -R _stage2/website/static/ _stage2/application/static/"),
);

gulp.task(
  "application-run",
  shell.task("ELECTRON_ENABLE_LOGGING=1 DEBUG=* electron _stage2/application/index.js"),
);

gulp.task(
  "launch",
  gulp.series(
    "website-static",
    "application-static",
    "application-run",
  ),
);

/* SNAP */

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
    "jest-snap",
    "copy-snap",
  ),
);

/* SQL */

gulp.task(
  "sql-sync",
  shell.task("typeorm schema:sync"),
);

gulp.task(
  "sql",
  gulp.series(
    "sql-sync",
  ),
);
