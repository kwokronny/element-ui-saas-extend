var webpackConfig = require("./build/webpack.test.js");

module.exports = function(config) {
  config.set({
    frameworks: ["mocha", "sinon-chai"],

    files: ["tests/index.js"],

    preprocessors: {
      "tests/index.js": ["webpack"],
    },

    webpack: webpackConfig,

    // coverageReporter: {
    //   dir: "./coverage",
    //   reporters: [{ type: "lcov", subdir: "." }, { type: "text-summary" }],
    // },
    reporters: ["spec"],

    browsers: ["Chrome"],
    client: {
      mocha: {
        timeout: 10000,
      },
    },
  });
};
