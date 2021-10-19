# Installation

## NPM Installation

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

## CDN Include

```html
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css" />
<link rel="stylesheet" href="https://unpkg.com/element-ui-saas-extend/lib/theme-chalk/index.css" />

<script src="//unpkg.com/vue"></script>
<script src="//unpkg.com/element-ui"></script>
<script src="//unpkg.com/element-ui-saas-extend"></script>
```

## Global config

> modify structure version 1.0.11

Same of Element UI global config usage, [link](https://element.eleme.io/#/en-US/component/quickstart#quan-ju-pei-zhi)

| attribute             | description                                                                                                          |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------- |
| pickerOptions.range   | setting default pickerOptions for FormAuto component,when attribute `type` values is `daterange` or `datetimerange`. |
| pickerOptions.date    | setting default pickerOptions for FormAuto component,when attribute `type` values is `date` or `datetime`.           |
| tablePage.buttonStyle | setting default button style prop for TablePage within all `<el-button>`.                                            |
| tablePage.pageLayout  | setting default attribute `paeg-layout` for TablePage within `<el-pagination>`.                                      |

```ts declare
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
      round: true,
      plain: true,
    }
    pageLayout: "total, pager",
  }
  pickerOptions: {
    date: {
      shortcuts: [
        {
          text: "Today",
          onClick(picker) {
            picker.$emit("pick", new Date());
          },
        },
        {
          text: "Yesterday",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit("pick", date);
          },
        },
        {
          text: "Last week",
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
          text: "Weeks",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "Months",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "3 Months",
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
