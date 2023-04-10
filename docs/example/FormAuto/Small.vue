<template>
	<el-form-auto :data="form" ref="EditForm" v-model="model" label-width="110px">{{ model }}</el-form-auto>
</template>
<script>
export default {
	data() {
		return {
			form: {
				date: {
					label: "日期",
					type: "date",
					value: "2011-06-08"
				},
				week: {
					label: "周",
					type: "week",
				},
				daterange: {
					label: "日期范围",
					type: "daterange",
					suffixTime: true,
					rangeName: ["startDate", "endDate"],
					// defaultTime: ["00:00:00", "23:59:59"]
				},
				daterangeUnix: {
					label: "unix日期范围",
					type: "daterange",
					rangeName: ["startUnixDate", "endUnixDate"],
					valueFormat: "unix",
					value: [1665763200000, 1666022400000]
				},
				dates: {
					label: "多个日期",
					type: "dates",
					valueFormat: "unix",
					value: [1307462400000]
				},
				time: {
					label: "时间",
					type: "time",
					valueFormat: "unix"
				},
				timeselect: {
					label: "时间",
					type: "timeselect"
				},
				timerange: {
					label: "时间范围",
					type: "timerange",
					valueFormat: "unix",
					rangeName: ["startTime", "endTime"]
				},
				slider: {
					label: "范围",
					type: "slider",
					range: true,
					rangeName: ["startNum", "endNum"],
					min: 1,
					max: 7
				}
			},
			model: {}
		};
	},
	mounted(){
		this.model = {daterange:["2023-04-01","2023-04-05"]}
	}
};
</script>