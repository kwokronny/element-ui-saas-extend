---
pageClass: component-page
---

# 表格页面 TablePage

在日常管理业务中，表格页面的应用率非常的高，将 `<el-table>` 与 `<el-form-auto>` 结合，更快的完成表格页面，在配置 表格列的同时，可顺带配置搜索项，更多玩法看示例。

## 添加搜索项

设置 `columns` 时，对列增加 search 属性 [[属性值参考](./FormAuto.html#%E5%B1%9E%E6%80%A7)]，可快速添加筛选组件，快速配置组件。<br/>
当遇到需要增加筛选项时，亦可在 想增加的列中增加 `addSearch` 属性，同样[[属性值参考](./FormAuto.html#%E5%B1%9E%E6%80%A7)] 文档。<br/>
具体可看下例示例

:::demo

```vue
<template>
  <el-table-page ref="TablePage" border stripe :columns="columns" :page-size="10" row-key="id" :page-sizes="[10, 20, 30]" custom-columns="ElTablePage_search_demo" :request="getList"> </el-table-page>
</template>
<script>
export default {
  data() {
    return {
      searchFields: { test: "1" },
      columns: [
        {
          label: "姓名",
          prop: "name",
          fixed: "left",
          width: 120,
          search: {
            type: "text",
            value: "测试",
          },
          addSearch: {
            test: {
              type: "switch",
              label: "测试",
            },
          },
        },
        {
          label: "手机",
          prop: "phone",
          width: 120,
          search: {
            type: "text",
          },
        },
        {
          label: "地址",
          prop: "address",
          width: 200,
          showOverflowTooltip: true,
          search: {
            type: "text",
          },
        },
        {
          label: "邮箱",
          prop: "email",
          width: 200,
          showOverflowTooltip: true,
        },
        {
          label: "等级",
          prop: "level",
          width: 80,
          showType: "numeral",
          format: "{0} 级",
        },
        {
          label: "身份证",
          prop: "idNumber",
          width: 180,
          search: {
            type: "text",
          },
        },
        {
          label: "积分",
          prop: "score",
          filters: [["numeral", "0,0"]],
          width: 120,
          search: {
            type: "numberrange",
          },
        },
        {
          label: "余额",
          prop: "balance",
          filters: [["numeral", "0,0.00"], "yuan"],
          width: 120,
          search: {
            type: "numberrange",
          },
        },
        {
          label: "注册日期",
          prop: "date",
          filters: [["dayjs", "YYYY-MM-DD"]],
          width: 120,
          search: {
            type: "daterange",
            rangeName: ["startDate", "endDate"],
          },
        },
        {
          label: "状态",
          prop: "status",
          enum: {
            1: "正常",
            2: "失效",
          },
          enumColor: {
            1: "primary",
            2: "warning",
          },
          search: {
            type: "select",
          },
        },
        {
          label: "标签",
          prop: "tags",
          width: 200,
          splitChar: ",",
          enum: {
            1: "聪明",
            2: "可爱",
            3: "勇敢",
          },
          enumColor: {
            1: "primary",
            2: "success",
            3: "warning",
          },
          search: {
            type: "select",
            multiple: true,
          },
        },
      ],
    };
  },
  methods: {
    getList(page = 1, search, pageSize, from) {
      if (from == "search") {
        this.$msgbox({
          title: "请求值",
          dangerouslyUseHTMLString: true,
          message: `<pre>${JSON.stringify(search, undefined, 3)}</pre>`,
        });
      }
      let Mock = this.$mock;
      return new Promise((resolve) => {
        let baseId = (page - 1) * pageSize;
        let data = Mock.mock({
          page,
          total: 500,
          pageSize: pageSize,
          [`record|${pageSize}`]: [
            {
              "id|+1": baseId,
              name: "@cname",
              email: "@email",
              level: "@integer(1,100)",
              phone: /^1[387][0-9]{9}$/,
              address: "@province@city",
              idNumber: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
              score: "@natural(0,9000)",
              balance: "@float(0,9000)",
              date: "2021-05-10 11:21:00",
              status: "@integer(1,2)",
              tags: "1",
            },
          ],
        });
        setTimeout(function() {
          // return data;
          resolve(data);
        }, 1000);
      });
    },
  },
};
</script>
```

:::

## 自定义列

设置 `custom-columns` 将会开启 自定义列 按钮，该值将会做为 localStorage 以 `ElTablePage_${custom-columns}` 格式的键名 存储对列的排序，隐藏，固定的设置
:::tip
若需要为用户提供联网的列设置存储，可通过 `@saved-custom-columns` 事件将已格式化为 JSON 字符串 的配置文本上传至后端，
在用户登录时按 `ElTablePage_${custom-columns}` 格式下载至 localStorage 存储即可
:::

:::demo

```vue
<template>
  <el-table-page :columns="columns" :request="getList" custom-columns="table_test1"></el-table-page>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          label: "姓名",
          prop: "name",
          fixed: "left",
        },
        {
          label: "手机",
          prop: "phone",
          width: 140,
        },
        {
          label: "邮箱",
          prop: "email",
          width: 200,
          showOverflowTooltip: true,
        },
        {
          label: "地址",
          prop: "address",
          width: 200,
          showOverflowTooltip: true,
        },
        {
          label: "等级",
          prop: "level",
          width: 80,
          formatter: (row, column, value, index) => `${value}级`,
        },
        {
          label: "身份证",
          prop: "idNumber",
          width: 200,
        },
        {
          label: "积分",
          prop: "score",
          width: 120,
        },
        {
          label: "注册日期",
          prop: "date",
          filters: [["dayjs", "MM-DD dd"]],
          showOverflowTooltip: true,
          width: 120,
        },
        {
          label: "状态",
          prop: "status",
          enum: {
            1: "正常",
            2: { label: "失效", type: "danger" },
          },
        },
      ],
    };
  },
  methods: {
    getList(page = 1, search) {
      let Mock = this.$mock;
      return new Promise((resolve) => {
        let data = Mock.mock({
          page,
          total: 500,
          pageSize: 15,
          "record|5": [
            {
              "id|+1": 1,
              name: "@cname",
              email: "@email",
              level: "@integer(1,100)",
              phone: /^1[387][0-9]{9}$/,
              address: "@province@city",
              idNumber: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dX]$/,
              score: "@natural(0,9000)",
              date: "2021-05-10 11:21:00",
              status: "@integer(1,2)",
            },
          ],
        });
        setTimeout(function() {
          resolve(data);
        }, 1000);
      });
    },
  },
};
</script>
```

:::

## 多选批量操作

设置 `row-key` 唯一标识的字段名，将自动开启表格多选功能，并会开启 复选框列 的 `reserve-selection` 在数据更新后按指定的唯一标识字段保留选中项，达到翻页保留被选中数据。<br/>
设置 `selection` 带 .sync 标识符，即：`selection.sync`，将会同步已选中项记录。<br/>
设置 `selectable` 可设置决定这一行是否可以选择，接受的类型为 `Function(row,index)`

::: tip
开启多选功能后表格左上方默认预设添加了 选中情况 的显示，亦可通过 `selection` 插槽自定义
:::
:::demo

```vue
<template>
  <el-table-page ref="TablePage" :columns="columns" :request="getList" border :selection.sync="selection" row-key="id" :selectable="(row) => row.id != 3">
    <template slot="selection_right">
      <el-button-group>
        <el-button type="warning" plain size="small" round>冻结</el-button>
        <el-button type="success" plain size="small" round>启用</el-button>
      </el-button-group>
    </template>
  </el-table-page>
</template>
<script>
export default {
  data() {
    return {
      selection: [],
      columns: [
        {
          label: "姓名",
          prop: "name",
          fixed: "left",
        },
        {
          label: "手机",
          prop: "phone",
          width: 140,
        },
        {
          label: "地址",
          prop: "address",
          width: 200,
        },
        {
          label: "邮箱",
          prop: "email",
          width: 200,
        },
        {
          label: "身份证",
          prop: "idNumber",
          width: 180,
        },
        {
          label: "积分",
          prop: "score",
          filters: [["numeral", "0,0.00"]],
          width: 120,
        },
        {
          label: "注册日期",
          prop: "date",
          filters: [["dayjs", "MM-DD dd"]],
          showOverflowTooltip: true,
          width: 120,
        },
        {
          label: "状态",
          prop: "status",
          enum: {
            1: "正常",
            2: { label: "失效", type: "danger" },
          },
        },
      ],
    };
  },
  methods: {
    getList(page = 1, search, pageSize) {
      let Mock = this.$mock;
      return new Promise((resolve) => {
        let baseId = (page - 1) * 5;
        let data = Mock.mock({
          page,
          total: 500,
          pageSize: 5,
          ["record|" + 5]: [
            {
              "id|+1": baseId,
              name: "@cname",
              email: "@email",
              phone: /^1[387][0-9]{9}$/,
              address: "@province@city",
              idNumber: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
              score: "@natural(0,9000)",
              date: "@datetime",
              status: "@integer(1,2)",
            },
          ],
        });
        setTimeout(function() {
          // return data;
          resolve(data);
        }, 1000);
      });
    },
  },
};
</script>
```

:::

## 应用过滤器

表格常常需要对列内容展示进行格式化处理，所以很多时候经常需要为列内容自定义插槽 应用过滤器 格式化</br>
提供 `filters` 属性为内容直接应用 Vue 全局及本地的 filters 函数，具体赋值如下 <br/>

`filters: "empty"` 时等于为列内容做如下处理

```vue
<template>
  {{ value | empty }}
</template>
```

`filters: [["sensitive","name"], "empty"]` 时等于为列内容做如下处理

```vue
<template>
  {{ value | sensitive("name") | empty }}
</template>
```

:::tip
`filters` 与 `formatter` 属性不可共用，都赋值时，仅采用 `filters`
:::

已全局注册下列过滤器

```js
import numeral from "numeral";
import dayjs from "dayjs";

Vue.filter("numeral", function(value, format) {
  return numeral(value).format(format);
});

Vue.filter("date", function(value) {
  return dayjs(value).format("YYYY-MM-DD");
});

Vue.filter("datetime", function(value) {
  return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
});

Vue.filter("dayjs", function(value, format) {
  return dayjs(value).format(format);
});

Vue.filter("yuan", function(value) {
  return `${value} 元`;
});
```

:::demo

```vue
<template>
  <el-table-page ref="TablePage" :columns="columns" :request="getList" border></el-table-page>
</template>
<script>
export default {
  filters: {
    sensitive(value, format) {
      switch (format) {
        case "normal":
          return value.replace(/^(.{2})(?:[\w\W]+)(.{3})$/, "$1****$2");
        case "phone":
          return value.replace(/^(.{3})(?:\w+)(.{4})$/, "$1****$2");
        case "email":
          return value.replace(/^(.{3})(?:[\W\w]+)(.{5})$/, "$1**@**$2");
      }
    },
  },
  data() {
    return {
      columns: [
        {
          label: "日期时间",
          prop: "datetime",
          filters: "datetime",
        },
        {
          label: "日期格式化",
          prop: "dateformat",
          filters: [["dayjs", "YYYY dd"]],
        },
        {
          label: "数字格式化",
          prop: "number",
          filters: [["numeral", "0,0a"]],
        },
        {
          label: "金额格式化",
          prop: "yuan",
          filters: [["numeral", "0,0.00"], "yuan"],
        },
        {
          label: "手机脱敏",
          prop: "phone",
          filters: [["sensitive", "phone"]],
        },
        {
          label: "邮箱脱敏",
          prop: "email",
          filters: [["sensitive", "email"]],
        },
      ],
    };
  },
  methods: {
    getList(page = 1, search) {
      let Mock = this.$mock;
      return new Promise((resolve) => {
        let data = Mock.mock({
          page,
          total: 500,
          pageSize: 5,
          "record|5": [
            {
              "id|+1": 1,
              name: "@cname",
              email: "@email",
              phone: /^1[387][0-9]{9}$/,
              number: "@float(0,9000)",
              yuan: "@float(0,9000)",
              datetime: "@datetime",
              dateformat: "@datetime",
            },
          ],
        });
        setTimeout(function() {
          resolve(data);
        }, 1000);
      });
    },
  },
};
</script>
```

:::

## 所有插槽

作为预设组件，为尽可能的保证需求的多样性应付产品与设计，所以尽可能的多设置些插槽，便于临时特殊需要增加元素的情况，其中 `search_button`、`selection` 和 `custom_column_button` 将会覆盖预设内容，由用户自定义插槽

:::tip
由于存在搜索表单组件存在需要自定义动态插槽的情况，自定义方式除 slot 名字增加前缀 `search-`，其它一致，详细参考下例示例
:::

:::demo

```vue
<template>
  <el-table-page ref="TablePage" border stripe :columns="columns" :request="getList" row-key="id" :selection.sync="selection" custom-columns="table_test2">
    <template slot="option" slot-scope="{ row, column, index }">
      <el-button type="primary" size="mini">编辑</el-button>
      <el-button type="danger" size="mini">删除</el-button>
    </template>
    <template slot="search-name" slot-scope="{ item, model, name }">
      <el-input suffix-icon="el-icon-help" v-model="model[name]"></el-input>
    </template>
    <template slot="search_prepend">
      <el-alert title="搜索上方插槽" type="success" :closable="false"></el-alert>
    </template>
    <template slot="search_button">
      <el-button>搜索</el-button>
      <el-button>重置</el-button>
      <el-button>刷新</el-button>
    </template>
    <template slot="search_append">
      <el-alert title="搜索下方插槽" type="success" :closable="false"></el-alert>
    </template>
    <template slot="middle">
      <el-alert title="搜索框与表格框中间插槽" type="success" :closable="false"></el-alert>
    </template>
    <template slot="selection">
      已选中 {{ selection.length }} 条
      <el-tooltip v-if="selection.length > 0">
        <div slot="content">
          <p v-for="item in selection" :key="`selection_test_${item.id}`">{{ item.name }} {{ item.phone }}</p>
        </div>
        <el-button type="text">查看</el-button>
      </el-tooltip>
      <el-button type="text" @click="resetSelection">清空</el-button>
    </template>
    <template slot="custom_column_button">
      <el-button type="primary" size="small" @click="openCustomColumnDialog">自定义列</el-button>
    </template>
    <template slot="selection_right">
      <el-button-group>
        <el-button type="warning" plain size="small" round>冻结</el-button>
        <el-button type="success" plain size="small" round>启用</el-button>
      </el-button-group>
    </template>
    <template slot="table_button">
      <el-button type="primary" size="small">添加</el-button>
      <el-button type="primary" size="small">同步</el-button>
    </template>
    <template slot="table_prepend">
      <el-alert title="表格上方插槽" type="success" :closable="false"></el-alert>
    </template>
    <template slot="table_append">
      <el-alert title="表格下方插槽" type="success" :closable="false"></el-alert>
    </template>
    <template slot="page_append">
      <el-alert title="页码下方插槽" type="success" :closable="false"></el-alert>
    </template>
  </el-table-page>
</template>
<script>
export default {
  data() {
    return {
      selection: [],
      columns: [
        {
          label: "姓名",
          prop: "name",
          fixed: "left",
          search: {
            type: "text",
            slot: "name",
          },
        },
        {
          label: "地址",
          prop: "address",
          width: 200,
          showOverflowTooltip: true,
          search: {
            type: "text",
          },
        },
        {
          label: "邮箱",
          prop: "email",
          width: 200,
          showOverflowTooltip: true,
        },
        {
          label: "等级",
          prop: "level",
          width: 80,
          formatter: (row, column, value) => `${value} 级`,
        },
        {
          label: "身份证",
          prop: "idNumber",
          width: 180,
        },
        {
          label: "积分",
          prop: "score",
          filters: [["numeral", "0,0.00"]],
          width: 120,
        },
        {
          label: "注册日期",
          prop: "date",
          filters: "datetime",
          width: 120,
        },
        {
          label: "状态",
          prop: "status",
          enum: {
            1: "正常",
            2: { label: "失效", type: "danger" },
          },
        },
        {
          label: "操作",
          prop: "option",
          fixed: "right",
          width: 150,
          slot: true,
        },
      ],
    };
  },
  methods: {
    openCustomColumnDialog() {
      this.$refs["TablePage"].openCustomColumnDialog();
    },
    resetSelection() {
      this.$refs["TablePage"].clearSelection();
    },
    getList(page = 1, search, pageSize) {
      let Mock = this.$mock;
      return new Promise((resolve) => {
        let baseId = (page - 1) * 5;
        let data = Mock.mock({
          page,
          total: 500,
          pageSize: 5,
          ["record|" + 5]: [
            {
              "id|+1": baseId,
              name: "@cname",
              email: "@email",
              level: "@integer(1,100)",
              phone: /^1[387][0-9]{9}$/,
              address: "@province@city",
              idNumber: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
              score: "@natural(0,9000)",
              date: "2021-05-10 11:21:00",
              status: "@integer(1,2)",
            },
          ],
        });
        setTimeout(function() {
          // return data;
          resolve(data);
        }, 1000);
      });
    },
  },
};
</script>
```

:::

## 属性

### Props

| 参数            | 描述                                                                                                    | 类型                                                                                                                                               | 可选值 | 默认值 |
| :-------------- | :------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------- | :----- | ------ |
| columns         | 列配置                                                                                                  | [columns[]](#prop-columns-attribute)                                                                                                               | -      | []     |
| search-props    | 表单项配置，参考 [FormAuto 属性](FormAuto.html#props)                                                   | [FormAuto Prop](FormAuto.html#props)                                                                                                               | -      | {}     |
| `[prop:string]` | 可追加 &lt;el-table&gt; 的 [属性](https://element.eleme.io/#/zh-CN/component/table#table-attributes)    | `any`                                                                                                                                              | -      |
| 请求相关        |                                                                                                         |                                                                                                                                                    |        |        |
| request         | 请求方法                                                                                                | `(page, searchField, pageSize, from)=>{page, pageSize, total, record}` 其中参数中的 `from` 为来源，值分别是`page_change`、`request_change`、`search` | -      | -      |
| page-size       | 默认每页显示页数                                                                                        | `number`                                                                                                                                           | -      | -      |
| page-layout     | 分页组件布局，参考 [文档 layout 属性](https://element.eleme.io/#/zh-CN/component/pagination#attributes) | `string`                                                                                                                                           | -      | -      |
| page-sizes      | 分页组件每页显示个数选择器的选项设置                                                                    | `number[]`                                                                                                                                         | -      | -      |
| 多选相关        | 参考 [示例](#多选批量操作)                                                                              |                                                                                                                                                    |        |        |
| row-key         | 与 &lt;el-table&gt;的 row-key 用法相同，赋值该属性则化开启多选功能                                      | `string` / `Function(row)`                                                                                                                         | -      | -      |
| selectable      | 多选时决定这一行的 CheckBox 是否可以勾选                                                                | `(row,index)=>boolean`                                                                                                                             | -      | -      |
| selection       | 已选中项，支持.sync                                                                                     | `object[]`                                                                                                                                         | `[]`   |
| 自定义列相关    |                                                                                                         |                                                                                                                                                    |        |        |
| custom-columns  | 开启自定义列，该值将按 `ElTablePage_${custom-columns}` 为键名在 `localStorage` 保存自定义列的结果       | `string`                                                                                                                                           | -      | false  |

### Prop: columns Attribute

| 参数            | 描述                                                                         | 类型                                                               | 默认值 |
| :-------------- | :--------------------------------------------------------------------------- | :----------------------------------------------------------------- | :----- |
| label           | 列显示标题                                                                   | `string`                                                           | -      |
| prop            | 列对应字段名                                                                 | `boolean`                                                          | false  |
| labelTooltip    | 列名提示                                                                     | `string` / `boolean`                                               | false  |
| hide            | 是否隐藏                                                                     | `boolean`                                                          | -      |
| fixed           | 字段默认值                                                                   | `left` / `right` / `boolean`                                       | -      |
| filters         | 应用 Vue 过滤器，具体参考此 [示例](#应用过滤器)                              | -                                                                  | -      |
| slot            | 自定义动态插槽，设为 true 时，slot 为 prop，详情可参考 [插槽示例](#所有插槽) | `string` / `boolean`                                               | false  |
| enum            | 列内容枚举值                                                                 | `Record<string,string>`                                            | -      |
| splitChar       | 设置列值分隔符                                                               | `string`                                                           | -      |
| search          | 为此字段添加搜索项                                                           | [FormAutoField](FormAuto.html#formautofield)                 | -      |
| addSearch       | 为此字段后添加更多搜索项                                                     | [Record<string, FormAutoField>](FormAuto.html#formautofield) | -      |
| `[prop:string]` | 可直接追加 &lt;el-table-column&gt; 组件的 prop                               | `any`                                                              | -      |

### Event

| 事件名称             | 说明                                                                                                 | 回调参数  |
| :------------------- | :--------------------------------------------------------------------------------------------------- | :-------- |
| saved-custom-columns | 保存自定义列设置                                                                                     | `setting` |
| `[event:name]`       | 可直接追加 &lt;el-table&gt; 的 [事件](https://element.eleme.io/#/zh-CN/component/table#table-events) | -         |

### Method

| 方法名                   | 描述                                                 | 参数 |
| :----------------------- | :--------------------------------------------------- | :--- |
| search()                 | 搜索                                                 | -    |
| resetSearch()            | 重置搜索表单                                         | -    |
| clearSelection()         | 清空已选项                                           | -    |
| openCustomColumnDialog() | 仅在`custom-columns`有值时有效，打开自定义列设置弹窗 | -    |

### Slot

| 插槽                 | 描述                                           |
| :------------------- | :--------------------------------------------- |
| search_prepend       | 搜索上方插槽                                   |
| search_button        | 搜索按钮自定义插槽                             |
| search_append        | 搜索下方插槽                                   |
| middle               | 搜索框与表格框中间插槽                         |
| selection            | 表格左上方已选状态插槽，将覆盖原已选状态设计   |
| selection_right      | 表格左上方已选状态右插槽                       |
| custom_column_button | 表格右上方自定义列按钮插槽，将覆盖原按钮设计   |
| table_button         | 表格右上方按钮区域插槽                         |
| table_prepend        | 表格上方插槽                                   |
| table_append         | 表格下方插槽                                   |
| page_append          | 页码下方插槽                                   |

### Scope Slot

插槽相关使用可参考 [所有插槽示例](#所有插槽)

| 插槽名称         | 描述                                              |
| :--------------- | :------------------------------------------------ |
| `search-${slot}` | 自定义表单项的内容，参数为 { field, model, name } |
| `${slot}`        | 自定义列的内容，参数为 { row,column,index }       |
