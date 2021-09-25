module.exports = {
  title: "Element SaaS 扩展",
  description: "基于 Element UI 对 SaaS 平台常见交互开发的预设组件",
  plugins: ["demo-container"],
  base: "/element-ui-saas-extend/",
  dest: "./dist",
  themeConfig: {
    repo: "kwokronny/element-ui-saas-extend",
    repoLabel: "GitHub",
    lastUpdated: '最近更新',
    sidebar: [
      "/Changelog",
      "/Installation",
      {
        title: "组件",
        children: ["/components/NumberRange", "/components/FormAuto", "/components/TablePage"],
      },
      "/Donate",
    ],
    nav: [
      { text: '作者', link: 'https://kwokronny.top'},
      { text: 'Gitee', link: 'https://gitee.com/kwokronny/element-ui-saas-extend' },
    ]
  },
  configureWebpack: {
    resolve: {
      extensions: [".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
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
  },
};
