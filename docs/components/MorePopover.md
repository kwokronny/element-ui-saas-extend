---
pageClass: component-page
---

# 更多气泡卡片 MorePopover

主要用在对已选项的显示及表格操作项的美化。

## 基本

::: demo

```vue
<template>
  <el-more-popover>
    <el-tag v-for="name in selected" style="margin:5px">{{ name }}</el-tag>
  </el-more-popover>
  <el-more-popover :limit="5">
    <el-tag v-for="name in selected" style="margin:5px">{{ name }}</el-tag>
  </el-more-popover>
  <el-more-popover more-text="其它">
    <el-tag v-for="name in selected" style="margin:5px">{{ name }}</el-tag>
  </el-more-popover>
</template>
<script>
export default {
  data() {
    return {
      selected: [
        "尹平",
        "汪桂英",
        "武伟",
        "夏杰",
        "秦洋",
        "邱艳",
        "谭明",
        "曾艳",
        "丁明",
        "袁勇",
        "马娜",
        "沈明",
        "傅明",
        "侯静",
        "孔娜",
        "张刚",
        "谢涛",
        "武秀兰",
        "韩洋",
        "赵霞",
        "孟超",
        "顾刚",
        "万娜",
        "孟伟",
        "锺娟",
        "田洋",
        "秦秀兰",
        "张强",
        "朱伟",
        "任静",
        "史强",
        "陈杰",
        "傅明",
        "黄霞",
        "沈秀英",
        "曾涛",
        "傅明",
        "宋娜",
        "邓军",
        "马霞",
        "许艳",
        "阎刚",
        "田丽",
        "石娟",
        "汪秀兰",
        "史刚",
        "曾静",
        "任杰",
        "石明",
        "易娟",
      ],
    };
  },
};
</script>
```

:::

## 自定义

::: demo

```vue
<style>
.table-option a {
  margin: 0 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 12px;
}
.table-button-popover {
  width: 60px;
  padding: 5px 0;
}
.table-button-popover a {
  display: block;
  box-sizing: border-box;
  padding: 0px 10px;
  line-height: 30px;
  cursor: pointer;
  width: 100%;
}
.table-button-popover a:hover {
  background: #f2f2f2;
}
</style>
<template>
  <el-more-popover>
    <el-tag v-for="name in selected" style="margin:5px">{{ name }}</el-tag>
    <el-tag slot="more" type="info" style="margin:5px">更多</el-tag>
  </el-more-popover>
  <br />
  <el-more-popover class="table-option" :limit="2" popover-class="table-button-popover">
    <a>新增</a>
    <a>编辑</a>
    <a>禁用</a>
    <a>删除</a>
    <a slot="more">更多</a>
  </el-more-popover>
</template>
<script>
export default {
  data() {
    return {
      selected: [
        "尹平",
        "汪桂英",
        "武伟",
        "夏杰",
        "秦洋",
        "邱艳",
        "谭明",
        "曾艳",
        "丁明",
        "袁勇",
        "马娜",
        "沈明",
        "傅明",
        "侯静",
        "孔娜",
        "张刚",
        "谢涛",
        "武秀兰",
        "韩洋",
        "赵霞",
        "孟超",
        "顾刚",
        "万娜",
        "孟伟",
        "锺娟",
        "田洋",
        "秦秀兰",
        "张强",
        "朱伟",
        "任静",
        "史强",
        "陈杰",
        "傅明",
        "黄霞",
        "沈秀英",
        "曾涛",
        "傅明",
        "宋娜",
        "邓军",
        "马霞",
        "许艳",
        "阎刚",
        "田丽",
        "石娟",
        "汪秀兰",
        "史刚",
        "曾静",
        "任杰",
        "石明",
        "易娟",
      ],
    };
  },
};
</script>
```

:::

## 属性

### Props

| 参数          | 描述         | 类型     | 可选值 | 默认值 |
| :------------ | :----------- | :------- | :----- | ------ |
| limit         | 其余的按钮   | `number` | -      | 3      |
| more-text     | 更多按钮文案 | `string` | -      | 更多   |
| popover-class | 更多按钮文案 | `string` | -      | -      |

### Slot

| 插槽 | 描述           |
| :--- | :------------- |
| more | 更多按钮自定义 |
