import { mount } from "@vue/test-utils";
import { expect } from "chai";
import NumberRange from "../../packages/NumberRange";
import { createTest, createVue, triggerEvent, wait, waitImmediate } from "../util";

describe("NumberRange", () => {
  it("props:disabled", (done) => {
    let vm = createTest(
      NumberRange,
      {
        disabled: true,
      },
      true
    );
    let inputs = vm.$el.querySelectorAll("input");
    inputs.forEach((input) => {
      expect(input.hasAttribute("readonly")).to.be.true;
    });
    done();
  });

  it("props:min", async () => {
    let vm = createVue({
      template: `<el-number-range v-model="range" :min="20"></el-number-range>`,
      data() {
        return {
          range: [],
        };
      },
    },true);
    let inputs = vm.$el.querySelectorAll("input");
    inputs[0].value = "10";
		await waitImmediate();
    triggerEvent(inputs[0], "change");
    expect(vm.range[0]).to.equal(20);
  });
});
