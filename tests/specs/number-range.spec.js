import { expect } from "chai";
import NumberRange from "../../packages/NumberRange";
import {
  createTest,
  createVue,
  triggerClick,
  triggerEvent,
  waitImmediate,
} from "../util";

describe("NumberRange", () => {
  it("props:size", async () => {
    let vm = createVue(
      {
        template: `<el-number-range :size="size"></el-number-range>`,
        data() {
          return {
            size: "small",
          };
        },
      },
      true
    );
    ["small", "medium", "mini"].forEach(async (size) => {
      vm.size = size;
      await waitImmediate();
      expect(vm.$el.classList.contains(`el-range-editor--${size}`)).to.true;
    });
  });

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
    let vm = createVue(
      {
        template: `<el-number-range v-model="range" :min="20"></el-number-range>`,
        data() {
          return {
            range: [],
          };
        },
      },
      true
    );
    let inputs = vm.$el.querySelectorAll("input");
    inputs[0].value = "10";
    triggerEvent(inputs[0], "input");
    triggerEvent(inputs[0], "change");
    inputs[1].value = "10";
    triggerEvent(inputs[1], "input");
    triggerEvent(inputs[1], "change");
    expect(vm.range[0]).to.equal(20);
    expect(vm.range[1]).to.equal(20);
  });

  it("props:max", async () => {
    let vm = createVue(
      {
        template: `<el-number-range v-model="range" :max="50"></el-number-range>`,
        data() {
          return {
            range: [],
          };
        },
      },
      true
    );
    let inputs = vm.$el.querySelectorAll("input");
    inputs[0].value = "60";
    triggerEvent(inputs[0], "input");
    triggerEvent(inputs[0], "change");
    inputs[1].value = "60";
    triggerEvent(inputs[1], "input");
    triggerEvent(inputs[1], "change");
    expect(vm.range[0]).to.equal(50);
    expect(vm.range[1]).to.equal(50);
  });

  it("props:min and max", async () => {
    let vm = createVue(
      {
        template: `<el-number-range v-model="range" :min="20" :max="50"></el-number-range>`,
        data() {
          return {
            range: [],
          };
        },
      },
      true
    );
    let inputs = vm.$el.querySelectorAll("input");
    inputs[0].value = "50";
    triggerEvent(inputs[0], "input");
    triggerEvent(inputs[0], "change");
    inputs[1].value = "10";
    triggerEvent(inputs[1], "input");
    triggerEvent(inputs[1], "change");
    expect(vm.range[0]).to.equal(50);
    expect(vm.range[1]).to.equal(50);
  });

  it("props:placeholder", async () => {
    let vm = createTest(
      NumberRange,
      {
        startPlaceholder: "最小金额",
        endPlaceholder: "最大金额",
        rangeSeparator: "至",
      },
      true
    );
    let inputs = vm.$el.querySelectorAll("input");
    expect(inputs[0].getAttribute("placeholder")).to.equal("最小金额");
    expect(inputs[1].getAttribute("placeholder")).to.equal("最大金额");
    expect(vm.$el.querySelector(".el-range-separator").textContent).to.equal(
      "至"
    );
  });

  it("all event", async () => {
    let spyChange = sinon.spy();
    let spyFocus = sinon.spy();
    let spyClear = sinon.spy();
    let spyBlur = sinon.spy();
    let vm = createVue(
      {
        template: `<el-card header="all event"><el-number-range ref="range" v-model="range" @clear="spyClear" @focus="spyFocus" @blur="spyBlur" @change="spyChange"></el-number-range></el-card>`,
        data() {
          return {
            range: [],
          };
        },
        methods: {
          spyChange,
          spyFocus,
          spyClear,
          spyBlur,
        },
      },
      true
    );
    // vm.$refs.range.$on("clear", spyClear)
    let inputs = vm.$el.querySelectorAll("input");
    inputs.forEach((input) => {
      input.focus();
      triggerEvent(input, "change");
      input.blur();
    });
    vm.range = [2, 4];
    await waitImmediate();
    expect(spyChange.calledTwice).to.be.equal(true, "change event");
    expect(spyFocus.calledTwice).to.be.equal(true, "focus event");
    expect(spyBlur.calledTwice).to.be.equal(true, "blur event");
    vm.$el.querySelector(".el-range__close-icon").click();
    await waitImmediate();
    expect(vm.range).to.be.equal(null, "clear event value");
    expect(spyClear.calledOnce).to.be.equal(true, "clear event");
  });

  it("el-form relative disabled", (done) => {
    let vm = createVue(
      {
        template: `<el-form disabled><el-form-item><el-number-range></el-number-range></el-form-item></el-form>`,
      },
      true
    );
    let inputs = vm.$el.querySelectorAll("input");
    inputs.forEach((input) => {
      expect(input.hasAttribute("readonly")).to.be.true;
    });
    done();
  });
});
