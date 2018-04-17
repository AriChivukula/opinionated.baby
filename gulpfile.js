var gulp = require("gulp");
var babel = require("gulp-babel");
var browserify = require("browserify");
var buffer = require("vinyl-buffer");
var sass = require("gulp-sass");
var shell = require("gulp-shell");
var source = require("vinyl-source-stream");
var ts = require("gulp-typescript");
var uglify = require("gulp-uglify");

var project = ts.createProject("tsconfig.json");

/* PREP */

gulp.task(
  "prep:delete:artifacts",
  shell.task("rm -rf _build*"),
);

gulp.task(
  "prep:delete:modules",
  shell.task("rm -rf node_modules"),
);

gulp.task(
  "prep:delete:yarn",
  shell.task("rm -rf yarn*"),
);

gulp.task(
  "prep:install",
  shell.task("yarn install"),
);

gulp.task(
  "prep",
  gulp.series(
    gulp.parallel(
      "prep:delete:artifacts",
      "prep:delete:modules",
      "prep:delete:yarn"
    ),
    "prep:install",
  ),
);

/* BUILD */

gulp.task(
  "build:0:artifact",
  shell.task("relay-compiler --quiet --src src/ --schema src/server/schema.graphql --language typescript"),
);

gulp.task(
  "build:0:lint:sass",
  shell.task("sass-lint src/**/*.scss"),
);

gulp.task(
  "build:0:lint:typescript",
  shell.task("tslint -p . **/*.tsx"),
);

gulp.task(
  "build:0",
  gulp.series(
    "build:0:artifact",
    gulp.parallel(
      "build:0:lint:sass",
      "build:0:lint:typescript",
    ),
  ),
);

gulp.task(
  "build:1:typescript",
  () => gulp.src(["src/**/*.tsx"])
    .pipe(project())
    .js
    .pipe(gulp.dest("_build_1")),
);

gulp.task(
  "build:1:relay",
  shell.task("relay-compiler --quiet --src _build_1/ --schema src/server/schema.graphql"),
);

gulp.task(
  "build:1",
  gulp.series(
    "build:1:typescript",
    "build:1:relay",
  ),
);

gulp.task(
  "build:2:babel",
  () => gulp.src("_build_1/**/*.js")
    .pipe(babel({
      plugins: ["relay"],
      presets: ["@babel/preset-env"],
    }))
    .pipe(gulp.dest("_build_2")),
);

gulp.task(
  "build:2:sass",
  () => gulp.src("src/**/*.scss")
    .pipe(sass({
      includePaths: "node_modules",
      outputStyle: "compressed",
    }))
    .pipe(gulp.dest("_build_2")),
);

gulp.task(
  "build:2:static",
  () => gulp.src("src/**/*.@(css|graphql|html|jpg|png|snap|txt)")
    .pipe(gulp.dest("_build_2")),
);

gulp.task(
  "build:2",
  gulp.parallel(
    "build:2:babel",
    "build:2:sass",
    "build:2:static",
  ),
);

gulp.task(
  "build:3:application",
  () => browserify({
    bundleExternal: false,
    entries: "_build_2/application/index.js",
    detectGlobals: false,
    node: true,
  })
    .bundle()
    .pipe(source("index.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("_build_3/application")),
);

gulp.task(
  "build:3:server",
  () => browserify({
    bundleExternal: false,
    entries: "_build_2/server/index.js",
    detectGlobals: false,
    node: true,
  })
    .bundle()
    .pipe(source("index.js"))
    .pipe(gulp.dest("_build_3/server")),
);

gulp.task(
  "build:3:static",
  () => gulp.src("_build_2/**/*.@(css|graphql|html|jpg|png|snap|txt)")
    .pipe(gulp.dest("_build_3")),
);

gulp.task(
  "build:3:website",
  () => browserify({
    entries: "_build_2/website/index.js",
    ignore: ["electron"],
  })
    .bundle()
    .pipe(source("index.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("_build_3/website")),
);

gulp.task(
  "build:3",
  gulp.parallel(
    "build:3:application",
    "build:3:server",
    "build:3:static",
    "build:3:website",
  ),
);

gulp.task(
  "build:full",
  gulp.series(
    "build:0",
    "build:1",
    "build:2",
    "build:3",
  ),
);

gulp.task(
  "build:incremental",
  () => gulp.watch("src/**/*", gulp.series("build:full")),
);

gulp.task(
  "build",
  gulp.series(
    "build:full",
    "build:incremental",
  ),
);

/* TEST */

gulp.task(
  "test",
  shell.task("jest --collectCoverage"),
);

/* SERVE */

gulp.task(
  "serve",
  shell.task("DEBUG=* node _build_3/server/index.js"),
);

/* LAUNCH */

gulp.task(
  "launch",
  shell.task("ELECTRON_ENABLE_LOGGING=1 DEBUG=* electron _build_3/application/index.js"),
);

/* SNAP */

gulp.task(
  "snap:jest",
  shell.task("jest -u _build_2/website"),
);

gulp.task(
  "snap:copy",
  shell.task("cp -R _build_2/website/__tests__/__snapshots__/ src/website/__tests__/__snapshots__/"),
);

gulp.task(
  "snap",
  gulp.series(
    "snap:jest",
    "snap:copy",
  ),
);

/* SQL */

gulp.task(
  "sql",
  shell.task("typeorm schema:sync"),
);
