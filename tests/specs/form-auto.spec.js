import { expect } from "chai";
import FormAuto from "../../packages/FormAuto";
import { createTest, createVue } from "../util";

describe("FormAuto", () => {
  it("props: inline", (done) => {
    let vm = createTest(
      FormAuto,
      {
        inline: true,
        data: {
          field1: {
            label: "field1",
            type: "text",
          },
          field2: {
            label: "field2",
            type: "text",
          },
        },
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
    let vm = createTest(
      FormAuto,
      {
        labelHidden: true,
        data: {
          field1: {
            label: "field1",
            type: "text",
          },
          field2: {
            label: "field2",
            type: "text",
          },
          field3: {
            labelHidden: false,
            label: "field3",
            type: "text",
          },
        },
      },
      true
    );
    let formItems = vm.$el.querySelectorAll(".el-form-item");
    formItems.forEach((item) => {
      expect(item.querySelector("el-form-item__label")).to.be.null;
    });
    done();
  });

  it("props:label-width", (done) => {
    let vm = createTest(
      FormAuto,
      {
        labelWidth: "100px",
        data: {
          field1: {
            label: "field1",
            type: "text",
          },
          field2: {
            label: "field3",
            type: "text",
          },
          field3: {
            label: "field3",
            labelWidth: "120px",
            type: "text",
          },
        },
      },
      true
    );
    let label = vm.$el.querySelectorAll(".el-form-item__label");
    expect(label[0].style.width).to.equal("100px");
    expect(label[1].style.width).to.equal("100px");
    expect(label[2].style.width).to.equal("120px");
    done();
  });

  it("props:gutter", (done) => {
    let vm = createTest(FormAuto, {
      gutter: 20,
      data: {
        field1: {
          col: 12,
          label: "field1",
          type: "text",
        },
        field2: {
          col: 12,
          label: "field2",
          type: "text",
        },
      },
    });
    let row = vm.$el.querySelector(".el-form-auto-row.el-row.el-row--flex");
    let cols = row.querySelectorAll(".el-col");
    cols.forEach((col) => {
      expect(col.style.paddingRight == "10px" && col.style.paddingLeft == "10px").to.be.true;
    });
    done();
  });


});
