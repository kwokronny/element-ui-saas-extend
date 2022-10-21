---
pageClass: component-page
---

# 表单 FormAuto

解决表单交互中开发重复性高、配置复杂等问题。

## 基础表单

::: demo

<<< @/docs/example/FormAuto/Basic.vue 

:::

## 对组件增加的预设
1. 所有日期时间相关组件 `valueFormat` 增加 `unix` 10 位时间戳转化功能，并对 `valueFormat` 增加默认值。
  > 原因是我也不知道为什么 JS 要多出 3 位毫秒，而后端时间格式可以如此多的想法。😭 
2. `daterange|timerange|datetimerange|numberrange|slider`对应组件增加 rangeName 属性，方便快速迭代到对应接口传参内。
3. `slider`对应组件增加 range 属性时，默认值为组件的 `[min, max]`。
4. `select`组件远程搜索 `remote: true` 时 清空 或 搜索结果为空，再次点击下拉选框将重置筛选并重新请求。


::: demo

<<< @/docs/example/FormAuto/Small.vue 

:::  

## 绑定显隐

表单项增加 `bindShow` 属性，解决复杂表单交互

::: demo

<<< @/docs/example/FormAuto/BindShow.vue

:::

## options 设置

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

1. `options` 标准规范值是 `[{label: "苹果", value: "apple", icon:"el-icon-apple", disabled: false }, ...]` <br/>
2. `options` 值为 `["苹果", ...]` 文本数组时，`label` 与 `value` 皆为 "苹果"<br/>
3. `options` 值为 `{apple: "苹果", banana: "香蕉", ...}` 对象时，`label` 为值 `苹果`， `value` 为对应键值 `apple`<br/>
4. `options` 值为 `async () => Promise<ElAutoOption>` 的 Promise 函数时，返回值按 1~3 条规则匹配。
5. `type: "select"` 下 `options` 值为 `(query?,page?) => Promise<ElAutoOption>` 的 Promise 函数时，返回值同样按 1~3 条规则匹配。 `remote: true` 时 query 值提供搜索关键字， `loadScroll:true` 时 page 值提供加载页码
6. `type: "cascader"` 级联选择框只支持应用标准规范值。

::: demo

<<< @/docs/example/FormAuto/Options.vue

:::

## 远程选择框的回显

> type 为 select 并且 开启远程搜索的功能时，需要提供回显能力。

::: demo

<<< @/docs/example/FormAuto/EchoOptions.vue

:::

## 自定义动态插槽

支持对表单项自定义动态插槽，通过设置 slot 属性，可设置`boolean`、`string`类型，设置为 true 时，slot 名为属性的字段名，slot 为字符串类型时，多个字段可复用一个插槽，插槽携带参数如下：

- `item` 字段属性
- `model` 表单 model
- `name` 字段名

:::demo

<<< @/docs/example/FormAuto/Slot.vue

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

| 参数            | 描述                                                                                         | 类型                            | 默认值        |
| :-------------- | :------------------------------------------------------------------------------------------- | :------------------------------ | :------------ |
| 标签相关设置    |                                                                                              |                                 |               |
| label           | 标签名                                                                                       | `string`                        | -             |
| labelHidden     | 是否隐藏标签                                                                                 | `boolean`                       | false         |
| labelTooltip    | 表单项提示                                                                                   | `string` / `boolean`            | false         |
| labelWidth      | 标签宽度                                                                                     | `string`                        | -             |
| value           | 字段默认值                                                                                   | `any`                           | -             |
| 控件相关设置    |                                                                                              |                                 |               |
| type            | 必填，控件类型                                                                               | [参照 type Enum 表](#type-enum) | -             |
| notSubmit       | 绑定值不返回该字段                                                                           | `boolean`                       | false         |
| slot            | 自定义动态插槽，设为 true 时，slot 为 name，详情可参考 [自定义动态插槽示例](#自定义动态插槽) | `string` / `boolean`            | false         |
| component       | 组件名称，type 为 `component` 时有效                                                         | `string`                        | -             |
| `[prop:string]` | 可直接追加 type 对应组件的 prop                                                              | `any`                           | -             |
| disabled        | 是否禁用字段                                                                                 | `boolean`                       | false         |
| placeholder     | 占位符                                                                                       | `array`                         | -             |
| on              | 设置 type 对应组件的事件                                                                     | `object`                        | {}            |
| rangeName       | 日期范围名 type 为 daterange/timerange/datetimerange/numberrange/slider 选填                 | `array<string>`                 | false         |
| suffixTime      | type 为 daterange 选填，为日期范围增加 00:00:00 - 23:59:59                                   | `boolean`                       | false         |
| valueFormat     | type 为 日期类控件 选填，格式与 element-ui 一致，增加 `unix` 10 位时间戳格式                 | `string`                        | -             |
| options         | type 为 check/radio/select 必填，详情可参考 [options 设置](#options-设置)                    | `object` / `array` / `Promise`  | []            |
| all-option      | type 为 select 有效，为选项框增加 全部 option                                                | `boolean`                       | 继承组件 prop |
| remote          | 支持接口搜索，type 为 select 有效                                                            | `boolean`                       | false         |
| notAll          | 不显示全选，type 为 check 有效                                                               | `boolean`                       | false         |
| 表单相关设置    |                                                                                              |                                 |               |
| col             | 占用栅格                                                                                     | `number`                        | 24            |
| required        | 是否必填                                                                                     | `boolean`                       | false         |
| bindShow        | 绑定显示                                                                                     | `(model)=>boolean`              | -             |
| addRules        | 追加验证规则                                                                                 | `array`                         | -             |

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
| component     | &lt;component :is="item.component"&gt;      | 自定义组件       |

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
