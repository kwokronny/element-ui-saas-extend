import { expect } from "chai";
import { Random } from "mockjs";
import { createVue, triggerEvent, waitImmediate, wait } from "../../util";
import { omitBy, cloneDeep, reduce } from "lodash-es";
import { baseFormData } from "./mock-data";

export default () => {
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
		for (let name in form) {
			let field = form[name]
			if (field.type == "hidden") continue;
			else {
				let rule = vm.$refs.form.rules[name]
				let $formItem = vm.$el.querySelector(`.el-form-item[data-prop='${name}']`);
				expect($formItem, `${name} formItem not`).to.exist
				expect($formItem.classList.contains('is-required'), `form item ${name} className contian 'is-required'`).to.true;

				if (/check|((date(time|)|time|month|year|number)(range|s)$)/.test(field.type) || (field.type == "select" && field.multiple) || (field.type == "cascader" && (!field.props || field.props.emitPath !== false)) || (field.type == "slider" && field.range == true)) {
					expect(rule.some(r => r.required && r.type == 'array'), `${name} rule not include required rule`).to.true
				} else if (/slider|rate|number/.test(field.type)) {
					expect(rule.some(r => r.required && r.type == 'number'), `${name} rule not include required rule`).to.true
				} else if (field.type == 'switch') {
					expect(rule.some(r => r.required && r.type == 'boolean'), `${name} rule not include required rule`).to.true
				} else {
					expect(rule.some(r => r.required && r.type == 'string'), `${name} rule not include required rule`).to.true
				}
			}
		}
		expect(vm.$el.querySelectorAll(`.el-form-item__error`).length).to.equal(0);
		let defaultValidFaildField = omitBy(form, (f) => ["switch", "number", "hidden", "plain", "check", "slider", "rate"].includes(f.type))
		let randomField = Random.pick(Object.keys(defaultValidFaildField))
		vm.$refs.form.validateField(randomField)
		await wait(200)
		expect(vm.$el.querySelectorAll(`.el-form-item__error`).length, "only valid field faild").to.equal(1);
		expect(vm.$el.querySelector(`.el-form-item[data-prop='${randomField}'] .el-form-item__error`)).to.exist;
		vm.$refs.form.validate()
		await waitImmediate()
		vm.$refs.form.validate((valid) => expect(valid).to.be.false);
		try {
			await vm.$refs.form.validate();
			expect(true).to.be.false;
		} catch (e) {
			for (let key in defaultValidFaildField) {
				expect(vm.$el.querySelector(`.el-form-item[data-prop='${key}'] .el-form-item__error`), `${key} error render faild`).to.exist;
			}
		}
	});

	it("ruleType and addRules", async () => {
		vm = createVue({
			template: `<el-form-auto :data="form" v-model="model" ref="form">
				<template slot="ruleType" slot-scope="{item, model, name}">
					<template v-for="(text, idx) in model[name]">
						<el-input type="text" v-model="model[name][idx]" :key="idx" />
					</template>
				</template>
			</el-form-auto>`,
			data() {
				return {
					model: {},
					form: {
						ruleType: {
							type: "plain",
							required: true,
							ruleType: "array",
							slot: true,
							value: [],
							addRules: [
								{
									validator: (rule, value, cb) => {
										if (value.some(t => !t)) cb(new Error("成员不可为空"))
										cb()
									},
									trigger: "blur"
								}
							]
						}
					},
				};
			},
		}, true);
		await waitImmediate()
		expect(vm.$refs.form.rules['ruleType'].some(i => i.required && i.type == "array"), "ruleType faild").to.true
		vm.model.ruleType = ["", "add"]
		await waitImmediate()
		let $formItem = vm.$el.querySelector(".el-form-item[data-prop='ruleType']");
		expect($formItem.querySelectorAll(".el-input").length).to.equal(2)
		triggerEvent($formItem.querySelector(".el-input input"), "blur")
		await waitImmediate()
		expect($formItem.querySelector(".el-form-item__error").textContent.trim()).to.equal("成员不可为空")
	})
};