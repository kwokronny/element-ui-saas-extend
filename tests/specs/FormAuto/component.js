import { expect } from "chai";
import { Random } from "mockjs";
import { createTest, createVue, recordValid, triggerClick, triggerEvent, wait, waitImmediate } from "../../util";
import { pickBy, cloneDeep, forEach, reduce } from "lodash-es";
import { baseFormData } from "./mock-data";
import dayjs from "dayjs";
import userData from "../../mock/user.json";

export default () => {
	let vm;

	it("type", async () => {
		vm = createVue({
			template: `<el-form-auto :data="form" v-model="model" ref="form"></el-form-auto>`,
			data() { return { model: {}, form: baseFormData, }; },
		}, true);
		await waitImmediate()
		for (let name in baseFormData) {
			let field = baseFormData[name]

			if (field.type == "hidden") {
				expect(vm.$el.querySelector(`.el-form-item[data-prop='${name}']`)).to.not.exist;
			} else {
				let $label = vm.$el.querySelector(`.el-form-item[data-prop='${name}'] .el-form-item__label`);
				expect($label.textContent.trim(), 'form item:${name} label not equal').to.equal(field.label)

				let $formContent = vm.$el.querySelector(`.el-form-item[data-prop='${name}'] .el-form-item__content`);
				expect($formContent, `${name} formItem should render`).to.exist
				if (field.type == "plain") {
					expect($formContent.querySelector("div").textContent.trim(), `${field.type} should render`).to.equal(field.value)
				} else if (field.type == "timeselect") {
					expect($formContent.querySelector(".el-date-editor--time-select"), `${field.type} should render`).to.exist
				} else if (/date(time|)(|range|s)|time(range|)|year(|s)|month(|range|s)|week/.test(field.type)) {
					let $comp = $formContent.querySelector(".el-date-editor")
					expect($comp.classList.contains("el-date-editor--" + field.type), `${field.type} should render`).to.true
				} else if (field.type == "textarea") {
					expect($formContent.querySelector(".el-textarea"), `${field.type} should render`).to.exist
				} else if (/text|password/.test(field.type)) {
					let $comp = $formContent.querySelector(".el-input input")
					expect($comp.getAttribute("type"), `${field.type} should render`).to.equal(field.type)
				} else if (/radio(|button)|check/.test(field.type)) {
					if (/radio/.test(field.type)) {
						let $comp = $formContent.querySelector(".el-radio-group")
						expect($comp.querySelector(field.type == 'radio' ? "label.el-radio" : "label.el-radio-button"), `${field.type} should render`).to.exist
					} else {
						let $comp = $formContent.querySelector(".el-checkbox-group")
						expect($comp.querySelector("label.el-checkbox"), `${field.type} should render`).to.exist
					}
				} else if (/switch|slider|cascader|rate/.test(field.type)) {
					expect($formContent.querySelector(".el-" + field.type), `${field.type} should render`).to.exist
				} else if (field.type == "numberrange") {
					expect($formContent.querySelector(".el-number-range"), `${field.type} should render`).to.exist
				} else if (field.type == "number") {
					expect($formContent.querySelector(".el-input-number"), `${field.type} should render`).to.exist
				}
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

	it("slot", async () => {
		let value = Random.cword();
		vm = createVue({
			template: `<el-form-auto :data="form" v-model="model" ref="form">
				<template slot="field" slot-scope="{item, model, name}">
					{{item.label}}:{{model[name]}}
				</template>
			</el-form-auto>`,
			data() {
				return {
					model: {},
					form: {
						field: {
							label: "插槽",
							type: "plain",
							value,
							slot: true
						}
					},
				};
			},
		}, true);

		let $el = vm.$el.querySelector(`.el-form-item[data-prop='field'] .el-form-item__content`);
		expect($el.textContent.trim(), "").to.equal(`插槽:${value}`)
	})

	it("rangeName", async () => {
		let form = {
			daterange: {
				label: "日期范围",
				type: "daterange",
				rangeName: ["startD", "endD"]
			},
			timerange: {
				label: "时间范围",
				type: "daterange",
				rangeName: ["startT", "endT"]
			},
			monthrange: {
				label: "月份范围",
				type: "monthrange",
				rangeName: ["startM", "endM"]
			},
			datetimerange: {
				label: "日期范围",
				type: "datetimerange",
				rangeName: ["startDT", "endDT"]
			},
			numberrange: {
				label: "数值范围",
				type: "numberrange",
				rangeName: ["startN", "endN"]
			},
			slider: {
				label: "滑块",
				type: "slider",
				range: true,
				rangeName: ["startS", "endS"]
			}
		};
		vm = createVue({
			template: `<el-form-auto :data="form" v-model="model" ref="form"></el-form-auto>`,
			data() {
				return {
					model: {},
					form,
				};
			},
		}, true);
		let data = {
			slider: [1, 3],
			numberrange: [1, 3],
			daterange: [Random.now('yyyy-MM-01'), Random.now('yyyy-MM-05')],
			monthrange: [Random.now('yyyy-01'), Random.now('yyyy-03')],
			datetimerange: [Random.date('yyyy-MM-01 HH:mm:ss'), Random.date('yyyy-MM-08 HH:mm:ss')],
			timerange: [Random.time('01:mm:ss'), Random.time('08:mm:ss')],
		}
		vm.model = cloneDeep(data);
		await waitImmediate()
		for (let name in form) {
			let field = form[name];
			let [sn, en] = field.rangeName
			expect(vm.model[sn], `${name}-${sn}:${vm.model[sn]}`).to.equal(data[name][0])
			expect(vm.model[en], `${name}-${en}:${vm.model[en]}`).to.equal(data[name][1])
		}
	})

	it("suffixTime", async () => {
		vm = createVue({
			template: `<el-form-auto :data="form" v-model="model" ref="form"></el-form-auto>`,
			data() {
				return {
					model: {},
					form: {
						daterange: {
							label: "日期范围",
							type: "daterange",
							suffixTime: true,
							rangeName: ["startD", "endD"]
						}
					},
				};
			},
		}, true);
		expect(vm.$refs.form.fields['daterange'].props.defaultTime).to.deep.equal(["00:00:00", "23:59:59"])
		expect(vm.$refs.form.fields['daterange'].props.valueFormat).to.equal("yyyy-MM-dd HH:mm:ss")
	})

	it("valueFormat", async () => {
		let form = reduce(
			pickBy(cloneDeep(baseFormData), (field, name) => name != 'timeselect' && /date(time|)(|range|s)|time(range|)|year(|s)|month(|range|s)|week/.test(name)),
			(form, field, name) => {
				field.valueFormat = "unix"
				form[name] = field
				return form
			}, {});
		vm = createVue({
			template: `<el-form-auto :data="form" v-model="model" ref="form"></el-form-auto>`,
			data() {
				return {
					model: {},
					form,
				};
			},
		}, true);
		let data = {
			date: Random.datetime('yyyy-MM-dd 00:00:00'),
			month: Random.datetime('yyyy-MM-01 00:00:00'),
			months: [Random.datetime('yyyy-MM-01 00:00:00'), Random.datetime('yyyy-MM-01 00:00:00')],
			year: Random.datetime('yyyy-01-01 00:00:00'),
			years: [Random.datetime('yyyy-01-01 00:00:00'), Random.datetime('yyyy-01-01 00:00:00')],
			// week: Random.date('yyyyw01'),
			dates: [Random.datetime('yyyy-MM-dd 00:00:00'), Random.datetime('yyyy-MM-dd 00:00:00')],
			datetime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
			dateRange: [Random.now('yyyy-MM-01 00:00:00'), Random.now('yyyy-MM-05 00:00:00')],
			monthRange: [Random.now('yyyy-01-01 00:00:00'), Random.now('yyyy-03-01 00:00:00')],
			dateTimeRange: [Random.date('yyyy-MM-01 HH:mm:ss'), Random.date('yyyy-MM-08 HH:mm:ss')],
			time: Random.now('yyyy-MM-dd HH:mm:ss'),
			timeRange: [Random.now('yyyy-MM-dd 01:mm:ss'), Random.now('yyyy-MM-dd 08:mm:ss')],
		}
		vm.model = cloneDeep(data);
		await waitImmediate()
		forEach(vm.form, (field, name) => {
			if (field.rangeName) {
				let [sn, en] = field.rangeName
				expect(vm.model[sn], `${name}[${sn}]:${vm.model[sn]}`).to.equal(dayjs(data[name][0]).unix())
				expect(vm.model[en], `${name}[${en}]:${vm.model[en]}`).to.equal(dayjs(data[name][1]).unix())
			} else if (Array.isArray(vm.model[name])) {
				vm.model[name].map((time, idx) => {
					expect(time, `${name}[${idx}]:${time}${data[name][idx]}`).to.equal(dayjs(data[name][idx]).unix())
				})
			} else if (vm.model[name]) {
				expect(vm.model[name], `${name}:${vm.model[name]}`).to.equal(dayjs(data[name]).unix())
			}
		})
	})

	it("options", async () => {
		let form = pickBy(cloneDeep(baseFormData), (field, name) => /check|radio|radiobutton|cascader/.test(name));
		vm = createVue({
			template: `<el-form-auto :data="form" v-model="model" ref="form"></el-form-auto>`,
			data() {
				return {
					model: {},
					form,
				};
			},
		}, true);
		await waitImmediate()
		let fields = vm.$refs.form.fields;
		for (let name in form) {
			if (name == 'cascader') {
				expect(fields[name].options, `${name} options`).to.deep.equal([
					{ "label": "节点1", "value": 1, "children": [{ "label": "节点4", "value": 4, "children": [{ "label": "节点5", "value": 5 }] }], "disabled": false, "icon": false },
					{ "label": "节点2", "value": 2, "children": [{ "label": "节点6", "value": 6 }], "disabled": false, "icon": false },
					{ "label": "节点3", "value": 3, "disabled": false, "icon": false, "children": [] }])
			} else {
				expect(fields[name].options, `${name} options ${fields[name].options}`).to.deep.equal([
					{ label: '选项1', value: 0, disabled: false, icon: false, children: [] },
					{ label: '带图标选项3', icon: 'el-icon-help', value: 3, disabled: false, children: [] },
					{ label: '选项禁用2', value: 2, disabled: true, icon: false, children: [] },
					{ label: '选项2', value: '选项2', disabled: false, icon: false, children: [] }
				])
			}
		}
	})

	it("remote and loadScroll", async () => {
		let form = pickBy(cloneDeep(baseFormData), (field, name) => name != 'timeselect' && /select/.test(name));
		vm = createVue({
			template: `<el-form-auto :data="form" v-model="model" ref="form"></el-form-auto>`,
			data() { return { model: {}, form, visiblePass: false, clearPass: false }; },
		}, true);
		let options = userData.reduce((record, item) => {
			record.push({
				label: item.username,
				value: item.id,
				children: [],
				icon: false,
				disabled: false
			});
			return record;
		}, [])
		for (let name in form) {
			await waitImmediate()
			let fields = vm.$refs.form.fields;
			if (name == "select") {
				expect(fields[name].options, `init ${name} remote fetch: ${JSON.stringify(fields[name].options)}`).to.deep.equal(options);
				let $select = vm.$refs.form.$children[0].$children[0].$children[0].$children[0].$children[1];
				$select.handleQueryChange("");
				await waitImmediate();
				let query = Random.pick(options)
				$select.handleQueryChange(query.label);
				await wait(350);
				expect(fields[name].options[0].label, `select remote search: ${query}`).to.equal(query.label);
			} else if (name == "scrollselect") {
				await waitImmediate();
				expect(fields[name].options, `init ${name} remote fetch: ${JSON.stringify(fields[name].options)}`).to.deep.equal(options);
				let $formItem = vm.$el.querySelector(".el-form-item[data-prop=scrollselect]");
				$formItem.querySelector("input").click();
				let $dropDown = $formItem.querySelector(".el-select-dropdown .el-select-dropdown__wrap");
				await waitImmediate();
				$dropDown.scrollTop = $dropDown.clientHeight;
				triggerEvent($dropDown, "scroll");
				await wait(550);
				expect(fields[name].options, `scroll load: ${JSON.stringify(fields[name].options)}`).to.deep.equal([].concat(options, options.map(i => { return Object.assign({}, i, { value: i.value + 10 }) })))
			}
		}
	})

	it("remote clear and visiable-change event", async () => {
		let form = pickBy(cloneDeep(baseFormData), (field) => field.type == "select");
		form.select.on = {
			["visible-change"]() {
				vm.handleVisibleChange();
			},
			clear() {
				vm.handleClear();
			},
		}
		vm = createVue({
			template: `<el-form-auto :data="form" v-model="model" ref="form"></el-form-auto>`,
			data() { return { model: {}, form, visiblePass: false, clearPass: false }; },
			methods: {
				handleVisibleChange() {
					this.visiblePass = true
				},
				handleClear() {
					this.clearPass = true
				}
			}
		}, true);
		let options = userData.reduce((record, item) => {
			record.push({
				label: item.username,
				value: item.id,
				children: [],
				icon: false,
				disabled: false
			});
			return record;
		}, [])
		await waitImmediate();
		let selectField = vm.$refs.form.fields.select;
		expect(selectField.options, `init select remote fetch: ${JSON.stringify(selectField.options)}`).to.deep.equal(options);
		let selectComp = vm.$refs.form.$children[0].$children[0].$children[0].$children[0].$children[1];
		selectComp.handleQueryChange("");
		await wait(100);
		selectComp.handleQueryChange("empty option");
		await wait(350);
		triggerEvent(selectComp.$el, "click")
		await wait(250);
		expect(vm.visiblePass, "visible Event faild").to.true
		expect(selectField.options, "request remoteMethod('') again when query result empty").to.deep.equal(options);
		await waitImmediate();
		let query = Random.pick(options)
		selectComp.handleQueryChange(query.label);
		await wait(350);
		expect(selectField.options[0].label, `select remote search: ${query}`).to.equal(query.label);
		selectComp.hoverIndex = 0;
		selectComp.selectOption(0);
		selectComp.inputHovering = true;
		await wait(100);
		expect(vm.model.select, `select option ${vm.model.select} faild`).to.equal(query.value)
		triggerEvent(selectComp.$el.querySelector(".el-input__icon.el-icon-circle-close"), "click");
		await wait(350);
		expect(vm.model.select, `select option ${vm.model.select} faild`).to.equal("")
		expect(vm.clearPass).to.be.true;
		expect(selectField.options, "request remoteMethod('') again when clear query").to.deep.equal(options);
	})

	it("allOption", async () => {
		let form = reduce(pickBy(cloneDeep(baseFormData), (field) => /radio/.test(field.type)),
			(form, field, name) => {
				field.allOption = true
				form[name] = field
				return form
			}, {});
		vm = createVue({
			template: `<el-form-auto :data="form" v-model="model" ref="form"></el-form-auto>`,
			data() { return { model: { radio: 2, radiobutton: 2 }, form, }; },
		}, true);
		await waitImmediate()
		let $radio = vm.$el.querySelector(`.el-form-item[data-prop='radio'] .el-form-item__content label.el-radio span.el-radio__label`);
		expect($radio.textContent.trim(), `radio allOption not render`).to.equal("全部")
		triggerEvent($radio.parentNode, "click")
		let $radiobtn = vm.$el.querySelector(`.el-form-item[data-prop='radiobutton'] .el-form-item__content label.el-radio-button span.el-radio-button__inner`);
		expect($radiobtn.textContent.trim(), `radio allOption not render`).to.equal("全部")
		triggerEvent($radiobtn.parentNode, "click")
		await waitImmediate()
		expect(vm.model, `radio click allOption, value should empty string`).to.deep.equal({ radio: '', radiobutton: '' })
	})

	it("check all option interaction", async () => {
		let form = pickBy(cloneDeep(baseFormData), (field) => field.type == 'check')
		vm = createVue({
			template: `<el-form-auto :data="form" v-model="model" ref="form"></el-form-auto>`,
			data() { return { model: {}, form, }; },
		}, true);
		await waitImmediate()
		let $formItem = vm.$el.querySelector(`.el-form-item[data-prop='check'] .el-form-item__content`);
		expect($formItem.querySelector("label.el-checkbox span.el-checkbox__label").textContent.trim(), `should render selectAll`).to.equal("全选")
		triggerEvent($formItem.querySelector("label.el-checkbox"), "click")
		await waitImmediate()
		expect($formItem.querySelector("label.el-checkbox span.el-checkbox__input").classList.contains("is-checked"), `select all checkbox className contain 'is-checked'`).to.true
		expect(vm.model.check, `select all faild:${JSON.stringify(vm.model)})`).to.deep.equal([0, 3, "选项2"])
		triggerEvent($formItem.querySelectorAll("label.el-checkbox")[1], "click")
		await waitImmediate()
		expect($formItem.querySelector("label.el-checkbox span.el-checkbox__input").classList.contains("is-indeterminate"), `select all checkbox className contain 'is-indeterminate'`).to.true
		expect(vm.model.check, `cancel select one of the option faild: ${JSON.stringify(vm.model)})`).to.deep.equal([3, "选项2"])
		triggerEvent($formItem.querySelector("label.el-checkbox"), "click")
		await waitImmediate()
		expect($formItem.querySelector("label.el-checkbox span.el-checkbox__input").classList.contains("is-checked"), `select all checkbox className not contain 'is-checked'`).to.false
		expect(vm.model.check, `cancel select all faild: ${JSON.stringify(vm.model)})`).to.deep.equal([])
		vm.form.check.notAll = true;
		await waitImmediate()
	})

}