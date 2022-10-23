import { expect } from "chai";
import { cloneDeep } from "lodash";
import FormAuto from "../../packages/FormAuto";
import userData from "../mock/user.json";
import {
  createTest,
  recordValid,
  createVue,
  triggerEvent,
  wait,
  waitImmediate,
} from "../util";

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
    },
    switch: {
      label: "开关",
      type: "switch",
    },
    slider: {
      col: 12,
      label: "滑块",
      type: "slider",
    },
    text: {
      label: "文本框",
      type: "text",
    },
    password: {
      label: "密码框",
      type: "password",
    },
    cascader: {
      label: "级联框",
      type: "cascader",
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
    },
    selects: {
      label: "选择框",
      type: "select",
      options: defaultOption,
      multiple: true,
    },
    date: {
      label: "日期",
      type: "date",
    },
    datetime: {
      label: "日期时间",
      type: "datetime",
    },
    time: {
      label: "时间",
      type: "time",
    },
    timeRange: {
      label: "时间范围",
      type: "timerange",
      rangeName: ["startTime", "endTime"],
    },
    dateRange: {
      label: "日期范围",
      type: "daterange",
      suffixTime: true,
      rangeName: ["startDate", "endDate"],
    },
    datetimeRange: {
      label: "日期时间范围",
      type: "datetimerange",
      rangeName: ["startDT", "endDT"],
    },
    radio: {
      label: "单选框",
      type: "radio",
      options: defaultOption,
    },
    radiobutton: {
      label: "单选按钮",
      type: "radiobutton",
      options: defaultOption,
    },
    check: {
      label: "复选框",
      type: "check",
      options: defaultOption,
    },
    rate: {
      label: "评分",
      type: "rate",
    },
    textarea: {
      label: "备注",
      type: "textarea",
    },
  };

  //#region 组件基础测试用例
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
    expect(form.querySelector("span.el-form-auto-row").tagName).to.equal(
      "SPAN"
    );
    expect(
      form.querySelectorAll("span.el-form-auto-row .el-col").length
    ).to.equal(0);
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
      expect(
        col.style.paddingRight == "10px" && col.style.paddingLeft == "10px"
      ).to.be.true;
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
    let icon = vm.$el.querySelector(
      ".el-form-item__label .el-tooltip.el-icon-question"
    );
    expect(icon).to.exist;
    triggerEvent(icon, "mouseenter");
    await waitImmediate();
    expect(
      document.getElementById(icon.getAttribute("aria-describedby")).textContent
    ).to.equal("field help tip");
    triggerEvent(icon, "mouseleave");
  });
  //#endregion

  it("form default value and v-model valid", async () => {
    let form = cloneDeep(baseFormData);
    let defaultValues = {
      id: "1",
      switch: true,
      slider: 10,
      text: "text",
      password: "password",
      textarea: "textarea",
      date: "2018-01-01",
      datetime: "2018-01-01 00:00:00",
      time: "01:00:00",
      timeRange: ["00:00:00", "01:00:00"],
      startTime: "00:00:00",
      endTime: "01:00:00",
      dateRange: ["2018-01-01 00:00:00", "2018-01-02 23:59:59"],
      startDate: "2018-01-01 00:00:00",
      endDate: "2018-01-02 23:59:59",
      datetimeRange: ["2018-01-01 00:00:00", "2018-01-02 00:00:00"],
      startDT: "2018-01-01 00:00:00",
      endDT: "2018-01-02 00:00:00",
      radio: 3,
      radiobutton: 2,
      check: [2],
      rate: 3,
      select: 0,
      selects: [3, 2],
      cascader: [2, 6],
    };
    for (let key in form) {
      if (defaultValues[key] !== undefined) {
        form[key].value = defaultValues[key];
      }
    }
    vm = createVue(
      {
        template: `<el-card header="form default value and v-model valid"><el-form-auto :data="form" v-model="model" ref="form"></el-form-auto></el-card>`,
        data() {
          return {
            model: {},
            form,
          };
        },
      },
      true
    );
    let error = recordValid(vm.model, defaultValues);
    expect(error).to.equal(false, `default value setting ${error}`);
    let data = {
      datetime: "2019-02-01 10:00:00",
      dateRange: ["2019-01-01 08:00:00", "2019-01-02 08:00:00"],
      datetimeRange: ["2019-02-01 10:00:00", "2019-05-02 08:00:00"],
      time: "06:00:00",
      timeRange: ["00:00:00", "05:00:00"],
    };
    vm.model = Object.assign({}, data);
    (vm.model.password = "passwordchange"), await waitImmediate();
    error = recordValid(
      vm.model,
      Object.assign(defaultValues, data, {
        startTime: "00:00:00",
        endTime: "05:00:00",
        startDate: "2019-01-01 08:00:00",
        endDate: "2019-01-02 08:00:00",
        startDT: "2019-02-01 10:00:00",
        endDT: "2019-05-02 08:00:00",
        password: "passwordchange",
      })
    );
    expect(error).to.equal(false, `v-model setting ${error}`);
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
    expect(checkAll.indeterminate).to.equal(true, "check全选部分选中状态true");
    vm.model.check = [0, 1, 2];
    await waitImmediate();
    expect(checkAll.indeterminate).to.equal(
      false,
      "check全选部分选中状态false"
    );
    expect(checkAll.value).to.be.true;
    // console.log(vm.$refs.form.$children[0].$children[0].$children[1]);
    // expect(vm.$refs.form.$children[0].$children[0].$children[1].name).to.equal("el-checkbox");
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
    expect(fields.check.options).to.have.deep.members([
      {
        label: "option0",
        value: "0",
        disabled: false,
        icon: false,
        children: [],
        props: {},
      },
      {
        label: "option1",
        value: "1",
        disabled: false,
        icon: false,
        children: [],
        props: {},
      },
      {
        label: "option2",
        value: "2",
        disabled: false,
        icon: false,
        children: [],
        props: {},
      },
    ]);
    expect(fields.select.options).to.have.deep.members([
      {
        label: "option0",
        value: 0,
        disabled: true,
        icon: false,
        children: [],
        props: {},
      },
      {
        label: "option1",
        value: 1,
        disabled: false,
        icon: false,
        children: [],
        props: {},
      },
      {
        label: "option2",
        value: 2,
        disabled: false,
        icon: false,
        children: [],
        props: {},
      },
    ]);
    expect(fields.radio.options).to.have.deep.members([
      {
        label: "option1",
        value: "option1",
        disabled: false,
        icon: false,
        children: [],
        props: {},
      },
      {
        label: "option2",
        value: "option2",
        disabled: false,
        icon: false,
        children: [],
        props: {},
      },
      {
        label: "option3",
        value: "option3",
        disabled: false,
        icon: false,
        children: [],
        props: {},
      },
    ]);
    expect(fields.asyncSelect.options).to.have.deep.members([
      {
        label: "option0",
        value: "0",
        disabled: false,
        icon: false,
        children: [],
        props: {},
      },
      {
        label: "option1",
        value: "1",
        disabled: false,
        icon: false,
        children: [],
        props: {},
      },
      {
        label: "option2",
        value: "2",
        disabled: false,
        icon: false,
        children: [],
        props: {},
      },
    ]);
  });

  it("date valueFormat and rangeName", async () => {
    vm = createVue(
      {
        template: `<el-form-auto :data="form" ref="EditForm" v-model="model" label-width="90px">{{ model }}</el-form-auto>`,
        data() {
          return {
            model: {},
            form: {
              date: {
                label: "日期",
                type: "date",
                valueFormat: "unix",
              },
              daterange: {
                label: "日期范围",
                type: "daterange",
                rangeName: ["startDate", "endDate"],
                valueFormat: "unix",
              },
              dates: {
                label: "多个日期",
                type: "dates",
                valueFormat: "unix",
              },
              time: {
                label: "时间",
                type: "time",
                valueFormat: "unix",
              },
              slider: {
                label: "范围",
                type: "slider",
                range: true,
                rangeName: ["startNum", "endNum"],
              },
            },
          };
        },
      },
      true
    );
  });

  //#region 远程搜索相关
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
                  return userData.reduce((perv, item) => {
                    if (item.username.indexOf(query) > -1) {
                      perv.push({
                        label: item.username,
                        value: item.id * page,
                      });
                    }
                    return perv;
                  }, []);
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
    expect(vm.$refs.form.fields.remoteSelect.options[0].label).to.equal(
      "Antonette"
    );
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
                  return userData.reduce((perv, item) => {
                    if (item.username.indexOf(query) > -1) {
                      perv.push({
                        label: item.username,
                        value: item.id * page,
                      });
                    }
                    return perv;
                  }, []);
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
    let $formItem = vm.$el.querySelector(
      ".el-form-item[data-prop=remoteSelect]"
    );
    let dropDown = $formItem.querySelector(
      ".el-select-dropdown .el-select-dropdown__wrap"
    );
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
                options: async (query) => {
                  return userData.reduce((perv, item) => {
                    if (item.username.indexOf(query) > -1) {
                      perv.push({
                        label: item.username,
                        value: item.id,
                      });
                    }
                    return perv;
                  }, []);
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
    expect(vm.$refs.form.fields.remoteSelect.options[0].label).to.equal(
      "Antonette"
    );
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
                  return userData.reduce((perv, item) => {
                    if (item.username.indexOf(query) > -1) {
                      perv.push({
                        label: item.username,
                        value: item.id,
                      });
                    }
                    return perv;
                  }, []);
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
    await wait(250);
    await waitImmediate();
    let select = vm.$refs.form.$children[0].$children[0].$children[1];
    select.handleQueryChange("");
    await wait(0);
    select.handleQueryChange("Antonette");
    select.$el.click();
    await wait(250);
    expect(vm.$refs.form.fields.remoteSelect.options[0].label).to.equal(
      "Antonette"
    );
    select.hoverIndex = 0;
    select.selectOption(0);
    select.inputHovering = true;
    await wait(100);
    vm.$el
      .querySelector(
        ".el-form-item[data-prop=remoteSelect] .el-input__icon.el-icon-circle-close"
      )
      .click();
    await wait(250);
    expect(vm.clearPass).to.be.true;
    expect(vm.$refs.form.fields.remoteSelect.options.length).to.equal(10);
  });
  //#endregion

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
    vm.model = {
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
    vm.$refs.form.reset();
    await waitImmediate();
    let error = recordValid(vm.model, {
      id: "",
      switch: false,
      slider: 0,
      text: "",
      password: "",
      textarea: "",
      date: "",
      datetime: "",
      dateRange: ["", ""],
      datetimeRange: ["", ""],
      time: "",
      timeRange: ["", ""],
      radio: "",
      radiobutton: "",
      check: [],
      rate: 0,
      select: "",
      selects: [],
      cascader: [],
    });
    expect(error).to.equal(false);
  });

  it("method: validate and validateField", async () => {
    let form = Object.assign({}, baseFormData);
    for (let key in form) {
      form[key].required = true;
      delete form[key].value;
    }
    form["password"].addRules = [
      {
        pattern: /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/,
        message: "需要8位~16位以内，包含字母与数字的字符",
      },
    ];
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
    vm.model.password = "123456";
    vm.$refs.Form.validateField("password");
    await waitImmediate();
    expect(
      vm.$el.querySelector(".el-form-item__error").textContent.trim()
    ).to.equal("需要8位~16位以内，包含字母与数字的字符");
    vm.$refs.Form.reset();
    await waitImmediate();
    try {
      vm.$refs.Form.validate((valid) => {
        expect(valid).to.be.false;
      });
      await vm.$refs.Form.validate();
      expect(true).to.be.false;
    } catch (e) {
      expect(vm.$el.querySelectorAll(".el-form-item__error").length).to.equal(
        15
      );
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
    expect(vm.$el.querySelector(".default-slot").parentNode.className).to.equal(
      "el-form-item__content"
    );
    expect(
      vm.$el
        .querySelector(".prepend-slot")
        .nextElementSibling.classList.contains("el-form-auto-row")
    ).to.be.true;
    expect(
      vm.$el
        .querySelector(".append-slot")
        .previousElementSibling.classList.contains("el-form-auto-row")
    ).to.be.true;
    expect(
      vm.$el.querySelector(".el-form-item[data-prop=input] span.input-slot")
    ).to.exist;
    expect(
      vm.$el.querySelector(".el-form-item[data-prop=input] span.input-slot")
        .textContent
    ).to.equal("input_test_text");
  });
});
