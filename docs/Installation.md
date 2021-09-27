# 安装

## npm 安装
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

## CDN 引入
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-ui@2.15.6/lib/theme-chalk/index.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-ui-saas-extend@latest/lib/theme-chalk/index.css">

<script src="https://cdn.jsdelivr.net/npm/element-ui@2.15.6/lib/element-ui.common.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/element-ui-saas-extend@latest/lib/element-ui-saas-extend.min.js"></script>
```

## 全局配置
> 1.0.11 版本结构调整

用法同 Element UI 设置一致 [点击查看](https://element.eleme.io/#/zh-CN/component/quickstart#quan-ju-pei-zhi)

组件会优先使用 props 设置的属性，如果未设置，再使用全局配置。

- **pickerOptions** 使用 FormAuto 及 TablePage 组件时，为 type 为 date 类的表单项设置默认配置 [点击查看](https://element.eleme.io/#/zh-CN/component/date-picker)，同 date-picker 组件中 `picker-options` 属性用法一致
  - **range** 为 type 为 `daterange`、`datetimerange` 的控件类型项添加配置 options
  - **date** 为 type 为 `date`、`datetime` 的控件类型项添加配置 options
- **tablePage** 为 TablePage 组件提供默认样式
  - **buttonStyle** 为 TablePage 组件提供默认的按钮样式 
  - **pageLayout** 为 TablePage 组件提供默认的分页布局

```ts
export interface SaaSInstallationOptions extends InstallationOptions {
  pickerOptions?: Record<"date" | "range", DatePickerOptions>;
  tablePage?: {
    buttonStyle?: Record<"plain" | "round" | "size" | "style" | "class", string | boolean>;
    pageLayout?: string;
  };
}
```


```js static
Vue.prototype.$ELEMENT = {
  tablePage:{
    buttonStyle:{
      round: true //统一圆角,
    }
    pageLayout: "total, pager", //分页布局
  }
  pickerOptions: {
    date: {
      shortcuts: [
        {
          text: "今天",
          onClick(picker) {
            picker.$emit("pick", new Date());
          },
        },
        {
          text: "昨天",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit("pick", date);
          },
        },
        {
          text: "一周前",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", date);
          },
        },
      ],
    },
    range: {
      shortcuts: [
        {
          text: "近1周",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "近1月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "近3月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit("pick", [start, end]);
          },
        },
      ],
    },
  },
};

```