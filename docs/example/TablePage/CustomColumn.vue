
<template>
  <el-table-page :columns="columns" custom-columns="table_test1" :request="getList"> </el-table-page>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          label: "ID",
          prop: "id",
          fixed: "left",
          width: 100,
        },
        {
          label: "姓名",
          prop: "name",
          fixed: "left",
          width: 200,
        },
        {
          label: "联系方式",
          prop: "contact",
          children: [
            {
              label: "手机",
              prop: "phone",
              width: 200,
            },
            {
              label: "邮箱",
              prop: "email",
              copy: true,
              showOverflowTooltip: true,
              width: 260,
            },
          ],
        },
        {
          label: "积分",
          prop: "score",
          width: 180,
        },
        {
          label: "余额",
          prop: "balance",
          filters: [["numeral", "0,0.00"]],
          width: 180,
        },
        {
          label: "注册日期",
          prop: "date",
          hide: true,
          filters: [["dayjs", "MM-DD dd"]],
          showOverflowTooltip: true,
          width: 200,
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
    getList(page = 1, search, pageSize) {
      return axios.get("/element-ui-saas-extend/json/page.json").then(function(ret) {
        return ret.data.data.slice(0, 10);
      });
    },
  },
};
</script>