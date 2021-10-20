var fs = require("fs");
var save = require("file-save");
var resolve = require("path").resolve;
var basename = require("path").basename;
var localePath = resolve(__dirname, "../src/locale/lang");
var fileList = fs.readdirSync(localePath);
const minify = require("terser").minify;

var transform = function(filename, name, cb) {
  require("@babel/core").transformFile(
    resolve(localePath, filename),
    {
      plugins: [
        "@babel/plugin-transform-modules-umd",
        //   ['transform-es2015-modules-umd', {loose: true}]
      ],
      moduleId: name,
    },
    cb
  );
};

fileList
  .filter(function(file) {
    return /\.js$/.test(file);
  })
  .forEach(function(file) {
    var name = basename(file, ".js");

    transform(file, name, function(err, result) {
      if (err) {
        console.log(` Generate lang package: ${file} faild`);
        console.error(err);
      } else {
        var code = result.code;

        code = code.replace('define("', 'define("element-ui-saas-extend/locale/').replace("global.", "global.ElementUISaaSExtend.lang = global.ElementUISaaSExtend.lang || {}; \n    global.ElementUISaaSExtend.lang.");
        minify(code).then(function(result) {
          save(resolve(__dirname, "../lib/locale", file)).write(result.code);

          console.log(` Generate lang package: ${file} success`);
        });
      }
    });
  });
