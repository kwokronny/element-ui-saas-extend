import { expect } from "chai";
import FormAuto from "../../packages/FormAuto";
import Vue from "vue";
import { createTest, createVue, triggerClick, triggerEvent, triggerKeyDown, wait, waitImmediate } from "../util";

describe("FormAuto", () => {
  let vm;
  let defaultOption = [
    {
      label: "选项1",
      value: 0,
    },
    {
      label: "带图标选项3",
      icon: "el-icon-help",
      value: 3,
    },
    {
      label: "选项禁用2",
      value: 2,
      disabled: true,
    },
    "选项2",
  ];
  let baseFormData = {
    id: {
      label: "id",
      type: "hidden",
      value: "1",
    },
    switch: {
      label: "开关",
      type: "switch",
      value: true,
    },
    slider: {
      label: "滑块",
      type: "slider",
      value: 10,
    },
    text: {
      label: "文本框",
      type: "text",
      value: "text",
    },
    password: {
      label: "密码框",
      type: "password",
      value: "password",
    },
    cascader: {
      label: "级联框",
      type: "cascader",
      value: [1, 2],
      options: [
        {
          label: "节点1",
          value: 1,
          children: [
            {
              label: "节点4",
              value: 4,
              children: [{ label: "节点5", value: 5 }],
            },
          ],
        },
        {
          label: "节点2",
          value: 2,
          children: [{ label: "节点6", value: 6 }],
        },
        { label: "节点3", value: 3 },
      ],
    },
    select: {
      label: "选择框",
      type: "select",
      options: defaultOption,
      value: 0,
    },
    selects: {
      label: "选择框",
      type: "select",
      options: defaultOption,
      multiple: true,
      value: [3, 2],
    },
    date: {
      label: "日期",
      type: "date",
      value: "2018-01-01",
    },
    datetime: {
      label: "日期时间",
      type: "datetime",
      value: "2018-01-01 00:00:00",
    },
    time: {
      label: "时间",
      type: "time",
      value: "00:00:00",
    },
    timeRange: {
      label: "时间范围",
      type: "timerange",
      rangeName: ["startTime", "endTime"],
      value: ["00:00:00", "01:00:00"],
    },
    dateRange: {
      label: "日期范围",
      type: "daterange",
      rangeName: ["startDate", "endDate"],
      value: ["2018-01-01", "2018-01-02"],
    },
    datetimeRange: {
      label: "日期时间范围",
      type: "datetimerange",
      rangeName: ["startDT", "endDT"],
      value: ["2018-01-01 00:00:00", "2018-01-02 00:00:00"],
    },
    radio: {
      label: "单选框",
      type: "radio",
      options: defaultOption,
      value: 3,
    },
    radiobutton: {
      label: "单选按钮",
      type: "radiobutton",
      options: defaultOption,
      value: 2,
    },
    check: {
      label: "复选框",
      type: "check",
      options: defaultOption,
      value: [2],
    },
    rate: {
      label: "评分",
      type: "rate",
      value: 3,
    },
    textarea: {
      label: "备注",
      type: "textarea",
      showWordLimit: true,
      value: "textarea",
    },
  };

  it("props:inline", (done) => {
    vm = createTest(
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
    vm = createTest(
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
    vm = createTest(
      FormAuto,
      {
        labelWidth: "100px",
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
    vm = createTest(FormAuto, {
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
      expect(col.classList.contains("el-col-12")).to.be.true;
      expect(col.style.paddingRight == "10px" && col.style.paddingLeft == "10px").to.be.true;
    });
    done();
  });

  it("props:data:labelTooltip", async () => {
    vm = createTest(
      FormAuto,
      {
        gutter: 20,
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

  it("props:model", async () => {
    vm = createVue(
      {
        template: `<el-form-auto :data="form" v-model="model" ref="form"></el-form-auto>`,
        data() {
          return {
            model: {},
            form: baseFormData,
          };
        },
      },
      true
    );
    expect(vm.model).to.deep.equal({
      id: "1",
      switch: true,
      slider: 10,
      text: "text",
      password: "password",
      textarea: "textarea",
      date: "2018-01-01",
      datetime: "2018-01-01 00:00:00",
      dateRange: ["2018-01-01", "2018-01-02"],
      startDate: "2018-01-01",
      endDate: "2018-01-02",
      datetimeRange: ["2018-01-01 00:00:00", "2018-01-02 00:00:00"],
      startDT: "2018-01-01 00:00:00",
      endDT: "2018-01-02 00:00:00",
      time: "00:00:00",
      timeRange: ["00:00:00", "01:00:00"],
      startTime: "00:00:00",
      endTime: "01:00:00",
      radio: 3,
      radiobutton: 2,
      check: [2],
      rate: 3,
      select: 0,
      selects: [3, 2],
      cascader: [1, 2],
    });
    // expect(vm.model.id).to.equal("1");
    // expect(vm.model.switch).to.true;
    // expect(vm.model.slider).to.equal(10);
    // expect(vm.model.text).to.equal("text");
    // expect(vm.model.password).to.equal("password");
    // expect(vm.model.textarea).to.equal("textarea");
    // expect(vm.model.date).to.equal("2018-01-01");
    // expect(vm.model.datetime).to.equal("2018-01-01 00:00:00");
    // expect(vm.model.dateRange).to.equal(["2018-01-01", "2018-01-02"]);
    // expect(vm.model.datetimeRange).to.equal(["2018-01-01 00:00:00", "2018-01-02 00:00:00"]);
    // expect(vm.model.time).to.equal("00:00:00");
    // expect(vm.model.timeRange).to.equal(["00:00:00", "01:00:00"]);
    // expect(vm.model.check).to.equal([2]);
    // expect(vm.model.radio).to.equal(3);
    // expect(vm.model.radiobutton).to.equal(2);
    // expect(vm.model.rate).to.equal(3);
    // expect(vm.model.select).to.equal(0);
    // expect(vm.model.selects).to.equal([3, 2]);
    // expect(vm.model.cascader).to.equal([1, 2]);
    // vm.model.switch = false;
    // await waitImmediate();
    // expect(vm.$el.querySelector(".el-switch").classList.contains("is-checked")).to.equal(false);
    // vm.model.slider = 5;
  });
});
