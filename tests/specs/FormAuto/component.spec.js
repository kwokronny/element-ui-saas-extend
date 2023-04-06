import { expect } from "chai";
import FormAuto from "../../../packages/FormAuto"
import { Random } from "mockjs";
import { createTest, createVue, recordValid, triggerEvent, wait, waitImmediate } from "../../util";
import { cloneDeep } from "lodash-es";

describe("FormAuto Props:data relative Component prop", () => {
	let vm;
	//#region 基础数据
	let defaultOption = [
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

	let baseFormData = {
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
			options: defaultOption,
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
			options: defaultOption,
		},
		radiobutton: {
			label: "单选按钮",
			type: "radiobutton",
			options: defaultOption,
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


	it("type", async () => {
		vm = createVue({
			template: `<el-form-auto :data="form" v-model="model" ref="form"></el-form-auto>`,
			data() {
				return {
					model: {},
					form: baseFormData,
				};
			},
		}, true);
		await waitImmediate()
		for (let key in baseFormData) {
			let field = baseFormData[key]
			if (field.type == "hidden") break;
			let $el = vm.$el.querySelector(`.el-form-item[data-prop='${key}'] .el-form-item__content`);
			if (field.type == "timeselect") {
				expect($el.querySelector("el-date-editor .el-date-editor--time-select"), `${field.type} not render`).to.exist
			} else if (/date(time|)(|range|s)|time(range|)|year(|s)|month(|range|s)|week/.test(field.type)) {
				let $comp = $el.querySelector(".el-date-editor")
				expect($comp.classList.contains("el-date-editor--" + field.type), `${field.type} not render`).to.true
			} else if (/text|password/.test(field.type)) {
				let $comp = $el.querySelector(".el-input")
				expect($comp.querySelector("input").getAttribute("type"), `${field.type} not render`).to.equal(field.type)
			} else if (/radio(|button)|check/.test(field.type)) {
				if (/radio/.test(field.type)) {
					let $comp = $el.querySelector(".el-radio-group")
					expect($comp.querySelector(field.type == 'radio' ? "label.el-radio" : "label.el-radio-button"), `${field.type} not render`).to.exist
				} else {
					let $comp = $el.querySelector(".el-checkbox-group")
					expect($comp.querySelector("label.el-checkbox"), `${field.type} not render`).to.exist
				}
			} else if (/switch|slider|cascader|rate/.test(field.type)) {
				expect($el.querySelector(".el-" + field.type), `${field.type} not render`).to.exist
			} else if (field.type == "textarea") {
				expect($el.querySelector(".el-textarea"), `${field.type} not render`).to.exist
			} else if (field.type == "numberrange") {
				expect($el.querySelector(".el-number-range"), `${field.type} not render`).to.exist
			} else if (field.type == "number") {
				expect($el.querySelector(".el-input-number"), `${field.type} not render`).to.exist
			}
		}
	});

	it("value", async () => {
		let optionValue = [0, 3, 2, "选项2"]
		let values = {
			id: { value: 1 },
			switch: { value: true },
			slider: { value: 10 },
			text: { value: Random.csentence() },
			password: { value: Random.word() },
			cascader: { value: 6 },
			radio: { value: Random.pick(optionValue) },
			radiobutton: { value: Random.pick(optionValue) },
			check: { value: [Random.pick(optionValue)] },
			select: { value: Random.pick(optionValue) },
			number: { value: Random.integer() },
			numberRange: { value: [1, 3] },
			date: { value: Random.date('yyyy-MM-dd') },
			month: { value: Random.date('yyyy-MM') },
			months: { value: [Random.date('yyyy-MM'), Random.date('yyyy-MM')] },
			year: { value: Random.date('yyyy') },
			years: { value: [Random.date('yyyy'), Random.date('yyyy')] },
			week: { value: Random.date('yyyyw01') },
			dates: { value: [Random.date('yyyy-MM-dd'), Random.date('yyyy-MM-dd')] },
			datetime: { value: Random.datetime('yyyy-MM-dd HH:mm:ss') },
			dateRange: { value: [Random.now('yyyy-MM-01'), Random.now('yyyy-MM-05')] },
			monthRange: { value: [Random.now('yyyy-01'), Random.now('yyyy-03')] },
			dateTimeRange: { value: [Random.date('yyyy-MM-01 HH:mm:ss'), Random.date('yyyy-MM-08 HH:mm:ss')] },
			time: { value: Random.time('HH:mm:ss') },
			timeRange: { value: [Random.time('01:mm:ss'), Random.time('08:mm:ss')] },
			rate: { value: Random.integer(0, 5) },
			textarea: { value: Random.cparagraph() }
		}
		vm = createVue({
			template: `<el-form-auto :data="form" v-model="model" ref="form"></el-form-auto>`,
			data() {
				return {
					model: {},
					form: Object.assign(cloneDeep(FormData), values),
				};
			},
		}, true);
		await waitImmediate()
		let fields = vm.$refs.form.fields
		for (let name in fields) {
			let field = fields[name]
			if (typeof values[name].value == "object") {
				expect(field.value, `field [${name}] defaultValue shoulde ${values[name].value}, but now is ${field.value}`).to.deep.equal(values[name].value)
			} else {
				expect(field.value, `field [${name}] defaultValue shoulde ${values[name].value}, but now is ${field.value}`).to.equal(values[name].value)
			}
		}
		// console.log(vm.$refs.form.defaultValue)
		// expect(recordValid((vm.$refs.form.field), values),vm.$refs.form.field).to.true
	})
});
