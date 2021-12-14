import { expect } from "chai";
import FormAuto from "../../packages/FormAuto";
import { createTest } from "../util";

describe("FormAuto", () => {
  it("props:label hidden", (done) => {
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
          field2: {
            labelHidden: false,
            label: "field2",
            type: "text",
          },
        },
      },
      true
    );
    let hidden = vm.$el.querySelectorAll(".el-form-item__label");
    expect(hidden.length == 0).to.be.true;
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
  // hidden is create
});
