---
pageClass: component-page
---

# 复制指令 v-copy

用于信息复制

> 需要引入 `clipboard.js`
```html
<script src="//unpkg.com/clipboard"></script>
```

## 基础用法
::: demo

```vue
<template>
  <el-button v-copy="link" icon="el-icon-copy-document">复制</el-button>
</template>
<script>
export default {
  data() {
    return {
      link: "https://kwokronny.gitee.io/element-ui-saas-extend",
    };
  },
};
</script>
```

:::


## 自定义
::: demo

```vue
<template>
  <el-button v-copy="'https://kwokronny.gitee.io/element-ui-saas-extend'" element-copy-success-text="借鉴成功" element-copy-tooltip-theme="light">复制</el-button>
</template>
<script>
export default {
  data() {
    return {
      text: "",
    };
  },
};
</script>
```

:::
