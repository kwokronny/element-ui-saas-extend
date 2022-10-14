<template>
  <el-table-page ref="TablePage" :columns="columns" :request="getList" border :selection.sync="selection" row-key="id" :selectable="(row) => row.id != 3">
    <el-button size="small" @click="showSelection" slot="selection_right">显示已选项</el-button>
  </el-table-page>
</template>
<script>
export default {
  data() {
    return {
      selection: [],
      columns: [
        {
          label: "姓名",
          prop: "name",
          fixed: "left",
        },
        {
          label: "邮箱",
          prop: "email",
        },
        {
          label: "积分",
          prop: "score",
          filters: [["numeral", "0,0.00"]],
        },
        {
          label: "注册日期",
          prop: "date",
          filters: [["dayjs", "MM-DD dd"]],
          showOverflowTooltip: true,
        },
        {
          label: "状态",
          prop: "status",
          enumTag: "el-tag",
          enum: [
            { label: "正常", value: "1", type: "primary" },
            { label: "失效", value: "2", type: "warning" },
          ],
        },
      ],
    };
  },
  methods: {
    showSelection() {
      this.$msgbox({
        title: "Selection value:",
        dangerouslyUseHTMLString: true,
        message: `<pre>${JSON.stringify(this.selection, undefined, 3)}</pre>`,
      });
    },
    getList(page = 1, search, pageSize) {
      return axios.get("/element-ui-saas-extend/json/page.json").then(function(ret) {
        let baseId = (page - 1) * pageSize;
        return {
          page,
          total: 100,
          pageSize,
          record: ret.data.data.slice(baseId, baseId + pageSize),
        };
      });
    },
  },
};
</script>