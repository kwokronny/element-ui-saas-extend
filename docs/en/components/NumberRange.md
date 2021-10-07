---
pageClass: component-page
---

# NumberRange

Use Number Range for number range input

## Size

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

## Disabled status

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

## Limit Range

::: demo

```vue
<template>
  <el-number-range v-model="range" :min="-5" :max="100"></el-number-range>
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

## Attribute

### Props

| Attribute         | Description                     | Type       | Accepted Values | Default |
| :---------------- | :------------------------------ | :--------- | :-------------- | ------- |
| v-model/value     | binding value                   | `number[]` | -               | -       |
| disabled          | whether NumberRange is disabled | `boolean`  | -               | false   |
| min               | limit min value in range        | `number`   | -               | -       |
| max               | limit max value in range        | `number`   | -               | -       |
| start-placeholder | placeholder for the start value | `string`   | -               | -       |
| end-placeholder   | placeholder for the end value   | `string`   | -               | -       |
| range-separator   | range separator                 | `string`   | -               | -       |

### Events

| Event  | Description                                | Callback                  |
| :----- | :----------------------------------------- | :------------------------ |
| change | change triggers when user change the value | component's binding value |
| blur   | triggers when Input blurs                  | -                         |
| focus  | triggers when Input focus                  | -                         |

### Methods

| Method | Description               | Parameters |
| :----- | :------------------------ | :--------- |
| focus  | focus the Input component | -          |
