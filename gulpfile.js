var gulp = require("gulp");
var babel = require("gulp-babel");
var bro = require("gulp-bro");
var cached = require("gulp-cached");
var remember = require("gulp-remember");
var replace = require("gulp-string-replace");
var rollup = require("rollup-stream");
var sass = require("gulp-sass");
var shell = require("gulp-shell");
var source = require("vinyl-source-stream");
var sourcemaps = require("gulp-sourcemaps");
var ts = require("gulp-typescript");

var pkg = require("./package.json");
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
  "prep:delete:npm",
  shell.task("rm -rf package-lock.json"),
);

gulp.task(
  "prep:install",
  shell.task("npm install"),
);

gulp.task(
  "prep",
  gulp.series(
    gulp.parallel(
      "prep:delete:artifacts",
      "prep:delete:modules",
      "prep:delete:npm"
    ),
    "prep:install",
  ),
);

/* CODEGEN */

gulp.task(
  "codegen",
  shell.task("ts-node node_modules/.bin/typescriptase gen/**/*.ts gen/**/**/*.ts"),
);

/* BUILD */

gulp.task(
  "build:0:artifact",
  shell.task("relay-compiler --src src/ --schema src/server/schema.graphql --language typescript"),
);

gulp.task(
  "build:0:lint:sass",
  shell.task("sass-lint src/**/*.scss"),
);

gulp.task(
  "build:0:lint:typescript",
  shell.task("tslint -p . src/**/*.tsx src/**/*.ts"),
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
  () => gulp.src(["src/**/*.ts", "src/**/*.tsx"])
    .pipe(cached("build:1:typescript"))
    .pipe(remember("build:1:typescript"))
    .pipe(sourcemaps.init())
    .pipe(project())
    .js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("_build_1")),
);

gulp.task(
  "build:1:relay",
  shell.task("relay-compiler --src _build_1/ --schema src/server/schema.graphql"),
);

gulp.task(
  "build:1",
  gulp.series(
    "build:1:typescript",
    "build:1:relay",
  ),
);

gulp.task(
  "build:2:application",
  () => gulp.src("_build_1/application/**/*.js")
    .pipe(cached("build:2:application"))
    .pipe(remember("build:2:application"))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(babel({
      presets: ["@babel/preset-env"],
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("_build_2/application")),
);

gulp.task(
  "build:2:html",
  () => gulp.src("src/**/*.html")
    .pipe(cached("build:2:html"))
    .pipe(remember("build:2:html"))
    .pipe(replace("ENV_TITLE", pkg.title))
    .pipe(gulp.dest("_build_2")),
);

gulp.task(
  "build:2:sass",
  () => gulp.src("src/**/*.scss")
    .pipe(cached("build:2:sass"))
    .pipe(remember("build:2:sass"))
    .pipe(sass({
      includePaths: "node_modules",
      outputStyle: "compressed",
    }))
    .pipe(gulp.dest("_build_2")),
);

gulp.task(
  "build:2:server",
  () => gulp.src("_build_1/server/**/*.js")
    .pipe(cached("build:2:server"))
    .pipe(remember("build:2:server"))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(babel({
      presets: [["@babel/preset-env", { "modules": false }]],
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("_build_2/server")),
);

gulp.task(
  "build:2:static",
  () => gulp.src("src/**/*.@(graphql|jpg|png|snap|txt)")
    .pipe(cached("build:2:static"))
    .pipe(remember("build:2:static"))
    .pipe(gulp.dest("_build_2")),
);

gulp.task(
  "build:2:website",
  () => gulp.src("_build_1/website/**/*.js")
    .pipe(cached("build:2:website"))
    .pipe(remember("build:2:website"))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(babel({
      plugins: ["relay"],
      presets: ["@babel/preset-env"],
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("_build_2/website")),
);

gulp.task(
  "build:2",
  gulp.parallel(
    "build:2:application",
    "build:2:html",
    "build:2:sass",
    "build:2:server",
    "build:2:static",
    "build:2:website",
  ),
);

gulp.task(
  "build:3:application",
  () => gulp.src("_build_2/application/index.js")
    .pipe(bro({
      bundleExternal: false,
      detectGlobals: false,
      node: true,
      transform: [["uglifyify", { global: true, sourceMap: false }]],
    }))
    .pipe(gulp.dest("_build_3/application")),
);

let cache = null;
gulp.task(
  "build:3:server",
  () => rollup({
    cache: cache,
    input: "_build_2/server/index.js",
    format: "cjs",
  })
    .on("bundle", (bundle) => {
      cache = bundle;
    })
    .pipe(source("index.js"))
    .pipe(gulp.dest("_build_3/server")),
);

gulp.task(
  "build:3:static",
  () => gulp.src("_build_2/**/*.@(css|graphql|html|jpg|png|txt)")
    .pipe(gulp.dest("_build_3")),
);

gulp.task(
  "build:3:website",
  () => gulp.src("_build_2/website/index.js")
    .pipe(bro({
      ignore: ["electron"],
      transform: [["uglifyify", { global: true, sourceMap: false }]],
    }))
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
  "build",
  gulp.series(
    "build:0",
    "build:1",
    "build:2",
    "build:3",
  ),
);

/* WATCH */

gulp.task(
  "watch:incremental",
  () => gulp.watch("src/**/*", gulp.series("build")),
);

gulp.task(
  "watch",
  gulp.series(
    "build",
    "watch:incremental",
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
  shell.task("ts-node ./node_modules/.bin/typeorm schema:sync"),
);
