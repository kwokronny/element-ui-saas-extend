<template>
  <el-table-page layout-type="card" ref="TablePage" :columns="columns" :request="getList" border></el-table-page>
</template>
<script>
export default {
  filters: {
    sensitive(value, format) {
      switch (format) {
        case "normal":
          return value.replace(/^(.{2})(?:[\w\W]+)(.{3})$/, "$1****$2");
        case "phone":
          return value.replace(/^(.{3})(?:\w+)(.{4})$/, "$1****$2");
        case "email":
          return value.replace(/^(.{3})(?:[\W\w]+)(.{5})$/, "$1**@**$2");
      }
    },
  },
  data() {
    return {
      columns: [
        {
          label: "日期时间",
          prop: "datetime",
          filters: "datetime",
        },
        {
          label: "日期格式化",
          prop: "dateformat",
          filters: [["dayjs", "YYYY dd"]],
        },
        {
          label: "数字格式化",
          prop: "number",
          filters: [["numeral", "0,0a"]],
        },
        {
          label: "金额格式化",
          prop: "yuan",
          filters: [["numeral", "$0,0.00"]],
        },
        {
          label: "手机脱敏",
          prop: "phone",
          filters: [["sensitive", "phone"]],
        },
        {
          label: "邮箱脱敏",
          prop: "email",
          filters: [["sensitive", "email"]],
        },
      ],
    };
  },
  methods: {
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