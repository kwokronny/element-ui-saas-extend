
<template>
	<el-form-auto :data="form" ref="EditForm" v-model="model" label-width="90px">
		<el-button type="primary" @click="editOptionReshow">远程搜索选项回显</el-button>
		<el-button type="primary" @click="reset">重置</el-button>
		<div>{{ model }}</div>
	</el-form-auto>
</template>
<script>
export default {
	data() {
		let getOptions = (query, page) => {
			return axios
				.get("https://jsonplaceholder.typicode.com/users", {
					params: { query, page }
				})
				.then(res => {
					return res.data.reduce((prev, curr) => {
						if (curr.username.indexOf(query) > -1) {
							prev.push({
								label: curr.username,
								value: curr.id * page
							});
						}
						return prev;
					}, []);
				});
		};
		return {
			model: {},
			form: {
				remote: {
					col: 12,
					label: "远程搜索",
					type: "select",
					style: "width:100%",
					required: true,
					loadScroll: true,
					remote: true,
					options: getOptions
				},
				remoteMult: {
					col: 12,
					label: "远程搜索",
					type: "select",
					style: "width:100%",
					multiple: true,
					required: true,
					loadScroll: true,
					remote: true,
					options: getOptions
				}
			}
		};
	},
	methods: {
		editOptionReshow() {
			this.model = {
				remote: { label: "回显测试", value: "echo_show" },
				remoteMult: [
					{ label: "测试", value: "123" },
					{ label: "测试2", value: "1233" }
				]
			};
		},
		reset() {
			this.$refs["EditForm"].reset();
		}
	}
};
</script>