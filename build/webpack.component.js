/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");

const Components = {
  "element-ui-saas-extend": "./packages/index.ts",
  "form-auto": "./packages/FormAuto/index.ts",
  copy: "./src/mixin/copy.ts",
  "table-page": "./packages/TablePage/index.ts",
  "number-range": "./packages/NumberRange/index.ts",
};

const webpackConfig = {
  mode: "production",
  entry: Components,
  stats: {
    assets: true,
    modules: false,
    entrypoints: false,
  },
  output: {
    path: path.resolve(process.cwd(), "lib"),
    publicPath: "/lib/",
    filename: "[name].js",
    chunkFilename: "[id].js",
    libraryTarget: "umd",
    library: "ElementUISaaSExtend",
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    modules: ["node_modules"],
  },
  // 排除部分依赖不进行打包
  externals: [
    {
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
  ],
  // 允许打包250kb以上的资源
  performance: {
    hints: false,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        terserOptions: {
          compress: {
            // drop_console: true,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["cache-loader", "babel-loader?cacheDirectory=true"],
      },
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              configFile: false,
              presets: ["@vue/cli-plugin-babel/preset"],
            },
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              appendTsxSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
if (process.env.IS_REPORT) {
  webpackConfig.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
    })
  );
}

module.exports = webpackConfig;
