<template>
	<el-table-page ref="TablePage" :search-collapse="2" :columns="columns" :request="getList"></el-table-page>
</template>
<script>
export default {
	data() {
		return {
			columns: [
				{
					label: "姓名",
					prop: "name",
					search: {
						type: "text"
					}
				},
				{
					label: "邮箱",
					prop: "email"
				},
				{
					label: "积分",
					prop: "score",
					filters: [["numeral", "0,0"]],
					search: {
						type: "numberrange"
					}
				},
				{
					label: "余额",
					prop: "balance",
					filters: [["numeral", "0,0.00"], "yuan"],
					search: {
						type: "numberrange"
					}
				},
				{
					label: "注册日期",
					prop: "date",
					filters: [["dayjs", "YYYY-MM-DD"]],
					search: {
						type: "daterange",
						value: ["2021-01-03", "2021-01-25"],
						defaultTime: ["00:00:00", "23:59:59"],
						rangeName: ["startDate", "endDate"]
					}
				},
				{
					label: "状态",
					prop: "status",
					enumTag: "el-tag",
					enum: [
						{ label: "正常", value: "1", type: "primary" },
						{ label: "失效", value: "2", type: "warning" }
					],
					search: {
						type: "select"
					}
				},
				{
					label: "标签",
					prop: "tagArr",
					enumTag: "el-tag",
					copy: true,
					enum: [
						{ label: "聪明", value: "1", type: "primary" },
						{ label: "可爱", value: "2", type: "success" },
						{ label: "勇敢", value: "3", type: "warning" }
					],
					search: {
						type: "select",
						multiple: true
					}
				}
			]
		};
	},
	methods: {
		getList(page = 1, search, pageSize) {
			return axios
				.get("/element-ui-saas-extend/json/page.json")
				.then(function(ret) {
					let baseId = (page - 1) * pageSize;
					return {
						page,
						total: 100,
						pageSize,
						record: ret.data.data.slice(baseId, baseId + pageSize)
					};
				});
		}
	}
};
</script>