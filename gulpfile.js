"use strict";

const { src, dest } = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");
const ts = require("gulp-typescript");

exports.theme = () => {
  return src("./packages/theme-chalk/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["ie > 9", "last 2 versions"],
        cascade: false,
      })
    )
    .pipe(cssmin())
    .pipe(dest("./lib/theme-chalk"));
};

exports.lang = () => {
  return src("./src/locale/lang/*.ts")
    .pipe(
      ts({
        noImplicitAny: true,
        outFile: "output.js",
      })
    )
    .pipe(dest("./lib/locale/lang"));
  ts.createProject("./tsconfig.json");
  return tsResult.js.pipe(dest("./lib/locale/lang"));
};
