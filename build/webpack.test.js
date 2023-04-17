const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const webpackConfig = {
  devtool: 'inline-source-map', // 推荐使用inline-source-map
  mode: "development",
  entry: {
    app: ["./packages/index.ts"],
  },
  output: {
    path: path.resolve(process.cwd(), "dist"),
    publicPath: "./",
    filename: "[name].js",
    chunkFilename: "[id].js",
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.common.js",
    },
    modules: ["node_modules"],
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
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"],
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: "url-loader",
      },
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "istanbul-instrumenter-loader",
          },
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
