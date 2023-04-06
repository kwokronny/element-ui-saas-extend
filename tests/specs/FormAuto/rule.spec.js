import { expect } from "chai";
import { Random } from "mockjs";
import { createTest, createVue, recordValid, triggerClick, triggerEvent, wait, waitImmediate } from "../../util";
import { pickBy, cloneDeep, forEach, reduce } from "lodash-es";
import { baseFormData } from "./mock-data";
import dayjs from "dayjs";
import userData from "../../mock/user.json";

describe("FormAuto Props:data relative Rule prop", () => {
	let vm;

	it("required", async () => {
		let form = reduce(cloneDeep(baseFormData), (form, field, name) => {
			field.required = true;
			form[name] = field
			return form
		}, {})
		vm = createVue({
			template: `<el-form-auto :data="form" v-model="model" ref="form"></el-form-auto>`,
			data() { return { model: {}, form, }; },
		}, true);
		await waitImmediate()
		console.log(vm.$refs.form.rules)
		for (let name in form) {
			let field = form[name]
			if (field.type == "hidden") continue;
			else {
				console.log(field)
				let rule = vm.$refs.form.rules[name]
				console.log(rule)
				let $formItem = vm.$el.querySelector(`.el-form-item[data-prop='${name}']`);
				expect($formItem,`${name} formItem not`).to.exist
				expect($formItem.classList.contains('is-required'), `form item ${name} className contian 'is-required'`).to.true;

				if (/check|((date(time|)|time|month|year|number)(range|s)$)/.test(field.type) || (field.type == "select" && field.multiple) || (field.type == "cascader" && (!field.props || field.props.emitPath !== false)) || (field.type == "slider" && field.range == true)) {
					expect(rule, `${name}:${JSON.stringify(rule)}`).to.have.members({ required: true })
				}
			}
			// } else if (/date(time|)(|range|s)|time(range|)|year(|s)|month(|range|s)|week/.test(field.type)) {
			// 	let $comp = $el.querySelector(".el-date-editor")
			// 	expect($comp.classList.contains("el-date-editor--" + field.type), `${field.type} not render`).to.true
			// } else if (/text|password/.test(field.type)) {
			// 	let $comp = $el.querySelector(".el-input")
			// 	expect($comp.querySelector("input").getAttribute("type"), `${field.type} not render`).to.equal(field.type)
			// } else if (/radio(|button)|check/.test(field.type)) {
			// 	if (/radio/.test(field.type)) {
			// 		let $comp = $el.querySelector(".el-radio-group")
			// 		expect($comp.querySelector(field.type == 'radio' ? "label.el-radio" : "label.el-radio-button"), `${field.type} not render`).to.exist
			// 	} else {
			// 		let $comp = $el.querySelector(".el-checkbox-group")
			// 		expect($comp.querySelector("label.el-checkbox"), `${field.type} not render`).to.exist
			// 	}
			// } else if (/switch|slider|cascader|rate/.test(field.type)) {
			// 	expect($el.querySelector(".el-" + field.type), `${field.type} not render`).to.exist
			// } else if (field.type == "textarea") {
			// 	expect($el.querySelector(".el-textarea"), `${field.type} not render`).to.exist
			// } else if (field.type == "numberrange") {
			// 	expect($el.querySelector(".el-number-range"), `${field.type} not render`).to.exist
			// } else if (field.type == "number") {
			// 	expect($el.querySelector(".el-input-number"), `${field.type} not render`).to.exist
			// }
		}
	});

});