import { expect } from "chai";
import FormAuto from "../../../packages/FormAuto"
import { createTest, triggerEvent, waitImmediate } from "../../util";

describe("FormAuto Basic Props", () => {
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

	it("props:inline", (done) => {
		vm = createTest(
			FormAuto,
			{
				inline: true,
				data: formBasicData,
			},
			true
		);
		let form = vm.$el;
		expect(form.className.indexOf("el-form--inline") > -1).to.be.true;
		expect(form.querySelector("span.el-form-auto-row").tagName).to.equal("SPAN");
		expect(form.querySelectorAll("span.el-form-auto-row .el-col").length).to.equal(0);
		done();
	});

	it("props:label-hidden", (done) => {
		vm = createTest(
			FormAuto,
			{
				labelHidden: true,
				data: formBasicData,
			},
			true);
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
			expect(
				col.style.paddingRight == "8px" && col.style.paddingLeft == "8px"
			).to.be.true;
		});
		done();
	});
	//#endregion

});
