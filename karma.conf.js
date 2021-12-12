var webpackConfig = require('./build/webpack.component.js')

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],

    files: ['tests/index.js'],

    preprocessors: {
      'tests/index.js': ['webpack']
    },

    webpack: webpackConfig,

    reporters: ['spec'],

    browsers: ['Chrome']
  })
}