---
pageClass: component-page
---

# 表格表单 FormTable

解决表单交互中常用的开发重复性高、配置复杂等问题。

## 基础示例

::: demo

```vue
<template>
  <div>
    <el-form-table :data="form" ref="EditForm" v-model="model">
      <el-button slot="option_append" @click="setModel">赋值</el-button>
    </el-form-table>
    <div style="margin-top: 20px">表单字段: {{ model }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: [],
      form: {
        serviceName: {
          label: "坐席名称",
          type: "text",
          placeholder: "请输入1-20字符",
          maxLength: 20,
          showWordLimit: true,
          required: true,
        },
        binduserId: {
          label: "绑定员工",
          type: "select",
          required: true,
          style: "width:100%",
          remote: true,
          clearable: false,
          options: () => {
            return axios
              .get("https://jsonplaceholder.typicode.com/users")
              .then((res) => {
                return res.data.map((item) => {
                  return {
                    label: item.username,
                    value: item.id,
                  };
                });
              });
          },
        },
        employeeNum: {
          label: "坐席工号",
          type: "text",
          required: true,
        },
        displayId: {
          label: "密码",
          type: "password",
          required: true,
          addRules: [
            {
              pattern: /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/,
              message: "需要8位~16位以内，包含字母与数字的字符",
              trigger: "change",
            },
          ],
        },
        phone: {
          label: "手机/固话",
          type: "text",
          required: true,
          col: 12,
          addRules: [
            {
              pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
              message: "请输入正确手机号",
              trigger: "change",
            },
          ],
        },
      },
    };
  },
  methods: {
    setModel() {
      this.$refs.EditForm.setModel([
        { binduserId: 3 },
        { binduserId: { label: "test", value: "a3" } },
      ]);
    },
  },
};
</script>
```

:::

## options 设置

1. `options` 标准规范值是 `[{label: "苹果", value: "apple", icon:"el-icon-apple", disabled: false }, ...]` <br/>
2. `options` 值为 `["苹果", ...]` 文本数组时，`label` 与 `value` 皆为 "苹果"<br/>
3. `options` 值为 `{apple: "苹果", banana: "香蕉", ...}` 对象时，`label` 为值 `苹果`， `value` 为对应键值 `apple`<br/>
4. `options` 值为 `async (query?)=>{ return await $axios.get("options") }` 的 Promise 函数时，会在表单生成前执行，query 参数是当 `{type: "select",remote:true}` 时应用于远程搜索。<br/>
5. `type: "cascader"` 级联选择框只支持应用标准规范值。

```typescript
export declare interface ElAutoOption {
  icon?: string;
  label: string;
  type?: "primary" | "warning" | "info" | "danger";
  value: string | number;
  disabled?: boolean;
  children?: ElAutoOption[];
  props?: Record<string, any>;
}
export declare type ElAutoMixinOptions =
  | Record<string | number, string | number>
  | Array<string | ElAutoOption>;
```

::: demo

```vue
<template>
  <div>
    <el-form-table :data="form" ref="EditForm" v-model="model"> 
    <tempalte slot="daterange" slot-scope="{item,row,name}">
      <el-date-picker :type="item.type" v-model="row[name]" v-bind="item.props"></el-date-picker>
    </tempalte>
    </el-form-table>
    <div style="margin-top: 20px">表单字段: {{ model }}</div>
  </div>
</template>
<script>
export default {
  data() {
    let self = this;
    return {
      model: [],
      form: {
        id:{
          type:"hidden"
        },
        remote: {
          label: "远程搜索(选过不可再选)",
          type: "select",
          style: "width:100%",
          required: true,
          remote: true,
          options: (query, page) => {
            return axios
              .get("https://jsonplaceholder.typicode.com/users", {
                params: { query, page },
              })
              .then((res) => {
                return res.data.reduce((arr, item) => {
                  if (
                    self.model.findIndex(
                      (model) => model.remote == item.id * page
                    ) < 0
                  ) {
                    arr.push({
                      label: item.username,
                      value: item.id * page,
                    });
                  }
                  return arr;
                }, []);
              });
          },
        },
        remoteMult: {
          label: "远程搜索",
          type: "select",
          style: "width:100%",
          multiple: true,
          required: true,
          loadScroll: true,
          remote: true,
          options: (query, page) => {
            return axios
              .get("https://jsonplaceholder.typicode.com/users", {
                params: { query, page },
              })
              .then((res) => {
                return res.data
                  .filter((item) => item.username.indexOf(query) > -1)
                  .map((item) => {
                    return {
                      label: item.username,
                      value: item.id * page,
                    };
                  });
              });
          },
        },
        cascader: {
          label: "级联框",
          type: "cascader",
          options: [
            {
              label: "节点1",
              value: 1,
              children: [
                {
                  label: "节点4",
                  value: 4,
                  children: [{ label: "节点5", value: 5 }],
                },
              ],
            },
            {
              label: "节点2",
              value: 2,
              children: [{ label: "节点6", value: 6 }],
            },
            { label: "节点3", value: 3 },
          ],
          style: "width:100%",
        },
        daterange: {
          label: "日期范围",
          type: "daterange",
          valueFormat: "unix",
          rangeName: ["startDate", "endDate"],
          suffixTime: true,
          style: "width:100%",
          slot: true,
        },
        date: {
          label: "日期",
          type: "date",
          valueFormat: "unix",
          style: "width:100%",
        },
      },
    };
  },
  methods: {
    reset() {
      this.$refs["EditForm"].reset();
    },
  },
};
</script>
```

:::

## 自定义动态插槽

支持对表单项自定义动态插槽，通过设置 slot 属性，可设置`boolean`、`string`类型，设置为 true 时，slot 名为属性的字段名，slot 为字符串类型时，多个字段可复用一个插槽，插槽携带参数如下：

- `item` 字段属性
- `row` 当前行记录
- `name` 字段名
- `index` 索引

::: demo

```vue
<template>
  <div>
    <el-form-table :data="form" ref="EditForm" v-model="model">
      <el-tag slot="option_perpend" type="primary">首部操作区前置</el-tag>
      <el-tag slot="option_append" type="primary">首部操作区追加</el-tag>
      <template slot-scope="{ item, row, name }" slot="customSlot">
        自定义 <el-input v-model="row[name]" style="width:100px"></el-input>
      </template>
      <template slot="table_body_option" slot-scope="{ row, index }">
        <el-button
          icon="el-icon-remove"
          tpye="text"
          @click="remove(index)"
        ></el-button>
      </template>
    </el-form-table>
    <div style="margin-top: 20px">表单字段: {{ model }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: [],
      form: {
        remote: {
          col: 12,
          label: "远程搜索",
          type: "select",
          style: "width:100%",
          required: true,
          loadScroll: true,
          remote: true,
          options: (query, page) => {
            return axios
              .get("https://jsonplaceholder.typicode.com/users", {
                params: { query, page },
              })
              .then((res) => {
                return res.data
                  .filter((item) => item.username.indexOf(query) > -1)
                  .map((item) => {
                    return {
                      label: item.username,
                      value: item.id * page,
                    };
                  });
              });
          },
        },
        customSlot: {
          col: 12,
          label: "自定义",
          type: "plain",
          slot: true,
        },
        remoteCascader: {
          col: 12,
          label: "级联框",
          type: "cascader",
          props: { label: "name", value: "id", children: "childrenList" },
          options: () => {
            return axios
              .get("/element-ui-saas-extend/json/cascader.json")
              .then((res) => {
                return res.data;
              });
          },
          style: "width:100%",
        },
      },
    };
  },
  methods: {
    remove(index) {
      this.$refs["EditForm"].removeItem(index);
    },
  },
};
</script>
```

:::

## 属性

### Props

| 参数            | 描述                        | 类型                                                        | 可选值 | 默认值 |
| :-------------- | :-------------------------- | :---------------------------------------------------------- | :----- | ------ |
| v-model         | 表单数据对象                | `Array<Record<string,any>>`                                 | -      | []     |
| data            | 表单项配置                  | [Record&lt;name:string,FormTableField&gt;](#FormTableField) | -      | {}     |
| item-limit      | 限制最大成员数量            | `number`                                                    | -      | -1     |
| add-text        | 添加按钮文案                | `string`                                                    | -      | 添加   |
| showClear       | 显示清空按钮                | `boolean`                                                   | -      | false  |
| `[prop:string]` | 继承 `<el-table>` 所有 Prop | `any`                                                       | -      | -      |

### FormTableField

| 参数            | 描述                                                                                         | 类型                            | 默认值 |
| :-------------- | :------------------------------------------------------------------------------------------- | :------------------------------ | :----- |
| 标签相关设置    |                                                                                              |                                 |        |
| label           | 标签名                                                                                       | `string`                        | -      |
| labelTooltip    | 表单项提示                                                                                   | `string` / `boolean`            | false  |
| width           | 列宽度                                                                                       | `string`                        | -      |
| value           | 字段默认值                                                                                   | `any`                           | -      |
| 控件相关设置    |                                                                                              |                                 |        |
| type            | 必填，控件类型                                                                               | [参照 type Enum 表](#type-enum) | -      |
| slot            | 自定义动态插槽，设为 true 时，slot 为 name，详情可参考 [自定义动态插槽示例](#自定义动态插槽) | `string` / `boolean`            | false  |
| component       | 组件名称，type 为 `component` 时有效                                                         | `string`                        | -      |
| `[prop:string]` | 可直接追加 type 对应组件的 prop                                                              | `any`                           | -      |
| disabled        | 是否禁用字段                                                                                 | `boolean`                       | false  |
| placeholder     | 占位符                                                                                       | `array`                         | -      |
| on              | 设置 type 对应组件的事件                                                                     | `object`                        | {}     |
| rangeName       | 日期范围名 type 为 daterange/timerange/datetimerange/numberrange 选填                        | `array<string>`                 | false  |
| suffixTime      | type 为 daterange 选填，为日期范围增加 00:00:00 - 23:59:59                                   | `boolean`                       | false  |
| options         | 控件选项，type 为 check/radio/select 必填，详情可参考 [options 设置](#options-设置)          | `object` / `array` / `Promise`  | []     |
| remote          | 支持接口搜索，type 为 select 有效                                                            | `boolean`                       | false  |
| 表单相关设置    |                                                                                              |                                 |        |
| required        | 是否必填                                                                                     | `boolean`                       | false  |
| addRules        | 追加验证规则                                                                                 | `array`                         | -      |

### type Enum

| 值            | 对应组件                                    | 描述             |
| :------------ | :------------------------------------------ | :--------------- |
| text          | &lt;el-input type="text"&gt;                | 文本输入框       |
| password      | &lt;el-input type="password"&gt;            | 密码输入框       |
| textarea      | &lt;el-input type="textarea"&gt;            | 文本域           |
| number        | &lt;el-input-number&gt;                     | 计数器           |
| numberrange   | &lt;el-number-range&gt;                     | 数值范围         |
| date          | &lt;el-date-picker type="date"&gt;          | 日期选择         |
| year          | &lt;el-date-picker type="year"&gt;          | 年份选择         |
| month         | &lt;el-date-picker type="month"&gt;         | 月份选择         |
| week          | &lt;el-date-picker type="week"&gt;          | 周选择           |
| dates         | &lt;el-date-picker type="dates"&gt;         | 多日期选择       |
| datetime      | &lt;el-date-picker type="datetime"&gt;      | 日期时间选择     |
| daterange     | &lt;el-date-picker type="daterange"&gt;     | 日期范围选择     |
| monthrange    | &lt;el-date-picker type="date"&gt;          | 月份范围选择     |
| datetimerange | &lt;el-date-picker type="datetimerange"&gt; | 日期时间范围选择 |
| time          | &lt;el-time-picker&gt;                      | 时间选择         |
| timerange     | &lt;el-time-picker is-range&gt;             | 时间范围选择     |
| radio         | &lt;el-radio&gt;                            | 单选框           |
| radiobutton   | &lt;el-radio-button&gt;                     | 单选框           |
| check         | &lt;el-checkbox&gt;                         | 复选框           |
| select        | &lt;el-select&gt;                           | 选择框           |
| slider        | &lt;el-slider&gt;                           | 滑动选择框       |
| switch        | &lt;el-switch&gt;                           | 开关             |
| cascader      | &lt;el-cascader&gt;                         | 多级选择框       |
| rate          | &lt;el-rate&gt;                             | 评分             |

### Method

| 方法名          | 描述                         | 参数                                                   | 返回                   |
| :-------------- | :--------------------------- | :----------------------------------------------------- | ---------------------- |
| clear()         | 清空所有                     | -                                                      | -                      |
| validate()      | 对整个表单进行校验的方法     | `valid:boolean`                                        | `Promise<void> | void` |
| validateField() | 对部分表单字段进行校验的方法 | `(prop:array | string,callback:(errMsg:string)=>void)` | -                      |
| addItem()       | 添加项                       | `model?:Record<string,any>`                            | -                      |
| removeItem()    | 获取表单所有参数             | `index:number`                                         | -                      |

### Slot

| 插槽           | 描述           |
| :------------- | :------------- |
| option_prepend | 首部操作区前置 |
| option_append  | 首部操作区追加 |
| prepend        | 表格上方操作区 |

### Scope Slot

| 插槽名称          | 描述                                              |
| :---------------- | :------------------------------------------------ |
| 自定义名称        | 自定义表单项的内容，参数为 { item, row, name }    |
| table_body_option | 自定义表格右侧操作列的内容，参数为 { row, index } |

### Event

| 事件名称     | 说明                                 | 回调参数 |
| :----------- | :----------------------------------- | :------- |
| [event:name] | 可直接追加 &lt;el-table&gt; 所有事件 | -        |
