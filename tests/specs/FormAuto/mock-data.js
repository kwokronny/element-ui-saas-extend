import { cloneDeep } from "lodash-es";
import userData from "../../mock/user.json";

//#region 基础数据
export let defaultOption = [
	{
		label: "选项1",
		value: 0,
	},
	{
		label: "带图标选项3",
		icon: "el-icon-help",
		value: 3,
	},
	{
		label: "选项禁用2",
		value: 2,
		disabled: true,
	},
	"选项2",
];

export let baseFormData = {
	id: {
		label: "id",
		type: "hidden",
	},
	switch: {
		label: "开关",
		type: "switch",
	},
	slider: {
		col: 12,
		label: "滑块",
		type: "slider",
	},
	text: {
		label: "文本框",
		type: "text",
	},
	password: {
		label: "密码框",
		type: "password",
	},
	cascader: {
		label: "级联框",
		type: "cascader",
		options: [
			{
				label: "节点1",
				value: 1,
				children: [
					{
						label: "节点4",
						value: 4,
						children: [{ label: "节点5", value: 5 }],
					},
				],
			},
			{
				label: "节点2",
				value: 2,
				children: [{ label: "节点6", value: 6 }],
			},
			{ label: "节点3", value: 3 },
		],
	},
	select: {
		label: "选择框",
		type: "select",
		remote: true,
		options: async (query) => {
			return userData.reduce((record, item) => {
				if (item.username.indexOf(query) > -1) {
					record.push({
						label: item.username,
						value: item.id,
					});
				}
				return record;
			}, []);
		},
	},
	scrollselect: {
		label: "选择框",
		type: "select",
		remote: true,
		loadScroll: true,
		options: async (query, page) => {
			return userData.reduce((record, item) => {
				if (item.username.indexOf(query) > -1) {
					record.push({
						label: item.username,
						value: item.id + (page - 1) * userData.length,
					});
				}
				return record;
			}, []);
		},
	},
	number: {
		label: "数值",
		type: "number",
	},
	numberRange: {
		label: "数值范围",
		type: "numberrange",
		rangeName: ["startNum", "endNum"]
	},
	date: {
		label: "日期",
		type: "date",
	},
	month: {
		label: "月份",
		type: "month",
	},
	months: {
		label: "月份",
		type: "month",
	},
	year: {
		label: "年份",
		type: "year",
	},
	years: {
		label: "年份",
		type: "years",
	},
	week: {
		label: "周",
		type: "week",
	},
	dates: {
		label: "日期",
		type: "dates",
	},
	datetime: {
		label: "日期时间",
		type: "datetime",
	},
	dateRange: {
		label: "日期范围",
		type: "daterange",
		rangeName: ["startDate", "endDate"],
	},
	monthRange: {
		label: "月份范围",
		type: "monthrange",
		rangeName: ["startMonth", "endMonth"],
	},
	dateTimeRange: {
		label: "日期时间范围",
		type: "datetimerange",
		rangeName: ["startDateTime", "endDateTime"],
	},
	time: {
		label: "时间",
		type: "time",
	},
	timeselect: {
		label: "时间",
		type: "timeselect",
	},
	timeRange: {
		label: "时间范围",
		type: "timerange",
		rangeName: ["startTime", "endTime"],
	},
	radio: {
		label: "单选框",
		type: "radio",
		options: async () => defaultOption,
	},
	radiobutton: {
		label: "单选按钮",
		type: "radiobutton",
		options: cloneDeep(defaultOption),
	},
	check: {
		label: "复选框",
		type: "check",
		options: defaultOption,
	},
	rate: {
		label: "评分",
		type: "rate",
	},
	textarea: {
		label: "备注",
		type: "textarea",
	},
};
	//#endregion