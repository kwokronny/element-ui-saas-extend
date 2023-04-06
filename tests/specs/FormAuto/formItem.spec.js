import { expect } from "chai";
import FormAuto from "../../../packages/FormAuto"
import { createTest, createVue, triggerEvent, waitImmediate } from "../../util";

describe("FormAuto Props:data relative FormItem prop", () => {
	let vm;

	//#region 组件基础测试用例
	let formBasicData = {
		field1: {
			label: "field1",
			type: "text",
		},
		field2: {
			label: "field2",
			type: "text",
		},
	}

	it("label", async () => {
		vm = createTest(
			FormAuto,
			{
				data: {
					field1: {
						label: "field1",
						type: "text",
					},
				},
			},
			true
		);
		let label = vm.$el.querySelector(".el-form-item .el-form-item__label");
		expect(label.textContent.trim()).to.equal("field1");
	});

	it("labelWidth", async () => {
		vm = createTest(
			FormAuto,
			{
				data: {
					field1: {
						label: "field1",
						labelWidth: "100px",
						type: "text",
					},
				},
			},
			true
		);
		let label = vm.$el.querySelector(".el-form-item .el-form-item__label");
		expect(label.style.width).to.equal("100px");
	});

	it("labelHidden", async () => {
		vm = createTest(
			FormAuto,
			{
				data: {
					field1: {
						labelHidden: true,
						label: "field1",
						type: "text",
					},
					field2: {
						label: "field1",
						type: "text",
					},
				},
			},
			true
		);
		let label = vm.$el.querySelector(".el-form-item:first-child .el-form-item__label");
		expect(label).to.exist;
	});

	it("labelTooltip", async () => {
		vm = createTest(
			FormAuto,
			{
				data: {
					field1: {
						labelTooltip: "field help tip",
						label: "field1",
						type: "text",
					},
				},
			},
			true
		);
		let icon = vm.$el.querySelector(".el-form-item__label .el-tooltip.el-icon-question");
		expect(icon).to.exist;
		triggerEvent(icon, "mouseenter");
		await waitImmediate();
		expect(document.getElementById(icon.getAttribute("aria-describedby")).textContent).to.equal("field help tip");
		triggerEvent(icon, "mouseleave");
	});

	it("bindShow", async () => {
		vm = createVue(
			{
				template: `<el-form-auto :data="form" v-model="model" ref="form"></el-form-auto>`,
				data() {
					return {
						model: {},
						form: {
							switch: {
								label: "switch",
								type: "switch",
							},
							field: {
								bindShow: (model) => model.switch,
								label: "field1",
								type: "text",
							},
						},
					};
				},
			},
			true
		);
		let field = vm.$el.querySelector(".el-form-item[data-prop='field']");
		expect(field).to.equal(null)
		vm.model.switch = true;
		await waitImmediate()

		expect(vm.$el.querySelector(".el-form-item[data-prop='field']")).to.exist;
	});
	//#endregion

});
