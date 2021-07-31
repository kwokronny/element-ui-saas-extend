# 快速上手

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

import ElementSaaSExtend from "element-ui-saas-extend";
import 'element-ui-saas-extend/lib/theme-chalk/index.css';
Vue.use(ElementSaaSExtend);
```

## 全局配置

用法同 Element UI 设置一致 [点击查看](https://element.eleme.io/#/zh-CN/component/quickstart#quan-ju-pei-zhi)

组件会优先使用 props 设置的属性，如果未设置，再使用全局配置。

- **pickerOptions** 使用 FormAuto 组件时，为 type 为 date 类的表单项设置默认配置 [点击查看](https://element.eleme.io/#/zh-CN/component/date-picker)，同 date-picker 组件中 `picker-options` 属性用法一致
  - **range** 为 type 为 `daterange`、`datetimerange` 的控件类型项添加配置 options
  - **date** 为 type 为 `date`、`datetime` 的控件类型项添加配置 options

```js static
Vue.prototype.$ELEMENT = {
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