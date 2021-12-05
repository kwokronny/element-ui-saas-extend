import { expect } from "chai";
import { createVue, triggerEvent, destroyVM, waitImmediate, wait } from "../util";

describe("FormAuto.vue", () => {
  it(
    "create",
    () => {
      createVue({
        template: `
        <el-form-auto :data="form" v-model="model">
          <el-button type="primary" round @click="getList">筛选</el-button>
        </el-form-auto>
      `,
        data() {
          return {
            form: {
              id: {
                label: "id",
                type: "hidden",
              },
              switch: {
                col: 4,
                label: "开关",
                type: "switch",
                activeValue: 1,
                inactiveValue: 0,
                value: 1,
                required: true,
              },
              slider: {
                col: 8,
                label: "滑块",
                type: "slider",
                value: 10,
                required: true,
              },
              text: {
                col: 12,
                label: "文本框",
                labelTooltip: "labelTooltip属性可以在标签旁增加图标，提示字段含义",
                type: "text",
                required: true,
              },
              password: {
                col: 12,
                label: "密码框",
                type: "password",
                required: true,
                addRules: [
                  {
                    pattern: /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/,
                    message: "需要8位~16位以内，包含字母与数字的字符",
                  },
                ],
              },
              cascader: {
                col: 12,
                label: "级联框",
                type: "cascader",
                required: true,
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
                style: "width:100%",
              },
              select: {
                col: 12,
                label: "选择框",
                type: "select",
                required: true,
                style: "width:100%",
                options: defaultOption,
              },
              date: {
                col: 12,
                label: "日期",
                type: "week",
                required: true,
                style: "width:100%",
              },
              datetime: {
                col: 12,
                label: "日期时间",
                type: "datetime",
                required: true,
                style: "width:100%",
              },
              time: {
                col: 12,
                label: "时间",
                type: "time",
                required: true,
                style: "width:100%",
              },
              timeRange: {
                col: 12,
                label: "时间范围",
                type: "timerange",
                rangeName: ["startTime", "endTime"],
                required: true,
                style: "width:100%",
              },
              dateRange: {
                col: 12,
                label: "日期范围",
                type: "daterange",
                rangeName: ["startDate", "endDate"],
                required: true,
                style: "width:100%",
              },
              datetimeRange: {
                label: "日期时间范围",
                type: "datetimerange",
                rangeName: ["startDT", "endDT"],
                required: true,
                style: "width:500px",
              },
              radio: {
                label: "单选框",
                type: "radio",
                required: true,
                options: defaultOption,
              },
              radiobutton: {
                label: "单选按钮",
                type: "radiobutton",
                options: defaultOption,
                size: "small",
                required: true,
              },
              check: {
                label: "复选框",
                type: "check",
                required: true,
                options: defaultOption,
              },
              rate: {
                label: "评分",
                type: "rate",
                required: true,
              },
            },
            model: {},
          };
        },
        methods: {
          getList() {
            this.$msgbox({
              title: "表单返回数据",
              dangerouslyUseHTMLString: true,
              message: `<pre>${JSON.stringify(this.model, undefined, 3)}</pre>`,
            });
          },
        },
      });
    },
    true
  );
  // hidden is create
  vm.$el.querySelector();
  
  // switch
  // slider
  expect("");
});
