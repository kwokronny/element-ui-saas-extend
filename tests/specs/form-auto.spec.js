import { expect } from "chai";
import FormAuto from "../../packages/FormAuto";
import userData from "../mock/user.json";
import { createTest, createVue, triggerEvent, wait, waitImmediate } from "../util";

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
      col: 12,
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
      value: [2, 6],
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

  it("form default value and v-model valid", async () => {
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
    expect(vm.model).to.deep.equal(
      {
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
        cascader: [2, 6],
      },
      "field value is valid"
    );
    let data = {
      id: 45,
      switch: false,
      slider: 23,
      text: "textchange",
      password: "passwordchange",
      textarea: "textareachange",
      date: null,
      datetime: "2019-02-01 10:00:00",
      dateRange: ["2019-01-01", "2019-01-02"],
      datetimeRange: ["2019-02-01 10:00:00", "2019-05-02 08:00:00"],
      time: "06:00:00",
      timeRange: ["00:00:00", "05:00:00"],
      radio: 2,
      radiobutton: 0,
      check: [3],
      rate: 3,
      select: 0,
      selects: [0, 2],
      cascader: [1, 4, 5],
    };
    vm.model = Object.assign({}, data);
    await waitImmediate();
    expect(vm.$refs.form.model).to.deep.equal(Object.assign({ startTime: "00:00:00", endTime: "05:00:00", startDate: "2019-01-01", endDate: "2019-01-02", startDT: "2019-02-01 10:00:00", endDT: "2019-05-02 08:00:00" }, data), "model value is valid");
  });

  it("options transfer", async () => {
    let objectOptions = {
      0: "option0",
      1: "option1",
      2: "option2",
    };
    vm = createVue(
      {
        template: `<el-form-auto :data="form" inline v-model="model" ref="form"></el-form-auto>`,
        data() {
          return {
            model: {},
            form: {
              check: {
                label: "check",
                type: "check",
                options: objectOptions,
              },
              select: {
                label: "select",
                type: "select",
                options: [
                  { label: "option0", value: 0, disabled: true },
                  { label: "option1", value: 1 },
                  { label: "option2", value: 2 },
                ],
              },
              radio: {
                label: "radio",
                type: "radio",
                options: ["option1", "option2", "option3"],
              },
              asyncSelect: {
                label: "asyncSelect",
                type: "select",
                options: async () => {
                  return objectOptions;
                },
              },
            },
          };
        },
      },
      true
    );
    let fields = vm.$refs.form.fields;
    await waitImmediate();
    expect(Array.isArray(fields.check.options)).to.be.true;
    expect(fields.check.options.length).to.equal(3);
    expect(fields.check.options.map((i) => i.value)).to.deep.equal("0,1,2".split(","));
    expect(fields.select.options.length).to.equal(3);
    expect(fields.select.options.map((i) => i.value)).to.deep.equal([0, 1, 2]);
    expect(fields.select.options[0].disabled).to.deep.true;
    expect(fields.radio.options.map((i) => i.value)).to.deep.equal(["option1", "option2", "option3"]);
    expect(fields.asyncSelect.options.length).to.equal(3);
    expect(fields.asyncSelect.options.map((i) => i.value)).to.deep.equal("0,1,2".split(","));
  });

  it("check reshow", async () => {
    vm = createVue(
      {
        template: `<el-form-auto :data="form" inline v-model="model" ref="form"></el-form-auto>`,
        data() {
          return {
            model: { check: [0, 1] },
            form: {
              check: {
                // notAll: true,
                label: "check",
                type: "check",
                options: [
                  { label: "option0", value: 0 },
                  { label: "option1", value: 1 },
                  { label: "option2", value: 2 },
                ],
              },
            },
          };
        },
      },
      true
    );
    let checkAll = vm.$refs.form.$children[0].$children[0].$children[1];
    expect(checkAll.indeterminate).to.be.true;
    vm.model.check = [0, 1, 2];
    await waitImmediate();
    expect(checkAll.indeterminate).to.be.false;
    expect(checkAll.value).to.be.true;
    // console.log(vm.$refs.form.$children[0].$children[0].$children[1]);
    // expect(vm.$refs.form.$children[0].$children[0].$children[1].name).to.equal("el-checkbox");
  });

  it("select remote search", async () => {
    vm = createVue(
      {
        template: `<el-form-auto :data="form" inline v-model="model" ref="form"></el-form-auto>`,
        data() {
          return {
            model: {},
            form: {
              remoteSelect: {
                label: "remoteSelect",
                type: "select",
                remote: true,
                options: async (query, page) => {
                  return userData
                    .filter((item) => item.username.indexOf(query) > -1)
                    .map((item) => {
                      return {
                        label: item.username,
                        value: item.id * page,
                      };
                    });
                },
              },
            },
          };
        },
      },
      true
    );
    await waitImmediate();
    expect(vm.$refs.form.fields.remoteSelect.options.length).to.equal(10);
    let select = vm.$refs.form.$children[0].$children[0].$children[1];
    select.handleQueryChange("");
    await wait(0);
    select.handleQueryChange("Antonette");
    await wait(350);
    expect(vm.$refs.form.fields.remoteSelect.options[0].label).to.equal("Antonette");
  });

  it("select remote scroll load", async () => {
    vm = createVue(
      {
        template: `<el-form-auto :data="form" inline v-model="model" ref="form"></el-form-auto>`,
        data() {
          return {
            model: {},
            form: {
              remoteSelect: {
                label: "remoteScrollSelect",
                type: "select",
                loadScroll: true,
                remote: true,
                options: async (query, page) => {
                  return userData
                    .filter((item) => item.username.indexOf(query) > -1)
                    .map((item) => {
                      return {
                        label: item.username,
                        value: item.id * page,
                      };
                    });
                },
              },
            },
          };
        },
      },
      true
    );
    await waitImmediate();
    expect(vm.$refs.form.fields.remoteSelect.options.length).to.equal(10);
    let $formItem = vm.$el.querySelector(".el-form-item[data-prop=remoteSelect]");
    let dropDown = $formItem.querySelector(".el-select-dropdown .el-select-dropdown__wrap");
    $formItem.querySelector("input").click();
    await waitImmediate();
    dropDown.scrollTop = dropDown.clientHeight;
    triggerEvent(dropDown, "scroll");
    await wait(550);
    expect(vm.$refs.form.fields.remoteSelect.options.length).to.equal(20);
  });

  it("select remote reopen refresh options when no options data", async () => {
    vm = createVue(
      {
        template: `<el-form-auto :data="form" inline v-model="model" ref="form"></el-form-auto>`,
        data() {
          return {
            model: {},
            visiblePass: false,
            form: {
              remoteSelect: {
                label: "remoteSelectReOpen",
                type: "select",
                remote: true,
                options: async (query, page) => {
                  return userData
                    .filter((item) => item.username.indexOf(query) > -1)
                    .map((item) => {
                      return {
                        label: item.username,
                        value: item.id * page,
                      };
                    });
                },
                on: {
                  ["visible-change"]: (visible) => {
                    this.visiblePass = true;
                  },
                },
              },
            },
          };
        },
      },
      true
    );
    await waitImmediate();
    let select = vm.$refs.form.$children[0].$children[0].$children[1];
    select.handleQueryChange("");
    await wait(0);
    select.handleQueryChange("Antonette");
    await wait(250);
    expect(vm.$refs.form.fields.remoteSelect.options[0].label).to.equal("Antonette");
    select.$el.click();
    await wait(250);
    expect(vm.visiblePass).to.be.true;
    expect(vm.$refs.form.fields.remoteSelect.options.length).to.equal(10);
  });

  it("select remote clear refresh options", async () => {
    vm = createVue(
      {
        template: `<el-form-auto :data="form" inline v-model="model" ref="form"></el-form-auto>`,
        data() {
          return {
            model: {},
            clearPass: false,
            form: {
              remoteSelect: {
                label: "remoteSelectClear",
                type: "select",
                remote: true,
                clearable: true,
                options: async (query) => {
                  return userData.reduce((res,item)=>{
                    if(item.username.indexOf(query)>-1){
                      res.push({
                        label: item.username,
                        value: item.id,
                      });
                    }
                    return res;
                  },[])
                },
                on: {
                  clear: () => {
                    // 确认清空事件与重刷options都有效
                    this.clearPass = true;
                  },
                },
              },
            },
          };
        },
      },
      true
    );
    await waitImmediate();
    let select = vm.$refs.form.$children[0].$children[0].$children[1];
    select.handleQueryChange("");
    await wait(0);
    select.handleQueryChange("Antonette");
    select.$el.click();
    await wait(250);
    expect(vm.$refs.form.fields.remoteSelect.options[0].label).to.equal("Antonette");
    select.hoverIndex = 0;
    select.selectOption(0);
    select.inputHovering = true;
    await wait(100);
    vm.$el.querySelector(".el-form-item[data-prop=remoteSelect] .el-input__icon.el-icon-circle-close").click();
    await wait(250);
    expect(vm.clearPass).to.be.true;
    expect(vm.$refs.form.fields.remoteSelect.options.length).to.equal(10);
  });

  it("method: reset", async () => {
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
    let data = {
      id: 45,
      switch: false,
      slider: 23,
      text: "textchange",
      password: "passwordchange",
      textarea: "textareachange",
      date: null,
      datetime: "2019-02-01 10:00:00",
      dateRange: ["2019-01-01", "2019-01-02"],
      datetimeRange: ["2019-02-01 10:00:00", "2019-05-02 08:00:00"],
      time: "06:00:00",
      timeRange: ["00:00:00", "05:00:00"],
      radio: 2,
      radiobutton: 0,
      check: [3],
      rate: 3,
      select: 0,
      selects: [0, 2],
      cascader: [1, 4, 5],
    };
    vm.model = Object.assign({}, data);
    vm.$children[0].reset();
    await waitImmediate();
    expect(vm.model).to.deep.equal(
      {
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
        cascader: [2, 6],
      },
      "field value is valid"
    );
  });

  it("method: validate and validateField", async () => {
    let form = Object.assign({}, baseFormData);
    for (let key in form) {
      form[key].required = true;
    }
    vm = createVue(
      {
        template: `<el-form-auto :data="form" v-model="model" ref="Form"></el-form-auto>`,
        data() {
          return {
            model: {},
            form,
          };
        },
      },
      true
    );
    let data = {
      id: 45,
      slider: 0,
      switch: false,
      text: "",
      password: "",
      textarea: "",
      date: null,
      datetime: "",
      dateRange: [],
      datetimeRange: [],
      time: "",
      timeRange: ["00:00:00", "05:00:00"],
      check: [],
      rate: 0,
      select: 0,
      selects: [],
      cascader: [],
    };
    vm.$refs.Form.validate((valid) => {
      expect(valid).to.be.true;
    });
    vm.model.password = "";
    vm.$refs.Form.validateField("password");
    await waitImmediate();
    expect(vm.$el.querySelectorAll(".el-form-item__error").length).to.equal(1);
    vm.model = Object.assign({}, data);
    await waitImmediate();
    try {
      await vm.$refs.Form.validate();
      expect(true).to.be.false;
    } catch (e) {
      // console.log(vm.$el.querySelectorAll(".el-form-item__error"))
      expect(vm.$el.querySelectorAll(".el-form-item__error").length).to.equal(11);
    }
  });

  it("slot", async () => {
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
              input: {
                label: "input",
                type: "text",
                value: "test",
                slot: true,
              },
            },
          };
        },
      },
      true
    );
    expect(vm.$el.querySelector(".default-slot").parentNode.className).to.equal("el-form-item__content");
    expect(vm.$el.querySelector(".prepend-slot").nextElementSibling.classList.contains("el-form-auto-row")).to.be.true;
    expect(vm.$el.querySelector(".append-slot").previousElementSibling.classList.contains("el-form-auto-row")).to.be.true;
    expect(vm.$el.querySelector(".el-form-item[data-prop=input] span.input-slot")).to.exist;
    expect(vm.$el.querySelector(".el-form-item[data-prop=input] span.input-slot").textContent).to.equal("input_test_text");
  });
});

// TODO: 编写 全选 复选框
