module.exports = {
  lintOnSave: false,
  configureWebpack: {
    externals: {
      "element-ui": {
        root: "ELEMENT",
        commonjs: "element-ui",
        commonjs2: "element-ui",
        amd: "element-ui",
      },
      vue: {
        root: "Vue",
        commonjs: "vue",
        commonjs2: "vue",
        amd: "vue",
      },
    },
  }
};
