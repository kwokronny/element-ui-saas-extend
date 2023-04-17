var webpackConfig = require("./build/webpack.test.js");
var path = require("path")

module.exports = function (config) {
  config.set({
    frameworks: ["mocha", "sinon-chai"],

    files: ["tests/index.js"],

    preprocessors: {
      "tests/index.js": ["webpack"],
    },

    webpack: webpackConfig,

    coverageIstanbulReporter: {
      // 以什么格式, 这里设置了输出 html文件 ,info文件 ,及控制台
      reports: ['html', 'lcovonly', 'text-summary'],
      // 将文件输出路径定位
      dir: path.join(__dirname, 'coverage'),
      // 修正 weback 路径（翻译了是这个意思）
      fixWebpackSourcePaths: true,
      // 将生成的html放到./coverage/html/下
      'report-config': {
        html: {
          subdir: 'html'
        }
      }
    },
    reporters: ["spec", 'coverage-istanbul'],

    browsers: ["ChromeHeadless"],
    client: {
      mocha: {
        timeout: 10000,
      },
    },
  });
};
