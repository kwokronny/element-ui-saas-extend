---
pageClass: component-page
---

# FormAuto

Settle development content repetitive and complicated in form interaction.

## Inline Form

Inline form is be usually used search interaction form.

::: demo

```vue
<template>
  <el-form-auto :data="form" :show-message="false" ref="FilterForm" v-model="model" label-width="70px" inline>
    <el-button type="primary" round @click="getList">Search</el-button>
  </el-form-auto>
</template>
<script>
export default {
  data() {
    return {
      form: {
        account: {
          label: "account",
          type: "text",
        },
        dateRange: {
          label: "date",
          type: "daterange",
          rangeName: ["startDate", "endDate"],
        },
        numberrange: {
          label: "amount",
          type: "numberrange",
          rangeName: ["min", "max"],
        },
        status: {
          label: "status",
          type: "select",
          options: [
            {
              label: "option1",
              value: 2,
            },
            {
              label: "option2",
              value: 5,
              icon: "el-icon-help",
            },
            {
              label: "option3",
              value: 6,
              disabled: true,
            },
            "option4",
          ],
        },
      },
      model: {},
    };
  },
  methods: {
    getList() {
      this.$msgbox({
        title: "form model",
        dangerouslyUseHTMLString: true,
        message: `<pre>${JSON.stringify(this.model, undefined, 3)}</pre>`,
      });
    },
  },
};
</script>
```

:::

## Basic Form

Basic form is be usually used edit interaction form, use `<el-row>` component setting form layout.

::: demo

```vue
<template>
  <el-button type="primary" round @click="changeRule">Change rule</el-button>
  <el-button type="primary" round @click="setModel">Edit</el-button>
  <el-form-auto :data="form" ref="EditForm" v-model="model" label-width="120px">
    <template>
      <el-button type="primary" round @click="getValidModel">Valid Submit</el-button>
      <el-button type="primary" round @click="getModel">Submit</el-button>
      <el-button type="primary" round @click="reset">Reset</el-button>
    </template>
  </el-form-auto>
</template>
<script>
let defaultOption = [
  {
    label: "option1",
    value: 0,
  },
  {
    label: "option2",
    icon: "el-icon-help",
    value: 3,
  },
  {
    label: "option3",
    value: 2,
    disabled: true,
  },
  "option4",
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
          label: "switch",
          type: "switch",
          required: true,
        },
        slider: {
          col: 8,
          label: "slider",
          type: "slider",
          value: 10,
          required: true,
        },
        text: {
          col: 12,
          label: "text",
          labelTooltip: "label tooltip",
          type: "text",
          required: true,
        },
        password: {
          col: 12,
          label: "password",
          type: "password",
          required: true,
          addRules: [
            {
              pattern: /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/,
              message: "please input 8~16 text, contain word and number.",
            },
          ],
        },
        cascader: {
          col: 12,
          label: "cascader",
          type: "cascader",
          required: true,
          options: [
            {
              label: "node1",
              value: 1,
              children: [
                {
                  label: "node4",
                  value: 4,
                  children: [{ label: "node5", value: 5 }],
                },
              ],
            },
            {
              label: "node2",
              value: 2,
              children: [{ label: "node6", value: 6 }],
            },
            { label: "node3", value: 3 },
          ],
          style: "width:100%",
        },
        select: {
          col: 12,
          label: "select",
          type: "select",
          required: true,
          style: "width:100%",
          options: defaultOption,
        },
        week: {
          col: 12,
          label: "week",
          type: "week",
          required: true,
          style: "width:100%",
        },
        datetime: {
          col: 12,
          label: "datetime",
          type: "datetime",
          required: true,
          style: "width:100%",
        },
        time: {
          col: 12,
          label: "time",
          type: "time",
          required: true,
          style: "width:100%",
        },
        timeRange: {
          col: 12,
          label: "time range",
          type: "timerange",
          rangeName: ["startTime", "endTime"],
          required: true,
          style: "width:100%",
        },
        dateRange: {
          col: 12,
          label: "date range",
          type: "daterange",
          rangeName: ["startDate", "endDate"],
          required: true,
          style: "width:100%",
        },
        datetimeRange: {
          label: "datetime range",
          labelWidth: "150px",
          type: "datetimerange",
          rangeName: ["startDT", "endDT"],
          required: true,
          style: "width:500px",
        },
        radio: {
          label: "radio",
          type: "radio",
          required: true,
          options: defaultOption,
        },
        radiobutton: {
          label: "radio2",
          type: "radiobutton",
          options: defaultOption,
          size: "small",
          required: true,
        },
        check: {
          label: "check",
          type: "check",
          required: true,
          options: defaultOption,
        },
        rate: {
          label: "rate",
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
        id: "123",
        text: "text",
        password: "GiBYRiKmY7fZ5",
        week: "2021-01-10",
        datetime: "2021-01-10 11:11:00",
        dateRange: ["2021-01-10", "2021-01-13"],
        datetimeRange: ["2021-01-10 11:11:00", "2021-01-12 13:11:00"],
        time: "11:11:00",
        timeRange: ["11:11:00", "23:12:00"],
        select: 0,
        check: [3],
        radiobutton: 0,
        radio: 3,
        cascader: [2, 6],
        rate: 5,
      };
    },
    getModel() {
      this.$msgbox({
        title: "form model",
        dangerouslyUseHTMLString: true,
        message: `<pre>${JSON.stringify(this.model, undefined, 3)}</pre>`,
      });
    },
    getValidModel() {
      this.$refs["EditForm"].validate().then((valid) => {
        if (valid) {
          this.$msgbox({
            title: "valid success!",
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

## Binding display

can add `bindShow` attribute settle complicated form demand

::: demo

```vue
<template>
  <el-form-auto :data="form" v-model="model" label-width="150px">
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
          label: "subject",
          type: "radio",
          required: true,
          options: { person: "person", company: "company" },
          value: "person",
        },
        name: {
          label: "name",
          type: "text",
          required: true,
        },
        person_number: {
          label: "ID Card",
          type: "text",
          required: true,
          bindShow: (model) => {
            return model.subject == "person";
          },
        },
        company_number: {
          label: "company number",
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

## Setting options

1. `options` standard value is `[{label: "Apple", value: 1, icon:"el-icon-apple", disabled:false }, ...]`
2. `label` and `value` is "apple" when `options` value is `["apple", ...]`.
3. `label` is options item value and `value` is options item key, when `options` is `{0: "apple", 2: "banana", ...}`
4. when `options` value is promise function, will async request options data before form is generated .e.g `async (query?)=>{ return await $axios.get("options") }`, parameter `query` valid when attribute `remote` is true;
5. options only supported standard format when `type: "cascader"`

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
  <el-form-auto :data="form" ref="EditForm" v-model="model" label-width="160px">
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
          label: "select",
          type: "select",
          style: "width:100%",
          options: () => {
            return this.$axios.get("http://yapi.smart-xwork.cn/mock/90460/options").then((res) => {
              return res.data;
            });
          },
        },
        remote: {
          col: 12,
          label: "remote select",
          type: "select",
          style: "width:100%",
          multiple: true,
          required: true,
          remote: true,
          options: (query) => {
            return this.$axios.get("http://yapi.smart-xwork.cn/mock/90460/options?q=" + query).then((res) => {
              return res.data;
            });
          },
        },
        cascader: {
          col: 12,
          label: "cascader",
          type: "cascader",
          options: [
            {
              label: "node1",
              value: 1,
              children: [
                {
                  label: "node4",
                  value: 4,
                  children: [{ label: "node5", value: 5 }],
                },
              ],
            },
            {
              label: "node2",
              value: 2,
              children: [{ label: "node6", value: 6 }],
            },
            { label: "node3", value: 3 },
          ],
          style: "width:100%",
        },
        remoteCascader: {
          col: 12,
          label: "cascader",
          type: "cascader",
          options: () => {
            return this.$axios.get("http://yapi.smart-xwork.cn/mock/90460/cascader").then((res) => {
              return res.data;
            });
          },
          style: "width:100%",
        },
        radio: {
          col: 12,
          label: "radio",
          type: "radio",
          notAll: true,
          options: ["option1", "option2", "option3"],
        },
        check: {
          label: "check",
          type: "check",
          options: [
            "check1",
            "check2",
            {
              label: "check3",
              value: 3,
              icon: "el-icon-help",
            },
          ],
        },
      },
    };
  },
  methods: {
    editOptionReshow() {
      this.model.asyncSelect = { label: "test", value: "123" };
      this.model.remote = [
        { label: "test", value: "123" },
        { label: "test2", value: "1233" },
      ];
    },
    reset() {
      this.$refs["EditForm"].reset();
      this.model.asyncSelect = { label: "test", value: "123" };
      this.model.remote = [
        { label: "test2", value: "123" },
        { label: "test3", value: "1233" },
      ];
    },
  },
  mounted() {
    this.model.asyncSelect = { label: "test", value: "123" };
    this.model.remote = [
      { label: "test", value: "123" },
      { label: "test2", value: "1233" },
    ];
  },
};
</script>
```

:::

## Customize dynamic slot

setting attribute slot, customize dynamic slot, many field can common slot.

:::demo

```vue
<template>
  <el-form-auto :data="form" v-model="model" label-width="90px">
    <template slot-scope="{ field, model, name }" slot="upload">
      <el-upload action="https://yapi.baidu.com/mock/13114/upload" v-model="model[name]" :on-success="uploadSuccess">
        <el-button round type="primary" icon="el-icon-upload">Upload</el-button>
      </el-upload>
    </template>
    <template slot-scope="{ field, model, name }" slot="color">
      <el-color-picker v-model="model[name]"></el-color-picker>
    </template>
    <div>form model: {{ model }}</div>
  </el-form-auto>
</template>
<script>
export default {
  data() {
    return {
      form: {
        user: {
          col: 12,
          label: "user",
          labelTooltip: "can use custom component",
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
          label: "ID",
          type: "plain",
          value: "-",
        },
        name: {
          col: 12,
          label: "name",
          type: "plain",
          value: "-",
        },
        phone: {
          col: 12,
          label: "phone",
          type: "plain",
          value: "-",
        },
        email: {
          col: 12,
          label: "mail",
          type: "plain",
          value: "-",
        },
        color1: {
          col: 12,
          label: "color1",
          type: "text",
          slot: "color",
        },
        color2: {
          col: 12,
          label: "color2",
          type: "text",
          slot: "color",
        },
        upload: {
          label: "upload",
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

## Attribute

### Props

| Attribute       | Description                  | Type                                                      | Accepted values | Default |
| :-------------- | :--------------------------- | :-------------------------------------------------------- | :-------------- | ------- |
| v-model         | binding values               | `object`                                                  | -               | {}      |
| data            | form field config            | [`Record<string,FormAutoField>`](#formautofield) | -               | {}      |
| gutter          | `<el-row>` attribute gutter  | `number`                                                  | -               | 15      |
| label-hidden    | whether to hidden all label  | `boolean`                                                 | -               | false   |
| `[prop:string]` | inherit `<el-form>` all prop | `any`                                                     | -               | -       |

### FormAutoField

| Attribute       | Description                                                                                                   | Type                           | Default |
| :-------------- | :------------------------------------------------------------------------------------------------------------ | :----------------------------- | :------ |
|                 | label setting collect                                                                                         |                                |         |
| label           | FormItem label.                                                                                               | `string`                       | -       |
| labelHidden     | whether to hidden label.                                                                                      | `boolean`                      | false   |
| labelTooltip    | tooltip of the label.                                                                                         | `string` / `boolean`           | false   |
| labelWidth      | width of label, e.g. '50px'. Width auto is supported.                                                         | `string`                       | -       |
|                 | field setting collect                                                                                         |                                |         |
| value           | field default value.                                                                                          | `any`                          | -       |
| type            | type of the form field component.                                                                             | [type Enum](#type-enum)        | -       |
| slot            | custom dynamic slot name, slot is name when value is true, more [example](#customize-dynamic-slot)            | `string` / `boolean`           | false   |
| `[prop:string]` | inherit type associated component prop.                                                                       | `any`                          | -       |
| disabled        | whether to disabled field input or picker.                                                                    | `boolean`                      | false   |
| placeholder     | placeholder in field component.                                                                               | `array`                        | -       |
| on              | setting type associated component event                                                                       | `object`                       | {}      |
| rangeName       | split range values to many field, type contain 'range' optional                                               | `array<string>`                | false   |
| suffixTime      | append 00:00:00 - 23:59:59 for daterange, type is daterange optional                                          | `boolean`                      | false   |
| options         | type associated component options，when type is check/radio/select required, more [example](#setting-options) | `object` / `array` / `Promise` | []      |
| remote          | request interface supported when type is select and options is promise function                               | `boolean`                      | false   |
| notAll          | whether display check all, when type is check                                                                 | `boolean`                      | false   |
|                 | form setting collect                                                                                          |                                |         |
| col             | occupy span                                                                                                   | `number`                       | 24      |
| required        | whether required                                                                                              | `boolean`                      | false   |
| notSubmit       | whether submit field                                                                                          | `boolean`                      | false   |
| bindShow        | whether bind                                                                                                  | `(model)=>boolean`             | -       |
| addRules        | append validate rule.                                                                                         | `array`                        | -       |

### type Enum

| Value         | Associated component                        |
| :------------ | :------------------------------------------ |
| text          | &lt;el-input type="text"&gt;                |
| password      | &lt;el-input type="password"&gt;            |
| textarea      | &lt;el-input type="textarea"&gt;            |
| number        | &lt;el-input-number&gt;                     |
| numberrange   | &lt;el-number-range&gt;                     |
| date          | &lt;el-date-picker type="date"&gt;          |
| year          | &lt;el-date-picker type="year"&gt;          |
| month         | &lt;el-date-picker type="month"&gt;         |
| week          | &lt;el-date-picker type="week"&gt;          |
| dates         | &lt;el-date-picker type="dates"&gt;         |
| datetime      | &lt;el-date-picker type="datetime"&gt;      |
| daterange     | &lt;el-date-picker type="daterange"&gt;     |
| monthrange    | &lt;el-date-picker type="date"&gt;          |
| datetimerange | &lt;el-date-picker type="datetimerange"&gt; |
| time          | &lt;el-time-picker&gt;                      |
| timerange     | &lt;el-time-picker is-range&gt;             |
| radio         | &lt;el-radio&gt;                            |
| radiobutton   | &lt;el-radio-button&gt;                     |
| check         | &lt;el-checkbox&gt;                         |
| select        | &lt;el-select&gt;                           |
| slider        | &lt;el-slider&gt;                           |
| switch        | &lt;el-switch&gt;                           |
| cascader      | &lt;el-cascader&gt;                         |
| rate          | &lt;el-rate&gt;                             |

### Methods

| Method     | Description                                           | Parameters           |
| :--------- | :---------------------------------------------------- | :------------------- |
| reset()    | reset form                                            | -                    |
| validate() | validate form                                         | `Promise<boolean>`   |
| getModel() | get form binding model                                |                      |
| setModel() | setting form field value, ignore when field not found | `Record<string,any>` |

### Slot

| slot    | Description                  |
| :------ | :--------------------------- |
| prepend | custom form header content   |
| append  | custom form footer content   |
| -       | custom form buttons content  |

### Dynamic Slot

| slot | Description                                                              |
| :--- | :----------------------------------------------------------------------- |
| -    | custom form item content, the scope parameters is { field, model, name } |

### Event

| event        | Description                | Callback |
| :----------- | :------------------------- | :------- |
| [event:name] | inherit `<el-form>` events | -        |
