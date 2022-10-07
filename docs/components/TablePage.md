---
pageClass: component-page
---

# 表格页面 TablePage

将 `<el-table>` 与 `<el-form-auto>` 结合更快的完成常用表格页面。

## 添加搜索项

设置 `columns` 时，对列增加 search 属性 [[属性值参考](./FormAuto.html#%E5%B1%9E%E6%80%A7)]，可快速添加筛选组件，快速配置组件。
:::tip
当遇到需要增加筛选项时，亦可在 想增加的列中增加 `addSearch` 属性，同样[[属性值参考](./FormAuto.html#%E5%B1%9E%E6%80%A7)] 文档，具体看示例

:::

:::demo

<<< @/docs/example/TablePage/Basic.vue

:::

## 自定义列

设置 `custom-columns` 将会开启 自定义列 按钮，该值将会做为 localStorage 以 `ElTablePage_${custom-columns}` 格式的键名 存储对列的排序，隐藏，固定的设置

:::demo

```vue
<template>
  <el-table-page :columns="columns" custom-columns="table_test1" :request="getList"> </el-table-page>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          label: "ID",
          prop: "id",
          fixed: "left",
          width: 100,
        },
        {
          label: "姓名",
          prop: "name",
          fixed: "left",
          width: 200,
        },
        {
          label: "联系方式",
          prop: "contact",
          children: [
            {
              label: "手机",
              prop: "phone",
              width: 200,
            },
            {
              label: "邮箱",
              prop: "email",
              copy: true,
              showOverflowTooltip: true,
              width: 260,
            },
          ],
        },
        {
          label: "积分",
          prop: "score",
          width: 180,
        },
        {
          label: "余额",
          prop: "balance",
          filters: [["numeral", "0,0.00"]],
          width: 180,
        },
        {
          label: "注册日期",
          prop: "date",
          hide: true,
          filters: [["dayjs", "MM-DD dd"]],
          showOverflowTooltip: true,
          width: 200,
        },
        {
          label: "状态",
          prop: "status",
          enumTag: "el-tag",
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
      return axios.get("/element-ui-saas-extend/json/page.json").then(function(ret) {
        return ret.data.data.slice(0, 10);
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
    <el-button size="small" @click="showSelection" slot="selection_right">显示已选项</el-button>
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
          label: "邮箱",
          prop: "email",
        },
        {
          label: "积分",
          prop: "score",
          filters: [["numeral", "0,0.00"]],
        },
        {
          label: "注册日期",
          prop: "date",
          filters: [["dayjs", "MM-DD dd"]],
          showOverflowTooltip: true,
        },
        {
          label: "状态",
          prop: "status",
          enumTag: "el-tag",
          enum: [
            { label: "正常", value: "1", type: "primary" },
            { label: "失效", value: "2", type: "warning" },
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
      return axios.get("/element-ui-saas-extend/json/page.json").then(function(ret) {
        let baseId = (page - 1) * pageSize;
        return {
          page,
          total: 100,
          pageSize,
          record: ret.data.data.slice(baseId, baseId + pageSize),
        };
      });
    },
  },
};
</script>
```

:::

## 应用过滤器

表格常常需要对列内容展示进行格式化处理，所以很多时候经常需要为列内容自定义插槽 应用过滤器 格式化

### 示例

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

:::warning
`filters` 与 `formatter` 属性不可共用，都赋值时，仅采用 `filters`
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
          filters: [["numeral", "$0,0.00"]],
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
    getList(page = 1, search, pageSize) {
      return axios.get("/element-ui-saas-extend/json/page.json").then(function(ret) {
        let baseId = (page - 1) * pageSize;
        return {
          page,
          total: 100,
          pageSize,
          record: ret.data.data.slice(baseId, baseId + pageSize),
        };
      });
    },
  },
};
</script>
```

:::

## 所有插槽

作为预设组件，为尽可能的保证需求的多样性应对产品与设计，所以尽可能的多设置些插槽，便于临时特殊需要增加元素的情况，

:::tip
`search_button`、`selection` 和 `custom_column_button` 将会覆盖预设内容，由用户自定义插槽
:::

:::warning
由于存在搜索表单组件存在需要自定义动态插槽的情况，自定义方式除 slot 名字增加前缀 `search-`，其它一致，详细参考下例示例
:::

:::demo

```vue
<template>
  <el-table-page ref="TablePage" :columns="columns" :request="getList" row-key="id" :selection.sync="selection" custom-columns="table_test2">
    <template slot="expand" slot-scope="{ row, index }">
      <el-form label-position="left" class="demo-table-expand">
        <el-form-item label="姓名">
          <span>{{ row.name }}</span>
        </el-form-item>
        <el-form-item label="邮箱">
          <span>{{ row.email }}</span>
        </el-form-item>
      </el-form>
    </template>
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
      <el-button @click="search">搜索</el-button>
      <el-button @click="reset">重置</el-button>
    </template>
    <template slot="search_button_append">
      <el-button>增加按钮</el-button>
    </template>
    <template slot="search_append">
      <el-alert title="搜索下方插槽" type="success" :closable="false"></el-alert>
    </template>
    <template slot="middle">
      <el-alert title="搜索框与表格框中间插槽" type="success" :closable="false"></el-alert>
    </template>
    <template slot="selection">
      <el-tooltip>
        <div slot="content">
          <div v-if="selection.length > 0">
            <p v-for="item in selection" :key="`selection_test_${item.id}`">{{ item.name }} {{ item.phone }}</p>
          </div>
          <div v-else>
            请先选择行
          </div>
        </div>
        <el-button type="text">已选中</el-button>
      </el-tooltip>
      {{ selection.length }} 条
      <el-button type="text" @click="clearSelection">清空</el-button>
    </template>
    <template slot="custom_column_button">
      <el-button type="primary" size="small" @click="openCustomColumnDialog">自定义列</el-button>
    </template>
    <template slot="selection_right">
      <el-tag type="primary">表格左上方已选状态右边的插槽</el-tag>
    </template>
    <template slot="table_button">
      <el-tag type="primary"> 表格右上方按钮区域插槽</el-tag>
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
          search: {
            type: "text",
            slot: "name",
          },
        },
        {
          label: "邮箱",
          prop: "email",
          showOverflowTooltip: true,
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
        },
        {
          label: "状态",
          prop: "status",
          enumTag: "el-tag",
          enum: [
            { label: "Normal", value: "1", type: "primary" },
            { label: "Block", value: "2", type: "warning" },
          ],
        },
        {
          label: "操作",
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
      return axios.get("/element-ui-saas-extend/json/page.json").then(function(ret) {
        let baseId = (page - 1) * pageSize;
        return {
          page,
          total: 100,
          pageSize,
          record: ret.data.data.slice(baseId, baseId + pageSize),
        };
      });
    },
  },
};
</script>
```

:::

## 属性

### Props

| 参数                  | 描述                                                                                                    | 类型                                                                                                                                | 可选值 | 默认值           |
| :-------------------- | :------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------- | :----- | ---------------- |
| columns               | 列配置                                                                                                  | [columns[]](#prop-columns-attribute)                                                                                                | -      | []               |
| search-props          | 表单项配置，参考 [FormAuto 属性](FormAuto.html#props)                                                   | [FormAuto Prop](FormAuto.html#props)                                                                                                | -      | `{inline: true}` |
| `[prop:string]`       | 可追加 &lt;el-table&gt; 的 [属性](https://element.eleme.io/#/zh-CN/component/table#table-attributes)    | `any`                                                                                                                               | -      |
| 请求相关              |                                                                                                         |                                                                                                                                     |        |                  |
| request               | 请求方法，参考 [添加搜索项](#添加搜索项)，当函数返回结果类型为数组时将隐藏分页组件                      | `(page: number, search: Record<string, any>, pageSize: number) => Promise<Record<ElTablePageDataMap, any> | Record<string, any>[]>` | -      | -                |
| page-layout           | 分页组件布局，参考 [文档 layout 属性](https://element.eleme.io/#/zh-CN/component/pagination#attributes) | `string`                                                                                                                            | -      | -                |
| page-sizes            | 分页组件每页显示个数选择器的选项设置                                                                    | `number[]`                                                                                                                          | -      | -                |
| 多选相关              | 参考 [示例](#多选批量操作)                                                                              |                                                                                                                                     |        |                  |
| row-key               | 与 &lt;el-table&gt;的 row-key 用法相同，赋值该属性则化开启多选功能                                      | `string` / `Function(row)`                                                                                                          | -      | -                |
| selectable            | 多选时决定这一行的 CheckBox 是否可以勾选                                                                | `(row,index)=>boolean`                                                                                                              | -      | -                |
| selection             | 已选中项，支持.sync                                                                                     | `object[]`                                                                                                                          | `[]`   |
| 自定义列相关          |                                                                                                         |                                                                                                                                     |        |                  |
| custom-columns        | 开启自定义列，该值将按 `ElTablePage_${custom-columns}` 为键名在 `localStorage` 保存自定义列的结果       | `string`                                                                                                                            | -      | false            |
| layout-type           | 表格页主题                                                                                              | `default` / `card`                                                                                                                  | -      | -                |
| button-style          | 默认按钮样式简易自定义                                                                                  | `el-button属性`                                                                                                                     | -      | -                |
| show-overflow-tooltip | 所有列默认当内容过长被隐藏时显示 tooltip                                                                | `Boolean`                                                                                                                           | -      | false            |

### Prop: columns Attribute

| 参数            | 描述                                                                                                                                           | 类型                                                         | 默认值 |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- | :----- |
| label           | 列显示标题                                                                                                                                     | `string`                                                     | -      |
| prop            | 列对应字段名                                                                                                                                   | `boolean`                                                    | false  |
| children        | 多级表头                                                                                                                                       | `columns[]`                                                  | -      |
| labelTooltip    | 列名提示                                                                                                                                       | `string`                                                     | false  |
| copy            | 增加复制功能                                                                                                                                   | `boolean`                                                    | false  |
| hide            | 是否隐藏                                                                                                                                       | `boolean`                                                    | -      |
| fixed           | 字段默认值                                                                                                                                     | `left` / `right` / `boolean`                                 | -      |
| filters         | 应用 Vue 过滤器，具体参考此 [示例](#应用过滤器)                                                                                                | -                                                            | -      |
| slot            | 自定义动态插槽，设为 true 时，slot 为 prop，详情可参考 [插槽示例](#所有插槽)                                                                   | `string` / `boolean`                                         | false  |
| enum            | 列内容枚举值，与 FormAuto 的 options 属性一致，详情可参考[options 设置](FormAuto.html#options-设置)，配置 `search.options` 属性时默认应用 enum |                                                              | -      |
| splitChar       | 仅 `enum` 值且数据值为序列化字符串时，设置列值分隔符 split 数据值                                                                              | `string`                                                     | -      |
| search          | 为此字段添加搜索项，参考 [添加搜索项](#添加搜索项)                                                                                             | [FormAutoField](FormAuto.html#formautofield)                 | -      |
| addSearch       | 为此字段后添加更多搜索项，参考 [添加搜索项](#添加搜索项)                                                                                       | [Record<string, FormAutoField>](FormAuto.html#formautofield) | -      |
| `[prop:string]` | 可直接追加 `<el-table-column>` 组件的 prop，参考 [`<el-table>`属性](https://element.eleme.io/#/zh-CN/component/table#table-attributes)         | `any`                                                        | -      |

### ElTablePageDataMap

| 参数     | 描述       | 类型                   |
| :------- | :--------- | :--------------------- |
| page     | 页码       | `number`               |
| pageSize | 页成员数量 | `number`               |
| total    | 总成员数量 | `number`               |
| record   | 数据记录   | `Record<string,any>[]` |

### Event

| 事件名称             | 说明                                                                                             | 回调参数  |
| :------------------- | :----------------------------------------------------------------------------------------------- | :-------- |
| saved-custom-columns | 保存自定义列设置                                                                                 | `setting` |
| `[event:name]`       | 可直接追加 [&lt;el-table&gt;事件](https://element.eleme.io/#/zh-CN/component/table#table-events) | -         |

### Method

| 方法名                   | 描述                                                 | 参数 |
| :----------------------- | :--------------------------------------------------- | :--- |
| search()                 | 搜索                                                 | -    |
| resetSearch()            | 重置搜索表单                                         | -    |
| clearSelection()         | 清空已选项                                           | -    |
| openCustomColumnDialog() | 仅在`custom-columns`有值时有效，打开自定义列设置弹窗 | -    |
| getParams()              | 获取当前搜索参数                                     | -    |

### Slot

| 插槽                 | 描述                                           |
| :------------------- | :--------------------------------------------- |
| search_prepend       | 搜索上方插槽                                   |
| search_button        | 搜索按钮自定义插槽                             |
| search_button_append | 搜索按钮右侧自定义插槽                         |
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
| expand           | 展开行内容，参数为 { row, index }                 |
