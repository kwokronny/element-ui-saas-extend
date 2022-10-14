<template>
  <el-table-page ref="TablePage" :columns="columns" :request="getList" row-key="id" :selection.sync="selection" custom-columns="table_test2">
    <template slot="expand" slot-scope="{ row, index }">
      <el-alert title="扩展插槽" type="success" :closable="false">第 {{index}} 行</el-alert>
    </template>
    <template slot="option" slot-scope="{ row, column, index }">
      <el-button type="primary" round size="mini">编辑</el-button>
      <el-button type="danger" round size="mini">删除</el-button>
    </template>
    <template slot="search-name" slot-scope="{ item, model, name }">
      <el-input suffix-icon="el-icon-help" v-model="model[name]"></el-input>
    </template>
    <template slot="search_prepend">
      <el-alert title="搜索上方插槽" type="success" :closable="false"></el-alert>
    </template>
    <template slot="search_button">
      <el-button @click="search">搜索</el-button>
      <el-button @click="reset">重置</el-button>
    </template>
    <template slot="search_button_append">
      <el-button>增加按钮</el-button>
    </template>
    <template slot="search_append">
      <el-alert title="搜索下方插槽" type="success" :closable="false"></el-alert>
    </template>
    <template slot="middle">
      <el-alert title="搜索框与表格框中间插槽" type="success" :closable="false"></el-alert>
    </template>
    <template slot="selection">
      <el-tooltip>
        <div slot="content">
          <div v-if="selection.length > 0">
            <p v-for="item in selection" :key="`selection_test_${item.id}`">{{ item.name }} {{ item.phone }}</p>
          </div>
          <div v-else>
            请先选择行
          </div>
        </div>
        <el-button type="text">已选中</el-button>
      </el-tooltip>
      {{ selection.length }} 条
      <el-button type="text" @click="clearSelection">清空</el-button>
    </template>
    <template slot="custom_column_button">
      <el-button type="primary" size="small" @click="openCustomColumnDialog">自定义列</el-button>
    </template>
    <template slot="selection_right">
      <el-tag type="primary">表格左上方已选状态右边的插槽</el-tag>
    </template>
    <template slot="table_button">
      <el-tag type="primary"> 表格右上方按钮区域插槽</el-tag>
    </template>
    <template slot="table_prepend">
      <el-alert title="表格上方插槽" type="success" :closable="false"></el-alert>
    </template>
    <template slot="table_append">
      <el-alert title="表格下方插槽" type="success" :closable="false"></el-alert>
    </template>
    <template slot="page_append">
      <el-alert title="页码下方插槽" type="success" :closable="false"></el-alert>
    </template>
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
          search: {
            type: "text",
            slot: "name",
          },
        },
        {
          label: "邮箱",
          prop: "email",
          showOverflowTooltip: true,
        },
        {
          label: "积分",
          prop: "score",
          filters: [["numeral", "0,0.00"]],
          width: 120,
        },
        {
          label: "注册日期",
          prop: "date",
          filters: "datetime",
        },
        {
          label: "状态",
          prop: "status",
          enumTag: "el-tag",
          enum: [
            { label: "Normal", value: "1", type: "primary" },
            { label: "Block", value: "2", type: "warning" },
          ],
        },
        {
          label: "操作",
          prop: "option",
          fixed: "right",
          width: 200,
          slot: true,
        },
      ],
    };
  },
  methods: {
    search() {
      this.$refs["TablePage"].search();
    },
    reset() {
      this.$refs["TablePage"].resetSearch();
    },
    openCustomColumnDialog() {
      this.$refs["TablePage"].openCustomColumnDialog();
    },
    clearSelection() {
      this.$refs["TablePage"].clearSelection();
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