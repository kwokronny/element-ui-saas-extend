<template>
	<el-form-auto :data="form" ref="EditForm" v-model="model" label-width="90px">{{ model }}</el-form-auto>
</template>
<script>
export default {
	data() {
		return {
			form: {
				date: {
					label: "日期",
					type: "date",
					valueFormat: "unix"
				},
				daterange: {
					label: "日期范围",
					type: "daterange",
					rangeName: ["startDate", "endDate"],
					valueFormat: "unix"
				},
				time: {
					label: "时间",
					type: "time",
					valueFormat: "unix"
				},
				slider: {
					label: "范围",
					type: "slider",
					rangeName: ["startNum", "endNum"],
				}
			},
			model: {}
		};
	}
};
</script>