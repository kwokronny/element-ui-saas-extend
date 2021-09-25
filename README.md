<img src="logo.png"/>

# Element SaaS 扩展
[![](https://img.shields.io/npm/v/element-ui-saas-extend)](https://www.npmjs.com/package/element-ui-saas-extend)&nbsp;[![](https://data.jsdelivr.com/v1/package/npm/element-ui-saas-extend/badge)](https://www.jsdelivr.com/package/npm/element-ui-saas-extend)

> 由于近期工作主要偏向 SaaS 业务开发，开发内容在表单交互及表格上等开发重复性也很高，基于项目大多应用element套件开发，所以就萌发了整理个针对 saas业务 的element组件库saas扩展。


## 文档

- [扩展文档 - Gitee](https://kwokronny.gitee.io/element-ui-saas-extend/)
- [扩展文档 - Github](https://kwokronny.github.io/element-ui-saas-extend/)

## 特性
- ### 效率至上
	整理常见业务下的重复性工作，汇合成预设组件，高效的完成工作。
- ### 尽享自由
  尽可能的梳理耦合，在兼顾高效的同时，亦给予自由的空间自定义垂直业务下的特殊场景。
- ### 简单易用
  沿用Element UI 的标准开发，尽可能多的示例代码与文档，帮助你快速上手。

## 安装

### npm 安装
```shell
yarn add element-ui-saas-extend -S
// or
npm install element-ui-saas-extend -S
```

```js static
import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import ElementUISaaSExtend from "element-ui-saas-extend";
import 'element-ui-saas-extend/lib/theme-chalk/index.css';
Vue.use(ElementUISaaSExtend);
```

### CDN 引入
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-ui@2.15.6/lib/theme-chalk/index.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-ui-saas-extend@1.0.9/lib/theme-chalk/index.css">

<script src="https://cdn.jsdelivr.net/npm/element-ui@2.15.6/lib/element-ui.common.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/element-ui-saas-extend@1.0.9/lib/element-ui-saas-extend.min.js"></script>
```

更多内容请查看[文档](#文档)

# 支持作者

[KwokRonny](https://kwokronny.top/)

欢迎大家为该项目提交自己的建议 及 `Issus`，当然也欢迎大家提交 `push request`
