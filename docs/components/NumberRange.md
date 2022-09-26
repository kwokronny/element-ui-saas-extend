---
pageClass: component-page
---

# 数值范围输入框 NumberRange

解决在筛选过程中需要对某数值进行范围筛选，根据 Element 源码尽可能与 `<el-form>`组件 保持其一定的联动。

## 尽寸

::: demo

```vue
<template>
  <el-row>
    <el-col :span="8">
      <el-number-range size="medium" v-model="range"></el-number-range>
    </el-col>
    <el-col :span="8">
      <el-number-range size="small" v-model="range"></el-number-range>
    </el-col>
    <el-col :span="8">
      <el-number-range size="mini" v-model="range"></el-number-range>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return { range: [] };
  },
};
</script>
```

:::

## 禁用状态

::: demo

```vue
<template>
  <el-number-range v-model="range" disabled></el-number-range>
</template>
<script>
export default {
  data() {
    return { range: [10, 30] };
  },
};
</script>
```

:::

## 限制数值范围

::: demo

```vue
<template>
  <div>
    <el-number-range
      ref="range"
      v-model="range"
      :min="-5"
      :max="100"
      @clear="clear"
    ></el-number-range>
    <el-button @click="foc">focus</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return { range: [] };
  },
  methods: {
    foc() {
      this.$refs["range"].focus();
    },
  },
};
</script>
```

:::

## 属性

### Props

| 参数              | 描述                       | 类型       | 可选值 | 默认值                 |
| :---------------- | :------------------------- | :--------- | :----- | ---------------------- |
| v-model/value     | 绑定值                     | `number[]` | -      | -                      |
| disabled          | 禁用                       | `boolean`  | -      | false                  |
| min               | 范围最小值                 | `number`   | -      | -                      |
| max               | 范围最大值                 | `number`   | -      | -                      |
| clearable         | 是否可清空                 | `boolean`  | -      | true                   |
| clear-icon        | 清空图标                   | `string`   | -      | 'el-icon-circle-close' |
| start-placeholder | 范围输入时最小值的占位内容 | `string`   | -      | -                      |
| end-placeholder   | 范围输入时最大值的占位内容 | `string`   | -      | -                      |
| range-separator   | 范围输入时的分隔符         | `string`   | -      | -                      |

### Events

| 事件名称 | 说明                      | 回调参数   |
| :------- | :------------------------ | :--------- |
| change   | 用户输入的值时触发        | 组件绑定值 |
| clear    | 清空回调                  | -          |
| blur     | 当 `input` 失去焦点时触发 | -          |
| focus    | 当 `input` 获得焦点时触发 | -          |

### Methods

| 事件名称 | 说明              | 回调参数 |
| :------- | :---------------- | :------- |
| focus    | 使 input 获取焦点 | -        |
