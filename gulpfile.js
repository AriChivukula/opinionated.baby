var gulp = require("gulp");
var babel = require("gulp-babel");
var bro = require("gulp-bro");
var replace = require("gulp-string-replace");
var rollup = require("rollup-stream");
var sass = require("gulp-sass");
var shell = require("gulp-shell");
var source = require("vinyl-source-stream");
var ts = require("gulp-typescript");
var uglify = require("rollup-plugin-uglify");

var pkg = require("./package.json");
var project = ts.createProject("tsconfig.json", { module: "ES2015", target: "ES2015" });

gulp.task(
  "build:1:typescript",
  () => gulp.src(["src/**/*.@(ts|tsx)"])
    .pipe(project())
    .js
    .pipe(gulp.dest("build/1")),
);

gulp.task(
  "build:1:relay",
  shell.task("relay-compiler --src build/1/ --schema src/server/schema.graphql"),
);

gulp.task(
  "build:1",
  gulp.series(
    "build:1:typescript",
    "build:1:relay",
  ),
);

gulp.task(
  "build:2:html",
  () => gulp.src("src/**/*.html")
    .pipe(replace("ENV_TITLE", pkg.title))
    .pipe(replace("ENV_VERSION", pkg.version))
    .pipe(gulp.dest("build/2")),
);

gulp.task(
  "build:2:sass",
  () => gulp.src("src/**/*.scss")
    .pipe(sass({
      includePaths: "node_modules",
      outputStyle: "compressed",
    }))
    .pipe(gulp.dest("build/2")),
);

gulp.task(
  "build:2:server",
  () => gulp.src("build/1/server/**/*.js")
    .pipe(babel({
      presets: [["@babel/preset-env", { "modules": false }]],
    }))
    .pipe(gulp.dest("build/2/server")),
);

gulp.task(
  "build:2:static",
  () => gulp.src("src/**/*.@(graphql|jpg|png)")
    .pipe(gulp.dest("build/2")),
);

gulp.task(
  "build:2:website",
  () => gulp.src("build/1/website/**/*.js")
    .pipe(babel({
      plugins: ["relay"],
      presets: ["@babel/preset-env"],
    }))
    .pipe(replace("ENV_BRANCH", process.env.TF_VAR_BRANCH))
    .pipe(replace("ENV_DOMAIN", process.env.TF_VAR_DOMAIN))
    .pipe(replace("ENV_NAME", process.env.TF_VAR_NAME))
    .pipe(gulp.dest("build/2/website")),
);

gulp.task(
  "build:2",
  gulp.parallel(
    "build:2:html",
    "build:2:sass",
    "build:2:server",
    "build:2:static",
    "build:2:website",
  ),
);

gulp.task(
  "build:3:server",
  () => rollup({
    input: "build/2/server/index.js",
    format: "cjs",
    plugins: [ uglify.uglify() ],
  })
    .pipe(source("index.js"))
    .pipe(gulp.dest("build/3/server")),
);

gulp.task(
  "build:3:static",
  () => gulp.src("build/2/**/*.@(css|graphql|html|jpg|png)")
    .pipe(gulp.dest("build/3")),
);

gulp.task(
  "build:3:website",
  () => gulp.src("build/2/website/index.js")
    .pipe(bro({
      transform: [["uglifyify", { global: true }]],
    }))
    .pipe(gulp.dest("build/3/website")),
);

gulp.task(
  "build:3",
  gulp.parallel(
    "build:3:server",
    "build:3:static",
    "build:3:website",
  ),
);

gulp.task(
  "build",
  gulp.series(
    "build:1",
    "build:2",
    "build:3",
  ),
);
