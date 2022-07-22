---
pageClass: component-page
---

# 表单 FormAuto

解决表单交互中开发重复性高、配置复杂等问题。

## 内联表单

常用于搜索筛选交互。

::: demo

```vue
<template>
  <el-form-auto :data="form" :show-message="false" ref="FilterForm" v-model="model" label-width="70px" inline>
    <el-button type="primary" round @click="getList">筛选</el-button>
  </el-form-auto>
</template>
<script>
export default {
  data() {
    return {
      form: {
        account: {
          label: "文本框",
          type: "text",
        },
        date: {
          label: "日期",
          type: "date",
        },
        dateRange: {
          label: "日期范围",
          type: "datetimerange",
          rangeName: ["startDate", "endDate"],
          valueFormat: "unix",
        },
        numberrange: {
          label: "金额范围",
          type: "numberrange",
          rangeName: ["min", "max"],
        },
        status: {
          label: "选择框",
          type: "select",
          options: [
            {
              label: "选项1",
              value: 2,
            },
            {
              label: "带图标选项3",
              value: 5,
              icon: "el-icon-help",
            },
            {
              label: "选项禁用2",
              value: 6,
              disabled: true,
            },
            "选项2",
          ],
        },
      },
      model: {},
    };
  },
  methods: {
    getList() {
      this.$msgbox({
        title: "表单返回数据",
        dangerouslyUseHTMLString: true,
        message: `<pre>${JSON.stringify(this.model, undefined, 3)}</pre>`,
      });
    },
  },
};
</script>
```

:::

## 基础栅格表单

常用于编辑交互，应用了 `<el-row>` 可对表单项进行布局。

::: demo

```vue
<template>
  <el-form-auto :data="form" ref="EditForm" v-model="model" label-width="120px">
    <template>
      <el-button type="primary" round @click="getValidModel">提交</el-button>
      <el-button type="primary" round @click="getModel">获取数据</el-button>
      <el-button type="primary" round @click="reset">重置</el-button>
      <el-button type="primary" round @click="edit">编辑</el-button>
      <el-button type="primary" round @click="changeRule">改变规则</el-button>
    </template>
  </el-form-auto>
</template>
<script>
let defaultOption = [
  {
    label: "选项1",
    value: 0,
  },
  {
    label: "带图标选项3",
    icon: "el-icon-help",
    value: 3,
  },
  {
    label: "选项禁用2",
    value: 2,
    disabled: true,
  },
  "选项2",
];
export default {
  data() {
    return {
      model: {},
      form: {
        id: {
          label: "id",
          type: "hidden",
        },
        switch: {
          col: 4,
          label: "开关",
          type: "switch",
          activeValue: 1,
          inactiveValue: 0,
          // value: 0,
          required: true,
        },
        slider: {
          col: 8,
          label: "滑块",
          type: "slider",
          value: 10,
          required: true,
        },
        text: {
          col: 12,
          label: "文本框",
          // disabled: true,
          labelTooltip: "labelTooltip属性可以在标签旁增加图标，提示字段含义",
          type: "text",
          required: true,
        },
        password: {
          col: 12,
          label: "密码框",
          type: "password",
          required: true,
          addRules: [
            {
              pattern: /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/,
              message: "需要8位~16位以内，包含字母与数字的字符",
            },
          ],
        },
        cascader: {
          col: 12,
          label: "级联框",
          type: "cascader",
          required: true,
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
        select: {
          col: 12,
          label: "选择框",
          type: "select",
          required: true,
          style: "width:100%",
          options: defaultOption,
        },
        date: {
          col: 12,
          label: "日期",
          type: "week",
          required: true,
          style: "width:100%",
        },
        datetime: {
          col: 12,
          label: "日期时间",
          type: "datetime",
          required: true,
          style: "width:100%",
        },
        time: {
          col: 12,
          label: "时间",
          type: "time",
          required: true,
          style: "width:100%",
        },
        timeRange: {
          col: 12,
          label: "时间范围",
          type: "timerange",
          rangeName: ["startTime", "endTime"],
          value: ["07:00:08", "08:00:09"],
          required: true,
          style: "width:100%",
        },
        dateRange: {
          col: 12,
          label: "日期范围",
          type: "daterange",
          rangeName: ["startDate", "endDate"],
          required: true,
          style: "width:100%",
        },
        datetimeRange: {
          label: "日期时间范围",
          type: "datetimerange",
          rangeName: ["startDT", "endDT"],
          required: true,
          style: "width:500px",
        },
        radio: {
          label: "单选框",
          type: "radio",
          required: true,
          options: defaultOption,
        },
        radiobutton: {
          label: "单选按钮",
          type: "radiobutton",
          options: defaultOption,
          required: true,
        },
        check: {
          label: "复选框",
          type: "check",
          required: true,
          options: { 1: "选项1", 2: "选项2", 3: "选项3" },
        },
        rate: {
          label: "评分",
          type: "rate",
          required: true,
        },
        textarea: {
          label: "备注",
          type: "textarea",
          minlength: 5,
          maxlength: 10,
          showWordLimit: true,
        },
      },
    };
  },
  mounted() {
    this.model = {
      id: "123",
      switch: 1,
      text: "文本框",
      password: "password123456",
      date: "2021-01-10",
      datetime: "2021-01-10 11:11:00",
      dateRange: ["2021-01-10", "2021-01-13"],
      datetimeRange: ["2021-01-10 11:11:00", "2021-01-12 13:11:00"],
      time: "11:11:00",
      // timeRange: ["11:11:00", "23:12:00"],
      select: 0,
      check: ["1", "2", "3"],
      radiobutton: 0,
      radio: 3,
      cascader: [2, 6],
      rate: 5,
    };
  },
  methods: {
    reset() {
      this.$refs["EditForm"].reset();
    },
    changeRule() {
      this.form.rate.required = false;
      this.form.check.required = false;
      this.form.datetimeRange.required = false;
    },
    edit() {
      this.model = {
        id: "123",
        switch: 0,
        // slider: 23,
        text: "文本",
        password: "password123456",
        textarea: null,
        date: "2021-01-10",
        datetime: "2021-01-10 11:11:00",
        dateRange: ["2021-01-10", "2021-01-13"],
        datetimeRange: ["2021-01-10 11:11:00", "2021-01-12 13:11:00"],
        time: "11:11:00",
        timeRange: ["11:11:00", "22:12:00"],
        select: 0,
        check: [1],
        radiobutton: 0,
        radio: 3,
        cascader: [2, 6],
        rate: 5,
      };
    },
    getModel() {
      this.$msgbox({
        title: "表单返回数据",
        dangerouslyUseHTMLString: true,
        message: `<pre>${JSON.stringify(this.model, undefined, 3)}</pre>`,
      });
    },
    async getValidModel() {
      try {
        await this.$refs["EditForm"].validate();
        this.$msgbox({
          title: "表单返回数据",
          dangerouslyUseHTMLString: true,
          message: `<pre>${JSON.stringify(this.model, undefined, 3)}</pre>`,
        });
      } catch {}
    },
  },
};
</script>
```

:::

## 绑定显隐

表单项增加 `bindShow` 属性，解决复杂表单交互

::: demo

```vue
<template>
  <el-form-auto :data="form" v-model="model" label-width="130px">
    <div>{{ model }}</div>
  </el-form-auto>
</template>
<script>
export default {
  data() {
    return {
      model: {},
      form: {
        subject: {
          label: "主体",
          type: "radio",
          required: true,
          options: { person: "个人", company: "企业" },
          value: "person",
        },
        person_name: {
          label: "姓名",
          type: "text",
          required: true,
          bindShow: (model) => {
            return model.subject == "person";
          },
        },
        person_number: {
          label: "身份证",
          type: "text",
          required: true,
          bindShow: (model) => {
            return model.subject == "person";
          },
        },
        company_name: {
          label: "企业名称",
          type: "text",
          required: true,
          bindShow: (model) => {
            return model.subject == "company";
          },
        },
        company_number: {
          label: "统一税务登记号",
          type: "text",
          required: true,
          bindShow: (model) => {
            return model.subject == "company";
          },
        },
      },
    };
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
export declare type ElAutoMixinOptions = Record<string | number, string | number> | Array<string | ElAutoOption>;
```

::: demo

```vue
<template>
  <el-form-auto :data="form" ref="EditForm" v-model="model" label-width="90px">
    <el-button type="primary" @click="editOptionReshow">远程搜索选项回显</el-button>
    <el-button type="primary" @click="reset">重置</el-button>
  </el-form-auto>
</template>
<script>
export default {
  data() {
    return {
      model: {},
      form: {
        asyncSelect: {
          col: 12,
          label: "渲染框",
          type: "select",
          style: "width:100%",
          filterable: true,
          options: () => {
            return axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
              return res.data.map((item) => {
                return {
                  label: item.username,
                  value: item.id,
                };
              });
            });
          },
          on: {
            change: () => {
              this.$refs["EditForm"].refreshOptions("remote");
            },
          },
        },
        remote: {
          col: 12,
          label: "远程搜索",
          type: "select",
          style: "width:100%",
          required: true,
          loadScroll: true,
          remote: true,
          options: this.getOptions,
        },
        remoteMult: {
          col: 12,
          label: "远程搜索",
          type: "select",
          style: "width:100%",
          multiple: true,
          required: true,
          loadScroll: true,
          remote: true,
          options: (query, page) => {
            return axios.get("https://jsonplaceholder.typicode.com/users", { params: { query, page } }).then((res) => {
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
          col: 12,
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
        remoteCascader: {
          col: 12,
          label: "级联框",
          type: "cascader",
          props: { label: "name", value: "id", children: "childrenList" },
          options: () => {
            return axios.get("/element-ui-saas-extend/json/cascader.json").then((res) => {
              return res.data;
            });
          },
          style: "width:100%",
        },
        radio: {
          col: 12,
          label: "单选框",
          type: "radio",
          notAll: true,
          options: ["单选1", "单选2", "单选3"],
        },
        check: {
          label: "复选框",
          type: "check",
          options: [
            "复选1",
            "复选2",
            {
              label: "带图标复选3",
              value: 3,
              icon: "el-icon-help",
            },
          ],
        },
        remoteCheck: {
          label: "复选框",
          type: "check",
          required: true,
          options: () => {
            return axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
              return res.data.map((item) => {
                return {
                  label: item.username,
                  value: item.id,
                };
              });
            });
          },
        },
      },
    };
  },
  methods: {
    editOptionReshow() {
      this.$refs["EditForm"].setModel({
        asyncSelect: 1,
        remote: { label: "回显测试", value: "echo_show" },
        remoteMult: [
          { label: "测试", value: "123" },
          { label: "测试2", value: "1233" },
        ],
      });
      // this.model.asyncSelect = 1;
      // this.model.remote = { label: "回显测试", value: "123" };
      // this.model.remoteMult = [
      //   { label: "测试", value: "123" },
      //   { label: "测试2", value: "1233" },
      // ];
    },
    getOptions(query, page) {
      // console.log(this.model.asyncSelect);
      return axios.get("https://jsonplaceholder.typicode.com/users", { params: { query: this.model.asyncSelect, page } }).then((res) => {
        if (page > 2) return [];
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
    reset() {
      this.$refs["EditForm"].reset();
    },
  },
  mounted() {
    this.model.remote = { label: "测试", value: "123" };
    this.model.remoteMult = [
      { label: "测试", value: "123" },
      { label: "测试2", value: "1233" },
    ];
  },
};
</script>
```

:::

## 自定义动态插槽

支持对表单项自定义动态插槽，通过设置 slot 属性，可设置`boolean`、`string`类型，设置为 true 时，slot 名为属性的字段名，slot 为字符串类型时，多个字段可复用一个插槽，插槽携带参数如下：

- `item` 字段属性
- `model` 表单 model
- `name` 字段名

:::demo

```vue
<template>
  <el-form-auto :data="form" v-model="model" label-width="90px">
    <template slot-scope="{ item, model, name }" slot="upload">
      <el-upload action="https://jsonplaceholder.typicode.com/upload" v-model="model[name]" :on-success="uploadSuccess">
        <el-button round type="primary" icon="el-icon-upload">上传文件</el-button>
      </el-upload>
    </template>
    <template slot-scope="{ item, model, name }" slot="color">
      <el-color-picker v-model="model[name]"></el-color-picker>
    </template>
    <div>表单字段: {{ model }}</div>
  </el-form-auto>
</template>
<script>
export default {
  data() {
    return {
      form: {
        user: {
          col: 12,
          label: "选择用户",
          labelTooltip: "自定义的组件，可直接使用",
          type: "component",
          component: "user-selector",
          on: {
            select: (item) => {
              this.model.id = item.id;
              this.model.name = item.name;
              this.model.phone = item.phone;
              this.model.email = item.email;
            },
          },
        },
        id: {
          col: 12,
          label: "用户ID",
          notSubmit: true,
          type: "plain",
          value: "未选择",
        },
        name: {
          col: 12,
          label: "姓名",
          type: "plain",
          notSubmit: true,
          value: "未选择",
        },
        phone: {
          col: 12,
          label: "手机",
          type: "plain",
          value: "未选择",
          notSubmit: true,
        },
        email: {
          col: 12,
          label: "邮箱",
          type: "plain",
          value: "未选择",
        },
        color1: {
          col: 12,
          label: "颜色1",
          type: "text",
          slot: "color",
        },
        color2: {
          col: 12,
          label: "颜色2",
          type: "text",
          slot: "color",
        },
        upload: {
          label: "上传",
          slot: true,
          type: "text",
        },
      },
      model: {},
    };
  },
  methods: {
    uploadSuccess(res, file, filelist) {
      this.model.upload = res.path;
    },
  },
};
</script>
```

:::

## 属性

### Props

| 参数            | 描述                       | 类型                                                      | 可选值 | 默认值 |
| :-------------- | :------------------------- | :-------------------------------------------------------- | :----- | ------ |
| v-model         | 表单数据对象               | `object`                                                  | -      | {}     |
| data            | 表单项配置                 | [Record&lt;name:string,FormAutoField&gt;](#FormAutoField) | -      | {}     |
| gutter          | &lt;el-row&gt; 属性 gutter | `number`                                                  | -      | 15     |
| `[prop:string]` | 继承 el-form 所有 Prop     | `any`                                                     | -      | -      |

### FormAutoField

| 参数            | 描述                                                                                         | 类型                            | 默认值 |
| :-------------- | :------------------------------------------------------------------------------------------- | :------------------------------ | :----- |
| 标签相关设置    |                                                                                              |                                 |        |
| label           | 标签名                                                                                       | `string`                        | -      |
| labelHidden     | 是否隐藏标签                                                                                 | `boolean`                       | false  |
| labelTooltip    | 表单项提示                                                                                   | `string` / `boolean`            | false  |
| labelWidth      | 标签宽度                                                                                     | `string`                        | -      |
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
| valueFormat     | type 为 日期类控件 选填，格式与 element-ui 一致，增加 `unix` 10 位时间戳格式                 | `string`                        | -      |
| options         | 控件选项，type 为 check/radio/select 必填，详情可参考 [options 设置](#options-设置)          | `object` / `array` / `Promise`  | []     |
| remote          | 支持接口搜索，type 为 select 有效                                                            | `boolean`                       | false  |
| notAll          | 不显示全选，type 为 check 有效                                                               | `boolean`                       | false  |
| 表单相关设置    |                                                                                              |                                 |        |
| col             | 占用栅格                                                                                     | `number`                        | 24     |
| required        | 是否必填                                                                                     | `boolean`                       | false  |
| bindShow        | 绑定显示                                                                                     | `(model)=>boolean`              | -      |
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
| component     | &lt;component :is=""&gt;                    | 自定义组件       |

### Method

| 方法名           | 描述                     | 参数                                                 |
| :--------------- | :----------------------- | :--------------------------------------------------- |
| reset()          | 重置表单                 | -                                                    |
| refreshOptions() | 刷新选项                 | `(fieldName: string)=>void`                          |
| validate()       | 对整个表单进行校验的方法 | `Promise<void> | (valid:boolean)=>void`              |
| validateField()  | 对整个表单进行校验的方法 | `(prop:string,callback:(errMsg:string)=>void)=>void` |
| getModel()       | 获取表单所有参数         |                                                      |
| setModel()       | 设置表单对应参数         | `Record<string,any>`                                 |

### Slot

| 插槽    | 描述                     |
| :------ | :----------------------- |
| -       | 按钮插槽                 |
| prepend | 表单内首部插槽           |
| append  | 表单尾部，按钮之前插槽   |

### Scope Slot

| 插槽名称   | 描述                                             |
| :--------- | :----------------------------------------------- |
| 自定义名称 | 自定义表单项的内容，参数为 { item, model, name } |

### Event

| 事件名称     | 说明                                | 回调参数 |
| :----------- | :---------------------------------- | :------- |
| [event:name] | 可直接追加 &lt;el-form&gt; 所有事件 | -        |
