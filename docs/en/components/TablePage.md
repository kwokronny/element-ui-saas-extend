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
  <el-table-page ref="TablePage" border stripe :columns="columns" :request="getList"></el-table-page>
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
            value: "test",
          },
          addSearch: {
            test: {
              type: "switch",
              label: "Switch",
            },
          },
        },
        {
          label: "Email",
          prop: "email",
          showOverflowTooltip: true,
        },
        {
          label: "Score",
          prop: "score",
          filters: [["numeral", "0,0"]],
          search: {
            type: "numberrange",
          },
        },
        {
          label: "Balance",
          prop: "balance",
          filters: [["numeral", "0,0.00"], "yuan"],
          search: {
            type: "numberrange",
          },
        },
        {
          label: "Registry date",
          prop: "date",
          filters: [["dayjs", "YYYY-MM-DD"]],
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
        return {
          page,
          total: 100,
          pageSize,
          record: ret.data.data.filter(function(item, index) {
            return index > baseId && index < baseId + pageSize;
          }),
        };
      });
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
  <el-table-page border stripe :columns="columns" :request="getList" custom-columns="table_test1"></el-table-page>
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
          width: 200,
        },
        {
          label: "Phone",
          prop: "phone",
          showOverflowTooltip: true,
          width: 200,
        },
        {
          label: "Email",
          prop: "email",
          showOverflowTooltip: true,
          width: 260,
        },
        {
          label: "Other Email",
          prop: "email",
          showOverflowTooltip: true,
          width: 260,
        },
        {
          label: "Score",
          prop: "score",
          width: 180,
        },
        {
          label: "Balance",
          prop: "balance",
          filters: [["numeral", "0,0.00"]],
          width: 180,
        },
        {
          label: "Date",
          prop: "date",
          filters: [["dayjs", "MM-DD dd"]],
          showOverflowTooltip: true,
          width: 200,
        },
        {
          label: "Status",
          prop: "status",
          enumTag: "el-tag",
          enum: [
            { label: "Normal", value: 1, type: "primary" },
            { label: "Block", value: 2, type: "danger" },
          ],
        },
      ],
    };
  },
  methods: {
    getList(page = 1, search, pageSize) {
      return axios.get("http://yapi.smart-xwork.cn/mock/90460/page").then(function(ret) {
        let baseId = (page - 1) * pageSize;
        return {
          page,
          total: 100,
          pageSize,
          record: ret.data.data.filter(function(item, index) {
            return index > baseId && index < baseId + pageSize;
          }),
        };
      });
    },
  },
};
</script>
```

:::

## Mult-select batch operation

Setting attribute `row-key`, will auto enabled mult-select for table, and enabled attribute `reserve-selection`, reserve selection after data refreshing

Setting attribute `selection.sync`, will sync selected items in variable.<br/>
Setting attribute `selectable` decision row whether is can select.

:::demo

```vue
<template>
  <el-table-page ref="TablePage" :columns="columns" :request="getList" border :selection.sync="selection" row-key="id" :selectable="(row) => row.id != 3">
    <el-button size="small" @click="showSelection" slot="selection_right">Show selected</el-button>
  </el-table-page>
</template>
<script>
export default {
  data() {
    return {
      selection: [],
      columns: [
        {
          label: "Name",
          prop: "name",
          fixed: "left",
        },
        {
          label: "Email",
          prop: "email",
        },
        {
          label: "Score",
          prop: "score",
          filters: [["numeral", "0,0.00"]],
        },
        {
          label: "Registry Date",
          prop: "date",
          filters: [["dayjs", "MM-DD dd"]],
          showOverflowTooltip: true,
        },
        {
          label: "Status",
          prop: "status",
          enumTag: "el-tag",
          enum: [
            { label: "Normal", value: "1", type: "primary" },
            { label: "Block", value: "2", type: "warning" },
          ],
        },
      ],
    };
  },
  methods: {
    showSelection() {
      this.$msgbox({
        title: "Selection value:",
        dangerouslyUseHTMLString: true,
        message: `<pre>${JSON.stringify(this.selection, undefined, 3)}</pre>`,
      });
    },
    getList(page = 1, search, pageSize) {
      return axios.get("http://yapi.smart-xwork.cn/mock/90460/page").then(function(ret) {
        let baseId = (page - 1) * pageSize;
        return {
          page,
          total: 100,
          pageSize,
          record: ret.data.data.filter(function(item, index) {
            return index > baseId && index < baseId + pageSize;
          }),
        };
      });
    },
  },
};
</script>
```

:::

## Filters

use Vue2 feature `filters` in table cell.

### Examples

setting `filters: "empty"`, result following example

```vue
<template>
  {{ value | empty }}
</template>
```

setting `filters: [["sensitive","name"], "empty"]` , result following example

```vue
<template>
  {{ value | sensitive("name") | empty }}
</template>
```

:::tip
Global registered filters:

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
```

:::

:::warning
`filters` and `formatter` mutual exclusion, supported `filters` only when both setting.
:::

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
          label: "datetime",
          prop: "date",
          filters: "datetime",
        },
        {
          label: "date",
          prop: "date",
          filters: [["dayjs", "YYYY dd"]],
        },
        {
          label: "number",
          prop: "score",
          filters: [["numeral", "0,0a"]],
        },
        {
          label: "money",
          prop: "score",
          filters: [["numeral", "$0,0.00"]],
        },
        {
          label: "phone sensitive",
          prop: "phone",
          filters: [["sensitive", "phone"]],
        },
        {
          label: "email sensitive",
          prop: "email",
          filters: [["sensitive", "email"]],
        },
      ],
    };
  },
  methods: {
    getList(page = 1, search, pageSize) {
      return axios.get("http://yapi.smart-xwork.cn/mock/90460/page").then(function(ret) {
        let baseId = (page - 1) * pageSize;
        return {
          page,
          total: 100,
          pageSize,
          record: ret.data.data.filter(function(item, index) {
            return index > baseId && index < baseId + pageSize;
          }),
        };
      });
    },
  },
};
</script>
```

:::

## Slot

Design more slots, ensure the diversity of requirements as much as possible to solve products and designs.

:::tip
`search_button`, `selection` and `custom_column_button` will cover default content.
:::

:::warning
Add `search-` before slot name when set slot for `<el-formauto>`
:::

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
      <el-button type="primary" round size="mini">Edit</el-button>
      <el-button type="danger" round size="mini">Remove</el-button>
    </template>
    <template slot="search-name" slot-scope="{ item, model, name }">
      <el-input suffix-icon="el-icon-help" v-model="model[name]"></el-input>
    </template>
    <template slot="search_prepend">
      <el-alert title="search_prepend" type="success" :closable="false"></el-alert>
    </template>
    <template slot="search_button">
      <el-button @click="search">Search</el-button>
      <el-button @click="reset">Reset</el-button>
      <el-button>Append Button</el-button>
    </template>
    <template slot="search_append">
      <el-alert title="slot on the bottom of search form." type="success" :closable="false"></el-alert>
    </template>
    <template slot="middle">
      <el-alert title="slot between search and table." type="success" :closable="false"></el-alert>
    </template>
    <template slot="selection">
      <b>{{ selection.length }}</b> items
      <el-tooltip>
        <div slot="content">
          <div v-if="selection.length > 0">
            <p v-for="item in selection" :key="`selection_test_${item.id}`">{{ item.name }} {{ item.phone }}</p>
          </div>
          <div v-else>
            please select row item.
          </div>
        </div>
        <el-button type="text">selected</el-button>
      </el-tooltip>
      <el-button type="text" @click="clearSelection">Clear</el-button>
    </template>
    <template slot="custom_column_button">
      <el-tag type="warning" @click="openCustomColumnDialog">CustomColumn</el-tag>
    </template>
    <template slot="selection_right">
      <el-tag type="primary">slot on the right of selected status slot.</el-tag>
    </template>
    <template slot="table_button">
      <el-tag type="primary">button slot on the top right of table.</el-tag>
    </template>
    <template slot="table_prepend">
      <el-alert title="slot on the top of table." type="success" :closable="false"></el-alert>
    </template>
    <template slot="table_append">
      <el-alert title="	slot on the bottom of table." type="success" :closable="false"></el-alert>
    </template>
    <template slot="page_append">
      <el-alert title="slot on the bottom of pagination." type="success" :closable="false"></el-alert>
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
          label: "Name",
          prop: "name",
          fixed: "left",
          search: {
            type: "text",
            slot: "name",
          },
        },
        {
          label: "Email",
          prop: "email",
          showOverflowTooltip: true,
        },
        {
          label: "Score",
          prop: "score",
          filters: [["numeral", "0,0.00"]],
        },
        {
          label: "Register date",
          prop: "date",
          filters: "datetime",
        },
        {
          label: "Status",
          prop: "status",
          enumTag: "el-tag",
          enum: [
            { label: "Normal", value: "1", type: "primary" },
            { label: "Block", value: "2", type: "warning" },
          ],
        },
        {
          label: "Manual",
          prop: "option",
          fixed: "right",
          width: 200,
          slot: true,
        },
      ],
    };
  },
  methods: {
    search() {
      this.$refs["TablePage"].search();
    },
    reset() {
      this.$refs["TablePage"].resetSearch();
    },
    openCustomColumnDialog() {
      this.$refs["TablePage"].openCustomColumnDialog();
    },
    clearSelection() {
      this.$refs["TablePage"].clearSelection();
    },
    getList(page = 1, search, pageSize) {
      return axios.get("http://yapi.smart-xwork.cn/mock/90460/page").then(function(ret) {
        let baseId = (page - 1) * pageSize;
        return {
          page,
          total: 100,
          pageSize,
          record: ret.data.data.filter(function(item, index) {
            return index > baseId && index < baseId + pageSize;
          }),
        };
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
| search_prepend       | slot on the top of search form.                                                                             |
| search_button        | button slot in search form, use will replace default design.                                                |
| search_append        | slot on the bottom of search form.                                                                          |
| middle               | slot between search and table.                                                                              |
| selection            | selected status slot on the top left of table, use will replace default design.                             |
| selection_right      | slot on the right of selected status slot.                                                                  |
| custom_column_button | customize column button slot on the top right of table, use will replace default design.                    |
| table_button         | button slot on the top right of table.                                                                      |
| table_prepend        | slot on the top of table.                                                                                   |
| table_append         | slot on the bottom of table.                                                                                |
| page_append          | slot on the bottom of pagination.                                                                           |
