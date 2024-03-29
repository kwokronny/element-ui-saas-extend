module.exports = {
  title: "Element SaaS 扩展",
  description: "基于 Element UI 对 SaaS 业务开发常见的交互组件",
  plugins: [require("./vuepress-demo-container/index.js")],
  port: 7227,
  base: "/element-ui-saas-extend/",
  dest: "./dist",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Element UI SaaS 扩展",
      description: "基于 Element UI 对 SaaS 业务开发常见的交互组件。",
    },
    // "/en/": {
    //   lang: "en-US",
    //   title: "Element UI SaaS Extend",
    //   description: "Common interaction component for SaaS business base Element UI.",
    // },
  },
  themeConfig: {
    repo: "kwokronny/element-ui-saas-extend",
    repoLabel: "GitHub",
    locales: {
      "/": {
        // selectText: "选择语言",
        // label: "简体中文",
        // lang: "zh-CN", // 将会被设置为 <html> 的 lang 属性
        // lastUpdated: "最近更新",
        sidebar: [
          "/Changelog",
          {
            title: "开发指南",
            children: ["/Installation", "/I18n"],
          },
          {
            title: "指令",
            children: ["/directive/Copy"],
          },
          {
            title: "组件",
            children: [
              "/components/NumberRange",
              "/components/MorePopover",
              "/components/FormAuto",
              "/components/FormTable",
              "/components/TablePage",
            ],
          },
          "/Donate",
        ],
        nav: [
          { text: "作者", link: "https://kwokronny.com" },
          {
            text: "码云",
            link: "https://gitee.com/kwokronny/element-ui-saas-extend",
          },
          {
            text: '开源',
            items: [
              { text: 'sprite-free-cli', link: 'https://github.com/kwokronny/sprite-free-cli' },
              { text: 'stylus-shortcut', link: 'https://kwokronny.github.io/stylus-shortcut/' },
            ]
          }
        ],
      },
      //   "/en/": {
      //     selectText: "Languages",
      //     label: "English",
      //     lastUpdated: "Latest Update",
      //     nav: [
      //       { text: "Anthor", link: "https://https://www.kwokronny.com" },
      //       { text: "Gitee", link: "https://gitee.com/kwokronny/element-ui-saas-extend" },
      //     ],
      //     sidebar: [
      //       "/en/Changelog",
      //       {
      //         title: "Development Guide",
      //         children: ["/en/Installation", "/en/I18n"],
      //       },
      //       {
      //         title: "Components",
      //         children: ["/en/components/Copy", "/en/components/NumberRange", "/en/components/FormAuto", "/en/components/TablePage"],
      //       },
      //       "/en/Donate",
      //     ],
      //   },
    },
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
