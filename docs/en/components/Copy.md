---
pageClass: component-page
---

# Directives v-copy

Use `v-copy` for copy infomation

> need include `clipboard.js`
```html
<script src="//unpkg.com/clipboard"></script>
```


## Basic Usage
::: demo

```vue
<template>
  <el-button v-copy="link" icon="el-icon-copy-document">Copy</el-button>
</template>
<script>
export default {
  data() {
    return {
      link: "https://kwokronny.github.io/element-ui-saas-extend",
    };
  },
};
</script>
```

:::


## Customize
::: demo

```vue
<template>
  <el-button v-copy="'https://kwokronny.gitee.io/element-ui-saas-extend'" element-copy-success-text="Copy Success!" element-copy-tooltip-theme="light">Copy</el-button>
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
