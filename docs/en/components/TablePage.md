---
pageClass: component-page
---

# TablePage

Combination component `<el-table>` and `<el-form-auto>` for settle common business very higly repetitive development

## Add search

just add attribute `search` can add search field for column, or add attribute `addSearch` additional search field.

:::demo

```vue
<template>
  <el-table-page ref="TablePage" border stripe :columns="columns" row-key="id" custom-columns="search_demo" :request="getList"></el-table-page>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          label: "Name",
          prop: "name",
          fixed: "left",
          width: 120,
          search: {
            type: "text",
            value: "test",
          },
          addSearch: {
            test: {
              type: "switch",
              label: "add switch",
            },
          },
        },
        {
          label: "Phone",
          prop: "phone",
          width: 120,
          search: {
            type: "text",
          },
        },
        {
          label: "Address",
          prop: "address",
          width: 200,
          showOverflowTooltip: true,
          search: {
            type: "text",
          },
        },
        {
          label: "Email",
          prop: "email",
          width: 200,
          showOverflowTooltip: true,
        },
        {
          label: "Level",
          prop: "level",
          width: 80,
        },
        {
          label: "IDNumber",
          prop: "idNumber",
          width: 180,
          search: {
            type: "text",
          },
        },
        {
          label: "Score",
          prop: "score",
          filters: [["numeral", "0,0"]],
          width: 120,
          search: {
            type: "numberrange",
          },
        },
        {
          label: "Balance",
          prop: "balance",
          filters: [["numeral", "0,0.00"], "yuan"],
          width: 120,
          search: {
            type: "numberrange",
          },
        },
        {
          label: "Registry date",
          prop: "date",
          filters: [["dayjs", "YYYY-MM-DD"]],
          width: 120,
          search: {
            type: "daterange",
            rangeName: ["startDate", "endDate"],
          },
        },
        {
          label: "Status",
          prop: "status",
          enumTag: "el-tag",
          enum: [
            { label: "Normal", value: "1", type: "primary" },
            { label: "Block", value: "2", type: "warning" },
          ],
          search: {
            type: "select",
          },
        },
        {
          label: "Tag",
          prop: "tagArr",
          width: 200,
          enumTag: "el-tag",
          enum: [
            { label: "Clever", value: "1", type: "primary" },
            { label: "Cute", value: "2", type: "success" },
            { label: "Boldness", value: "3", type: "warning" },
          ],
          search: {
            type: "select",
            multiple: true,
          },
        },
      ],
    };
  },
  methods: {
    getList(page = 1, search, pageSize) {
      return axios.get("http://yapi.smart-xwork.cn/mock/90460/page").then(function(ret) {
        let baseId = (page - 1) * pageSize;
        ret.data.data.map();
        return {
          page,
          total: 100,
          pageSize: pageSize,
          record: ret.data.data.filter(function(item,index){return index>baseId && index<baseId*pageSize}).map(function(item){
            return item;
          })
        };
      });
      // return new Promise((resolve) => {
      //   let data = Mock.mock({
      //     page,
      //     total: 500,
      //     pageSize: pageSize,
      //     [`record|${pageSize}`]: [
      //       {
      //         "id|+1": baseId,
      //         name: "@name",
      //         email: "@email",
      //         level: "@integer(1,100)",
      //         phone: /^1[387][0-9]{9}$/,
      //         address: "@province@city",
      //         idNumber: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
      //         score: "@natural(0,9000)",
      //         balance: "@float(0,9000)",
      //         date: "2021-05-10 11:21:00",
      //         status: "@integer(1,2)",
      //         tags: "1,2,3",
      //         tagArr: [1, 2, 3],
      //       },
      //     ],
      //   });
      //   setTimeout(function() {
      //     // return data;
      //     resolve(data);
      //   }, 1000);
      // });
    },
  },
};
</script>
```

:::

## Customize columns

setting attribute `custom-columns` will enable customize columns, customize column config will save in localStorage, localStorage name format is `ElTablePage_${custom-columns}`.

:::demo

```vue
<template>
  <el-table-page layout-type="card" :columns="columns" :request="getList" custom-columns="table_test1"></el-table-page>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          label: "Name",
          prop: "name",
          fixed: "left",
          search: {
            type: "text",
          },
        },
        {
          label: "Phone",
          prop: "phone",
          width: 140,
        },
        {
          label: "Email",
          prop: "email",
          width: 200,
          showOverflowTooltip: true,
        },
        {
          label: "Address",
          prop: "address",
          width: 200,
          showOverflowTooltip: true,
        },
        {
          label: "Level",
          prop: "level",
          width: 80,
          formatter: (row, column, value, index) => `${row.level}级`,
        },
        {
          label: "ID",
          prop: "idNumber",
          width: 200,
        },
        {
          label: "Score",
          prop: "score",
          width: 120,
        },
        {
          label: "Date",
          prop: "date",
          filters: [["dayjs", "MM-DD dd"]],
          showOverflowTooltip: true,
          width: 120,
        },
        {
          label: "Status",
          prop: "status",
          enum: [
            { label: "Normal", value: 1, type: "primary" },
            { label: "Block", value: 2, type: "danger" },
          ],
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
              name: "@name",
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

## Mult-select batch operation

setting attribute `row-key`, will auto enabled mult-select for table, and enabled attribute `reserve-selection`, reserve selection after data refreshing

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
        <el-button type="warning" size="small">Freeze</el-button>
        <el-button type="success" size="small">UnFreeze</el-button>
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
          enum: [
            { label: "正常", value: "1", type: "primary" },
            { label: "失效", value: "2", type: "warning" },
          ],
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

## Filters

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
  <el-table-page layout-type="card" ref="TablePage" :columns="columns" :request="getList" border></el-table-page>
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

## Slot

Set more slots, ensure the diversity of requirements as much as possible to solve products and designs.

:::tip
`search_button`, `selection` and `custom_column_button` will cover default content.
:::

Add `search-` before slot name when set slot for `<el-formauto>`

```vue
<template slot="search-name" slot-scope="{ item, model, name }">
  <el-input suffix-icon="el-icon-help" v-model="model[name]"></el-input>
</template>
```

:::demo

```vue
<template>
  <el-table-page ref="TablePage" border stripe :columns="columns" :request="getList" row-key="id" :selection.sync="selection" custom-columns="table_test2">
    <template slot="option" slot-scope="{ row, column, index }">
      <el-button type="primary" round size="mini">编辑</el-button>
      <el-button type="danger" round size="mini">删除</el-button>
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
        <el-button type="warning" size="small">冻结</el-button>
        <el-button type="success" size="small">启用</el-button>
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
          enum: ["正常", "失效"],
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

## Attributes

### Props

| Attribute       | Description                                                                                                                        | Type                                                                                    | Accepted Values                                   | Default                                |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- | :------------------------------------------------ | -------------------------------------- |
| columns         | options of table column                                                                                                            | [columns[]](#prop-columns-attribute)                                                    | -                                                 | []                                     |
| search-props    | FormAuto Config                                                                                                                    | [FormAuto Prop](FormAuto.html#props)                                                    | -                                                 | {}                                     |
| `[prop:string]` | inhrited `<el-table>` [Attribute](https://element.eleme.io/#/zh-CN/component/table#table-attributes)                               | `Record<string, any>`                                                                   | -                                                 |
| request         | requset function, reference [example](#add-search)                                                                                 | `(page:number, param:Record<string,any>, size:number)=>{page, pageSize, total, record}` | -                                                 | -                                      |
| page-layout     | layout of `<el-pagination>`, elements separated with a comma. [](https://element.eleme.io/#/zh-CN/component/pagination#attributes) | `string`                                                                                | sizes, prev, pager, next, jumper, ->, total, slot | 'prev, pager, next, jumper, ->, total' |
| page-sizes      | options of item count per page                                                                                                     | `number[]`                                                                              | -                                                 | -                                      |
| layout-type     | theme of `<el-tablepage>`                                                                                                          | `default` / `card`                                                                      | -                                                 | -                                      |
| button-style    | button style of `<el-tablepage>`                                                                                                   | `Record<keyof ElButton, boolean|string>`                                                | -                                                 | -                                      |
|                 | Mult-select batch operation [example](#mult-select-batch-operation)                                                                |                                                                                         |                                                   |                                        |
| row-key         | usage same of `<el-table>` attribute `row-key`.                                                                                    | `string` / `Function(row)`                                                              | -                                                 | -                                      |
| selectable      | row whether is can select.                                                                                                         | `(row,index)=>boolean`                                                                  | -                                                 | -                                      |
| selection       | selected row, supports the .sync modifier                                                                                          | `object[]`                                                                              | `[]`                                              |
| custom-columns  | whether enabled custom-columns, reference [example](#customize-columns)                                                            | `string`                                                                                | -                                                 | false                                  |

### Prop: columns Attribute

| Attribute       | Description                                                                                                                                         | Type                                                         | Default |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- | :------ |
| label           | label of column.                                                                                                                                    | `string`                                                     | -       |
| prop            | prop of column.                                                                                                                                     | `boolean`                                                    | false   |
| labelTooltip    | tooltip of column.                                                                                                                                  | `string` / `boolean`                                         | false   |
| hide            | column whether is hidden                                                                                                                            | `boolean`                                                    | -       |
| fixed           | column whether is fixed                                                                                                                             | `left` / `right` / `boolean`                                 | -       |
| filters         | use Vue Filter for column content, reference [example](#filters)                                                                                    | -                                                            | -       |
| slot            | customize dynamic slot, `slot` name is `prop` when `slot` is true, usage reference [example](#slot)                                                 | `string` / `boolean`                                         | false   |
| enum            | enum of column content, usage same of `<el-formauto>` attribute options. `enum` is column search filed default `options` when column has `search`.  |                                                              | -       |
| splitChar       | split char of `enum`, only when `enum` is sequence string.                                                                                          | `string`                                                     | -       |
| search          | add search field for column. usage reference [example](#add-search)                                                                                 | [FormAutoField](FormAuto.html#formautofield)                 | -       |
| addSearch       | add search field for after column. usage reference [example](#add-search)                                                                           | [Record<string, FormAutoField>](FormAuto.html#formautofield) | -       |
| `[prop:string]` | inhrited `<el-table-column>` component prop. reference [`<el-table-column>`Prop](https://element.eleme.io/#/zh-CN/component/table#table-attributes) | `Record<string,any>`                                         | -       |

### Event

| Event                | Description                                                                                 | Parameters                |
| :------------------- | :------------------------------------------------------------------------------------------ | :------------------------ |
| saved-custom-columns | triggers when save customize columns,                                                       | customize columns setting |
| `[event:name]`       | inhrited [`<el-table>`Event](https://element.eleme.io/#/zh-CN/component/table#table-events) | -                         |

### Method

| Method                   | Description                                                                    | Parameters              |
| :----------------------- | :----------------------------------------------------------------------------- | :---------------------- |
| search()                 | trigger search method.                                                         | `(page=1)=>void`        |
| resetSearch()            | reset search form item.                                                        | -                       |
| clearSelection()         | clear all selected row of table.                                               | -                       |
| openCustomColumnDialog() | trigger open custom column dialog, only when attribute `custom-columns` valid. | -                       |
| getParams()              | get current params.                                                            | `()=>Rcord<string,any>` |

### Slot

| Slot                 | Description                                                                                                 |
| :------------------- | :---------------------------------------------------------------------------------------------------------- |
| `${slot}`            | Custom scope slot of table column, The scope parameter is { row,column,index }, reference [example](#slot)  |
| `search-${slot}`     | Custom scope slot of search form, The scope parameter is { field, model, name }, reference [example](#slot) |
| search_prepend       | slot before search form.                                                                                    |
| search_button        | button slot in search form, use will replace default design.                                                |
| search_append        | slot after search form.                                                                                     |
| middle               | slot between search and table.                                                                              |
| selection            | selected status slot on the top left of table, use will replace default design.                             |
| selection_right      | slot on the right of selected status slot.                                                                  |
| custom_column_button | customize column button slot on the top right of table, use will replace default design.                    |
| table_button         | button slot on the top right of table.                                                                      |
| table_prepend        | slot before table.                                                                                          |
| table_append         | slot after table.                                                                                           |
| page_append          | slot after pagination.                                                                                      |
