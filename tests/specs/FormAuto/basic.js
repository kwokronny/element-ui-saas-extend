import { expect } from "chai";
import FormAuto from "../../../packages/FormAuto"
import { createTest, createVue, waitImmediate } from "../../util";
import { Random } from "mockjs";

export default () => {
	let vm;

	let formBasicData = {
		field1: { label: "field1", type: "text", },
		field2: { label: "field2", type: "text", },
	}

	it("props:inline", (done) => {
		vm = createTest(FormAuto, { inline: true, data: formBasicData, }, true);
		let form = vm.$el;
		expect(form.className.indexOf("el-form--inline") > -1).to.be.true;
		expect(form.querySelector("span.el-form-auto-row").tagName).to.equal("SPAN");
		expect(form.querySelectorAll("span.el-form-auto-row .el-col").length).to.equal(0);
		done();
	});

	it("props:over-collapse", (done) => {
		vm = createTest(FormAuto, { inline: true, overCollapse: 1, data: formBasicData, }, true);
		let form = vm.$el;
		expect(form.querySelectorAll("span.el-form-auto-row .el-form-auto-col").length).to.equal(1);
		done();
	});

	it("props:label-hidden", (done) => {
		vm = createTest(FormAuto, { labelHidden: true, data: formBasicData, }, true);
		let formItems = vm.$el.querySelectorAll(".el-form-item");
		formItems.forEach((item) => {
			expect(item.querySelector("el-form-item__label")).to.be.null;
		});
		done();
	});

	it("props:gutter", (done) => {
		let data = Object.assign(formBasicData);
		Object.keys(data).forEach((key) => data[key].col = 12)
		vm = createTest(FormAuto, {
			gutter: 16,
			data,
		});
		let row = vm.$el.querySelector(".el-form-auto-row.el-row.el-row--flex");
		let cols = row.querySelectorAll(".el-col");
		cols.forEach((col) => {
			expect(col.classList.contains("el-col-12")).to.be.true;
			expect(col.style.paddingRight == "8px" && col.style.paddingLeft == "8px").to.be.true;
		});
		done();
	});

	it("slot", async () => {
		let rtext = Random.cword()
		vm = createVue(
			{
				template: `<el-form-auto :data="form" v-model="model" ref="form">
					<span class="input-slot" slot="input" slot-scope="{item,model,name}">{{name}}_{{model[name]}}_{{item.type}}</span>
					<span class="default-slot"></span>
					<span slot="prepend" class="prepend-slot"></span>
					<span slot="append" class="append-slot"></span>
				</el-form-auto>`,
				data() {
					return {
						model: {},
						form: {
							input: { label: "input", type: "text", value: rtext, slot: true, },
						},
					};
				},
			},
			true
		);
		let $formRow = vm.$el.querySelector(".el-form-auto-row")
		expect($formRow.previousElementSibling.classList.contains("prepend-slot")).to.true;
		expect($formRow.nextElementSibling.classList.contains("append-slot")).to.true;
		expect(vm.$el.querySelector(".el-form-auto:last-child span.default-slot")).to.exist;
		let $slot = vm.$el.querySelector(".el-form-item[data-prop=input] span.input-slot")
		expect($slot).to.exist;
		expect($slot.textContent.trim()).to.equal(`input_${rtext}_text`);
	});

	// refreshOptions
// 
}
