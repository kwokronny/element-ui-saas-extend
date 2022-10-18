
<template>
	<el-form-auto :data="form" ref="EditForm" v-model="model">
		<div>{{ model }}</div>
	</el-form-auto>
</template>
<script>
export default {
	data() {
		return {
			model: {},
			form: {
				asyncSelect: {
					label: "可滚动加载的搜索选项框",
					type: "select",
					filterable: true,
					remote: true,
					loadScroll: true,
					options: (query = "", page = 1) => {
						if (page > 3) return [];
								console.log(query,page);
						return axios
							.get(`https://jsonplaceholder.typicode.com/users`)
							.then(res => {
								return res.data.reduce((res, item) => {
									// if (item.username.indexOf(query) > -1) {
									res.push({
										label: item.username,
										value: item.id * page
									});
									// }
									return res;
								}, []);
							});
					}
				},
				select: {
					label: "选择框",
					type: "select",
					options: () => {
						return axios
							.get("https://jsonplaceholder.typicode.com/users")
							.then(res => {
								return res.data.map(item => {
									return {
										label: item.username,
										value: item.id
									};
								});
							});
					},
					on: {
						change: () => {
							this.model.remoteCascader = 1;
						}
					}
				},
				remoteCascader: {
					label: "级联框",
					type: "cascader",
					props: { label: "name", value: "id", children: "childrenList" },
					options: () => {
						return axios
							.get("/element-ui-saas-extend/json/cascader.json")
							.then(res => {
								return res.data;
							});
					}
				},
				radio: {
					col: 12,
					label: "单选框",
					type: "radio",
					notAll: true,
					options: ["单选1", "单选2", "单选3"]
				},
				check: {
					label: "复选框",
					type: "check",
					options: [
						"复选1",
						"复选2",
						{
							label: "带图标复选3",
							value: 3,
							icon: "el-icon-help"
						}
					]
				}
			}
		};
	}
};
</script>