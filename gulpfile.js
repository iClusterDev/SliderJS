const del = require("del");
const path = require("path");
const gulp = require("gulp");
const sass = require("gulp-sass");
const strip = require("gulp-strip-comments");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();

const HTML_SRC = `src/**/*.html`;
const HTML_DEST = `./dist/`;
const html = done => {
  gulp
    .src(HTML_SRC)
    .pipe(strip())
    .pipe(gulp.dest(HTML_DEST))
    .pipe(browserSync.stream());
  done();
};

const CSS_SRC = `src/scss/**/*.scss`;
const CSS_DEST = `./dist/css/`;
const css = done => {
  gulp
    .src(CSS_SRC)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        errorLogToConsole: true,
        outputStyle: "compressed"
      })
    )
    .on("error", console.error.bind(console))
    .pipe(
      autoprefixer({
        cascade: false,
        grid: true
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(CSS_DEST))
    .pipe(browserSync.stream());
  done();
};

const JS_SRC = `src/js/`;
const JS_DEST = `./dist/js/`;
const JS_FILES = ["slider.js"];
function js(done) {
  JS_FILES.map(file => {
    return browserify({
      entries: [JS_SRC + file]
    })
      .transform(babelify, { presets: ["@babel/preset-env"] })
      .bundle()
      .pipe(source(file))
      .pipe(rename({ extname: ".min.js" }))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest(JS_DEST))
      .pipe(browserSync.stream());
  });
  done();
}

const IMG_SRC = `src/img/**/*.*`;
const IMG_DEST = `./dist/img/`;
const img = done => {
  gulp.src(IMG_SRC).pipe(gulp.dest(IMG_DEST));
  done();
};

const deleteFile = async file => {
  await del([file]);
};

const watch = () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch(`src/js/**/*.js`, js);
  gulp.watch(`src/scss/**/*.scss`, css);
  gulp.watch(`src/**/*.html`, { events: ["change", "add"] }, html).on("unlink", function(file) {
    deleteFile(`./dist/${path.basename(file)}`).then(browserSync.reload);
  });
  gulp.watch(`src/img/**/*.*`, { events: ["change", "add"] }, img).on("unlink", function(file) {
    deleteFile(`./dist/img/${path.basename(file)}`).then(browserSync.reload);
  });
  gulp.watch(`./dist/**/*.html`).on("change", browserSync.reload);
};

exports.build = gulp.parallel(css, js, img, html);
exports.default = gulp.series(gulp.parallel(css, js, img, html), watch);
