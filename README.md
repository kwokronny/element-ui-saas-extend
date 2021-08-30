<img src="logo.png"/>

# Element SaaS 扩展
[![](https://img.shields.io/npm/v/element-ui-saas-extend)](https://www.npmjs.com/package/element-ui-saas-extend)


由于近期工作主要偏向 SaaS 业务开发，开发内容在表单交互及表格上等开发重复性也很高，基于项目大多应用element套件开发，所以就萌发了整理个针对 saas业务 的element组件库saas扩展。

- [扩展文档](https://kwokronny.github.io/element-ui-saas-extend/)
- [作者博客](https://kwokronny.top/)

## 特性
- ### 效率至上
	整理常见业务下的重复性工作，汇合成预设组件，高效的完成工作。
- ### 尽享自由
  尽可能的梳理耦合，在兼顾高效的同时，亦给予自由的空间自定义垂直业务下的特殊场景。
- ### 简单易用
  沿用Element UI 的标准开发，尽可能多的示例代码与文档，帮助你快速上手。

## 安装
```shell
yarn add element-ui-saas-extend -S
// or
npm install element-ui-saas-extend -S
```

## 应用

```js static
import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import ElementUISaaSExtend from "element-ui-saas-extend";
import 'element-ui-saas-extend/lib/theme-chalk/index.css';
Vue.use(ElementUISaaSExtend);
```

# 支持作者

欢迎大家为该项目提交自己的建议 及 `Issus`，当然也欢迎大家提交 `push request`
