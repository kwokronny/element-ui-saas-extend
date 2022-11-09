<template>
	<el-form-auto :data="form" v-model="model" label-width="90px">
		<template slot-scope="{ item, model, name }" slot="upload">
			<el-upload
				action="https://jsonplaceholder.typicode.com/upload"
				v-model="model[name]"
				:on-success="uploadSuccess"
			>
				<el-button round type="primary" icon="el-icon-upload">上传文件</el-button>
			</el-upload>
		</template>
		<template slot-scope="{ item, model, name }" slot="color">
			<el-color-picker v-model="model[name]"></el-color-picker>
		</template>
		<div>表单字段: {{ model }}</div>
	</el-form-auto>
</template>
<script>
export default {
	data() {
		return {
			form: {
				user: {
					col: 12,
					label: "选择用户",
					labelTooltip: "自定义的组件，可直接使用",
					type: "component",
					component: "user-selector",
					on: {
						select: item => {
							this.model.id = item.id;
							this.model.name = item.name;
							this.model.phone = item.phone;
							this.model.email = item.email;
						}
					}
				},
				id: {
					col: 12,
					label: "用户ID",
					type: "plain",
					value: "未选择"
				},
				name: {
					col: 12,
					label: "姓名",
					type: "plain",
					value: "未选择"
				},
				phone: {
					col: 12,
					label: "手机",
					type: "plain",
					value: "未选择",
				},
				email: {
					col: 12,
					label: "邮箱",
					type: "plain",
					value: "未选择"
				},
				color1: {
					col: 12,
					label: "颜色1",
					type: "text",
					slot: "color"
				},
				color2: {
					col: 12,
					label: "颜色2",
					type: "text",
					slot: "color"
				},
				upload: {
					label: "上传",
					slot: true,
					type: "text"
				}
			},
			model: {}
		};
	},
	methods: {
		uploadSuccess(res, file, filelist) {
			this.model.upload = "上传返回URL";
		}
	}
};
</script>
