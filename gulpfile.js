"use strict";

const { series, src, dest } = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");
const ts = require("gulp-typescript");

exports.default = series(
  function transferSass() {
    return src("./packages/theme-chalk/*.scss")
      .pipe(sass.sync().on("error", sass.logError))
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["ie > 9", "last 2 versions"],
          cascade: false,
        })
      )
      .pipe(cssmin())
      .pipe(dest("./packages/theme-chalk/lib"));
  },
  function copyToDist() {
    return src("./packages/theme-chalk/lib/*.**").pipe(dest("./lib/theme-chalk"));
  }
);
