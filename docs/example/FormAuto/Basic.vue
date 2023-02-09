<template>
	<div>
		<el-card shadow="never" header="内联表单" style="margin-bottom: 15px;">
			<el-form-auto
				:data="filterForm"
				ref="FilterForm"
				v-model="filterModel"
				label-width="70px"
				inline
			></el-form-auto>
			<div>{{filterModel}}</div>
		</el-card>
		<el-card shadow="never" header="栅格表单（应用 el-row 可对表单项进行布局）">
			<el-form-auto :data="form" ref="EditForm" v-model="model" label-width="120px">
				<div>{{model}}</div>
				<el-button type="primary" @click="getValidModel">验证规则</el-button>
				<el-button type="default" @click="reset">重置</el-button>
				<el-button type="primary" @click="edit">编辑</el-button>
			</el-form-auto>
		</el-card>
	</div>
</template>
<script>
var defaultOption = [
	{
		label: "选项1",
		value: 0
	},
	{
		label: "带图标选项3",
		icon: "el-icon-help",
		value: 3
	},
	{
		label: "选项禁用2",
		value: 2,
		disabled: true
	},
	"选项2"
];
export default {
	data() {
		return {
			filterForm: {
				account: {
					label: "文本框",
					type: "text"
				},
				date: {
					label: "日期",
					type: "date"
				},
				dateRange: {
					label: "日期范围",
					type: "datetimerange",
					rangeName: ["startDate", "endDate"]
				},
				numberrange: {
					label: "金额范围",
					type: "numberrange",
					rangeName: ["min", "max"]
				},
				status: {
					label: "选择框",
					type: "select",
					options: { 1: "正常", 2: "禁用" }
				},
				radiobutton: {
					label: "选择框",
					type: "radiobutton",
					options: { 1: "正常", 2: "禁用" }
				}
			},
			filterModel: {},
			model: {},
			form: {
				id: {
					label: "id",
					type: "hidden"
				},
				switch: {
					col: 12,
					label: "开关",
					type: "switch",
					required: true
				},
				slider: {
					col: 12,
					label: "滑块",
					type: "slider",
					value: 10,
					required: true
				},
				sliderRange: {
					col: 12,
					label: "滑块",
					type: "slider",
					range: true,
					required: true
				},
				text: {
					col: 12,
					label: "文本框",
					labelTooltip: "labelTooltip属性可以在标签旁增加图标，提示字段含义",
					type: "text",
					required: true
				},
				password: {
					col: 12,
					label: "密码框",
					type: "password",
					required: true,
					addRules: [
						{
							pattern: /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/,
							message: "需要8位~16位以内，包含字母与数字的字符"
						}
					]
				},
				cascader: {
					col: 12,
					label: "级联框",
					type: "cascader",
					required: true,
					props: {
						emitPath: false
					},
					options: [
						{
							label: "节点1",
							value: 1,
							children: [
								{
									label: "节点4",
									value: 4,
									children: [{ label: "节点5", value: 5 }]
								}
							]
						},
						{
							label: "节点2",
							value: 2,
							children: [{ label: "节点6", value: 6 }]
						},
						{ label: "节点3", value: 3 }
					]
				},
				select: {
					col: 12,
					label: "选择框",
					type: "select",
					required: true,
					options: defaultOption
				},
				date: {
					col: 12,
					label: "日期",
					type: "date",
					required: true
				},
				dates: {
					col: 12,
					label: "多个日期",
					type: "dates",
					required: true
				},
				months: {
					col: 12,
					label: "多个月份",
					type: "months",
					required: true
				},
				years: {
					col: 12,
					label: "多个年份",
					type: "years",
					required: true
				},
				datetime: {
					col: 12,
					label: "日期时间",
					type: "datetime",
					required: true
				},
				time: {
					col: 12,
					label: "时间",
					type: "time",
					required: true
				},
				timeSelect: {
					col: 12,
					label: "时间选择",
					type: "timeselect",
					required: true,
					style: "width:100%"
				},
				timeRange: {
					col: 12,
					label: "时间范围",
					type: "timerange",
					rangeName: ["startTime", "endTime"],
					required: true
				},
				dateRange: {
					col: 12,
					label: "日期范围",
					type: "daterange",
					rangeName: ["startDate", "endDate"],
					required: true
				},
				monthRange: {
					col: 12,
					label: "月份范围",
					type: "monthrange",
					rangeName: ["startDate", "endDate"],
					required: true
				},
				datetimeRange: {
					label: "日期时间范围",
					type: "datetimerange",
					rangeName: ["startDT", "endDT"],
					required: true
				},
				radio: {
					label: "单选框",
					type: "radio",
					required: true,
					options: defaultOption
				},
				radiobutton: {
					label: "单选按钮",
					type: "radiobutton",
					options: defaultOption,
					required: true
				},
				check: {
					label: "复选框",
					type: "check",
					required: true,
					options: { 1: "选项1", 2: "选项2", 3: "选项3" }
				},
				rate: {
					label: "评分",
					type: "rate",
					required: true
				},
				textarea: {
					label: "备注",
					type: "textarea",
					minlength: 5,
					maxlength: 10,
					showWordLimit: true
				}
			}
		};
	},
	methods: {
		reset() {
			this.$refs["EditForm"].reset();
		},
		edit() {
			this.form.password.disabled = true;
			this.model = {
				id: "123",
				plain: "无需提交",
				switch: 0,
				slider: 23,
				text: "文本",
				password: "password123456",
				textarea: null,
				date: "2021-01-10",
				dates: ["2021-01-10", "2021-01-12"],
				datetime: "2021-01-10 11:11:00",
				dateRange: ["2021-01-10", "2021-01-13"],
				datetimeRange: ["2021-01-10 11:11:00", "2021-01-12 13:11:00"],
				time: "11:11:00",
				timeSelect: "11:00",
				timeRange: ["11:11:00", "22:12:00"],
				select: 0,
				check: ["1"],
				radiobutton: 0,
				radio: 3,
				cascader: [2, 6],
				rate: 5
			};
		},
		async getValidModel() {
			try {
				await this.$refs["EditForm"].validate();
			} catch {}
		}
	}
};
</script>