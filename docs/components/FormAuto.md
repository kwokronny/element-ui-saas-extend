---
pageClass: component-page
---

# 表单 FormAuto

因 Vue2.0 的编写风格，编写表单页面时，时常切换于 HTML 与逻辑编写之间，且配置复杂度，重复性工作多，布局复杂。通过整合组件，梳理表单重复点，尽可能少的配置完成表单编写，同时也提供动态插槽解决特殊情况下的表单编写，话不多话，我们看示例

## 基础内联表单

支持多种常用输入控件、选项类控件提供多种赋值方式及表单项设置占用栅格数

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
        dateRange: {
          label: "日期范围",
          type: "daterange",
          rangeName: ["startDate", "endDate"],
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

非内联模式下，应用了 `<el-row>` 可对表单项进行布局，仅需为表单项配置 col 值
::: tip
表单项默认为 `required:true` 的表单项添加必填规则，可通过 addRule 增加更丰富的规则，同时推荐 VS Code 的插件 [any-rule](https://marketplace.visualstudio.com/items?itemName=russell.any-rule) ，方便快速完成正则验证。
:::

::: demo

```vue
<template>
  <el-form-auto :data="form" ref="EditForm" v-model="model" label-width="120px">
    <template>
      <el-button type="primary" round @click="changeRule">改变规则</el-button>
      <el-button type="primary" round @click="setModel">编辑</el-button>
      <el-button type="primary" round @click="getValidModel">验证成功后获取数据</el-button>
      <el-button type="primary" round @click="getModel">获取数据</el-button>
      <el-button type="primary" round @click="reset">重置</el-button>
    </template>
  </el-form-auto>
</template>
<script>
let defaultOption = [
  {
    label: "选项1",
    value: 1,
  },
  {
    label: "带图标选项3",
    icon: "el-icon-help",
    value: 4,
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
          numberType: true,
        },
        switch: {
          col: 4,
          label: "开关",
          type: "switch",
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
        check: {
          label: "复选框",
          type: "check",
          required: true,
          options: defaultOption,
        },
        rate: {
          label: "评分",
          type: "rate",
          required: true,
        },
      },
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
    setModel() {
      this.model = {
        text: "文本框",
        password: "password123456",
        date: "2021-01-10",
        datetime: "2021-01-10 11:11:00",
        dateRange: ["2021-01-10", "2021-01-13"],
        datetimeRange: ["2021-01-10 11:11:00", "2021-01-12 13:11:00"],
        time: "11:11:00",
        timeRange: ["11:11:00", "23:12:00"],
        select: "1",
        check: ["3"],
        radio: "3",
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
    getValidModel() {
      this.$refs["EditForm"].validate().then((valid) => {
        if (valid) {
          this.$msgbox({
            title: "表单返回数据",
            dangerouslyUseHTMLString: true,
            message: `<pre>${JSON.stringify(this.model, undefined, 3)}</pre>`,
          });
        }
      });
    },
  },
};
</script>
```

:::

## 绑定显隐

::: tip
为完成如根据不同选项而需要增加填写项的复杂表单需求，为表单项增加 `bindShow` 属性，自由绑定显示
:::

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

options 单独编写示例是为说明 options 在选项表单中有相对的复杂性，需要适应不同的使用情况。<br/>

主要围绕 `label [显示标签]`, `value [值]` 的取值：<br/>

1. `options` 值为 `["苹果", ...]` 文本数组时，`label` 与 `value` 皆为 "苹果"<br/>
2. `options` 值为 `[{label: "苹果", value: "apple", icon:"el-icon-apple" }, ...]` 规范对象数组时，`label` 与 `value` 如规范对象指定一致<br/>
3. `options` 值为 `{apple: "苹果", banana: "香蕉", ...}` 对象时，`label` 为值 `苹果`， `value` 为对你的键值 `apple`<br/>
4. `options` 值为 `(query)=>{ return options }` 函数时，query 参数是当表单项 `remote: true` 时应用于远程搜索的，否则无视 query 参数，会在表单生成前或搜索时执行此函数，返回 `options` 的 `label`与`value`关系支持上面 3 项 格式<br/>
5. `options` 值为 `async (query)=>{ return await $axios.get("options") }` 函数时，基本与第 4 项一致，仅是支持 Promise 返回 <br/>

::: demo

```vue
<template>
  <el-form-auto :data="form" ref="EditForm" v-model="model" label-width="70px">
    <div>{{ model }}</div>
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
          options: () => {
            return this.$axios.get("https://yapi.baidu.com/mock/13114/options").then((res) => {
              return res.data;
            });
          },
        },
        remote: {
          col: 12,
          label: "远程搜索",
          type: "select",
          style: "width:100%",
          remote: true,
          options: (query) => {
            return this.$axios.get("https://yapi.baidu.com/mock/13114/options?q=" + query).then((res) => {
              return res.data;
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
      },
    };
  },
};
</script>
```

:::

## 自定义动态插槽

支持对表单项自定义动态插槽，通过设置 slot 属性，可设置`boolean`、`string`类型，设置为 true 时，slot 名为属性的字段名，slot 为字符串类型时，多个字段可复用一个插槽，插槽携带参数如下：

- `field` 字段属性
- `model` 表单 model
- `name` 字段名

:::demo

```vue
<template>
  <el-form-auto :data="form" v-model="model" label-width="90px">
    <template slot-scope="{ field, model, name }" slot="upload">
      <el-upload action="https://yapi.baidu.com/mock/13114/upload" v-model="model[name]" :on-success="uploadSuccess">
        <el-button round type="primary" icon="el-icon-upload">上传文件</el-button>
      </el-upload>
    </template>
    <template slot-scope="{ field, model, name }" slot="color">
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
          type: "plain",
        },
        name: {
          col: 12,
          label: "姓名",
          type: "plain",
        },
        phone: {
          col: 12,
          label: "手机",
          type: "plain",
        },
        email: {
          col: 12,
          label: "邮箱",
          type: "plain",
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

| 参数            | 描述                       | 类型                                                            | 可选值 | 默认值 |
| :-------------- | :------------------------- | :-------------------------------------------------------------- | :----- | ------ |
| v-model         | 表单数据对象               | `object`                                                        | -      | {}     |
| data            | 表单项配置                 | [Record&lt;name:string,FormAutoField&gt;](#prop-data-attribute) | -      | {}     |
| gutter          | &lt;el-row&gt; 属性 gutter | `number`                                                        | -      | 15     |
| label-hidden    | 所有表单项标签是否隐藏     | `boolean`                                                       | -      | false  |
| `[prop:string]` | 继承 el-form 所有 Prop     | `any`                                                           | -      | -      |

### FormAutoField

| 参数            | 描述                                                                                         | 类型                                    | 默认值 |
| :-------------- | :------------------------------------------------------------------------------------------- | :-------------------------------------- | :----- |
| 标签相关设置    |                                                                                              |                                         |        |
| label           | 标签名                                                                                       | `string`                                | -      |
| labelHidden     | 是否隐藏标签                                                                                 | `boolean`                               | false  |
| labelTooltip    | 表单项提示                                                                                   | `string` / `boolean`                    | false  |
| labelWidth      | 标签宽度                                                                                     | `string`                                | -      |
| value           | 字段默认值                                                                                   | `any`                                   | -      |
| 控件相关设置    |                                                                                              |                                         |        |
| type            | 必填，控件类型                                                                               | [参照 type Enum 表](#type-enum)         | -      |
| slot            | 自定义动态插槽，设为 true 时，slot 为 name，详情可参考 [自定义动态插槽示例](#自定义动态插槽) | `string` / `boolean`                    | false  |
| component       | 组件名称，type 为 `component` 时有效                                                         | `string`                                | -      |
| `[prop:string]` | 可直接追加 type 对应组件的 prop                                                              | `any`                                   | -      |
| disabled        | 是否禁用字段                                                                                 | `boolean`                               | false  |
| placeholder     | 占位符                                                                                       | `array`                                 | -      |
| on              | 设置 type 对应组件的事件                                                                     | `object`                                | {}     |
| rangeName       | 日期范围名 type 为 daterange/timerange/datetimerange/numberrange 选填                        | `array<string>`                         | false  |
| options         | 控件选项，type 为 check/radio/select 必填                                                    | `object` / `array` / `Function`         | []     |
| remote          | 支持接口搜索，type 为 select 有效                                                            | `boolean`                               | false  |
| notAll          | 不显示全选，type 为 check 有效                                                               | `boolean`                               | false  |
| 表单相关设置    |                                                                                              |                                         |        |
| col             | 占用栅格                                                                                     | `number`                                | 24     |
| required        | 是否必填                                                                                     | `boolean`                               | false  |
| notSubmit       | 是否                                                                                         | `boolean`                               | false  |
| bindShow        | 绑定显示                                                                                     | `(model)=>boolean`                      | -      |
| addRules        | 追加验证规则                                                                                 | `array`                                 | -      |

### type Enum

| 值            | 对应组件                                      | 描述             |
| :------------ | :-------------------------------------------- | :--------------- |
| text          | &lt;el-input&gt;                              | 文本输入框       |
| number        | &lt;el-input-number&gt;                       | 计数器           |
| numberrange   | &lt;el-number-range&gt;                       | 数值范围         |
| password      | &lt;el-input&gt;                              | 密码输入框       |
| textarea      | &lt;el-input&gt;                              | 文本域           |
| date          | &lt;el-date-picker type="date"&gt;            | 日期选择         |
| year          | &lt;el-date-picker type="year"&gt;            | 日期选择         |
| month         | &lt;el-date-picker type="month"&gt;            | 日期选择         |
| week          | &lt;el-date-picker type="week"&gt;            | 日期选择         |
| dates         | &lt;el-date-picker type="dates"&gt;            | 日期选择         |
| datetime      | &lt;el-date-picker type="datetime"&gt;        | 日期时间选择     |
| daterange     | &lt;el-date-picker type="daterange"&gt;       | 日期范围选择     |
| monthrange    | &lt;el-date-picker type="date"&gt;            | 日期选择         |
| datetimerange | &lt;el-date-picker type="datetimerange"&gt; | 日期时间范围选择 |
| time          | &lt;el-time-picker&gt;                        | 时间选择         |
| timerange     | &lt;el-time-picker is-range&gt;               | 时间范围选择     |
| radio         | &lt;el-radio&gt;                              | 单选框           |
| check         | &lt;el-checkbox&gt;                           | 复选框           |
| select        | &lt;el-select&gt;                             | 选择框           |
| slider        | &lt;el-slider&gt;                             | 滑动选择框       |
| switch        | &lt;el-switch&gt;                             | 开关             |
| cascader      | &lt;el-cascader&gt;                           | 多级选择框       |
| rate          | &lt;el-rate&gt;                               | 评分             |

### Method

| 方法名     | 描述                                     | 参数               |
| :--------- | :--------------------------------------- | :----------------- |
| reset()    | 重置表单                                 | -                  |
| validate() | 对整个表单进行校验的方法                 | `Promise<boolean>` |
| getModel() | 获取表单所有参数                         | name               |
| setModel() | 设置表单对应参数，表单项不存在的将被无视 | name,value         |

### Slot

| 插槽    | 描述                     |
| :------ | :----------------------- |
| prepend | 表单内首部插槽           |
| append  | 表单尾部，按钮之前插槽   |
| buttons | 按钮插槽                 |

### Scope Slot

| 插槽名称   | 描述                                              |
| :--------- | :------------------------------------------------ |
| 自定义名称 | 自定义表单项的内容，参数为 { field, model, name } |

### Event

| 事件名称     | 说明                                | 回调参数 |
| :----------- | :---------------------------------- | :------- |
| [event:name] | 可直接追加 &lt;el-form&gt; 所有事件 | -        |
