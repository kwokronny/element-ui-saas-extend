# 安装

## npm 安装

```shell
yarn add element-ui-saas-extend -S
# or
npm install element-ui-saas-extend -S
```

```js static
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import ElementUISaaSExtend from "element-ui-saas-extend";
import "element-ui-saas-extend/lib/theme-chalk/index.css";
Vue.use(ElementUISaaSExtend);
```

## CDN 引入

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"
/>
<link
  rel="stylesheet"
  href="https://unpkg.com/element-ui-saas-extend/lib/theme-chalk/index.css"
/>

<script src="//unpkg.com/vue"></script>
<script src="//unpkg.com/element-ui"></script>
<script src="//unpkg.com/element-ui-saas-extend"></script>
```

## 全局配置

> 1.0.11 版本结构调整

用法同 Element UI 设置一致 [点击查看](https://element.eleme.io/#/zh-CN/component/quickstart#quan-ju-pei-zhi)

| 属性                  | 描述                                                                                          |
| :-------------------- | :-------------------------------------------------------------------------------------------- |
| pickerOptions.range   | 设置默认 FormAuto 组件中 `type` 值为 `daterange` 或 `datetimerange` 的 `pickerOptions` 属性。 |
| pickerOptions.date    | 设置默认 FormAuto 组件中 `type` 值为 `date` 或 `datetime` 的 `pickerOptions` 属性。           |
| tablePage.buttonStyle | 设置 TablePage 中预设的 `<el-button>` 的默认样式属性。                                        |
| tablePage.pageLayout  | 设置 TablePage 中预设的 `<el-pagination>` 的默认 `paeg-layout` 属性。                         |
| tablePage.border      | 设置 TablePage 中预设的 `<el-table>` 的默认 `border` 属性。                                   |

```ts
export interface SaaSInstallationOptions extends InstallationOptions {
  pickerOptions?: Record<"date" | "range", DatePickerOptions>;
  tablePage?: {
    buttonStyle?: Record<
      "plain" | "round" | "size" | "style" | "class",
      string | boolean
    >;
    pageLayout?: string;
  };
}
```

```js static
Vue.prototype.$ELEMENT = {
  tablePage: {
    buttonStyle: {
      round: true, //统一圆角,
    },
    pageLayout: "total, pager", //分页布局
  },
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
