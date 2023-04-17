import { expect } from "chai";
import { createTest, createVue, triggerEvent, wait, waitImmediate } from "../util";
import pageData from "../mock/page.json";

const toArray = function(obj) {
  return [].slice.call(obj);
};

describe("TablePage", () => {
  describe("table render", () => {
    let vm = createVue(
      {
        template: `<el-table-page :columns="columns" :request="getList"></el-table-page>`,
        data() {
          return {
            columns: [
              {
                label: "姓名",
                prop: "name",
              },
              {
                label: "邮箱",
                prop: "email",
                showOverflowTooltip: true,
              },
              {
                label: "积分",
                prop: "score",
                filters: [["numeral", "0,0"]],
              },
              {
                label: "余额",
                prop: "balance",
                filters: [["numeral", "0,0.00"], "yuan"],
              },
              {
                label: "注册日期",
                prop: "date",
                filters: [["dayjs", "YYYY-MM-DD"]],
              },
              {
                label: "状态",
                prop: "status",
                enumTag: "span",
                enum: { 1: "正常", 2: "失效" },
              },
              {
                label: "标签",
                prop: "tagArr",
                enumTag: "el-tag",
                enum: [
                  { label: "聪明", value: "1", type: "primary" },
                  { label: "可爱", value: "2", type: "success" },
                  { label: "勇敢", value: "3", type: "warning" },
                ],
              },
            ],
          };
        },
        filters: {
          yuan(value) {
            return `¥ ${value}`;
          },
        },
        methods: {
          getList(page = 1, search, pageSize) {
            let baseId = (page - 1) * pageSize;
            return {
              page,
              total: 100,
              pageSize,
              record: pageData.filter(function(item, index) {
                return index > baseId && index < baseId + pageSize;
              }),
            };
          },
        },
      },
      true
    );

    it("header", (done) => {
      const ths = toArray(vm.$el.querySelectorAll("thead th"));
      expect(ths.map((node) => node.textContent.trim()).filter((o) => o)).to.eql(["姓名", "邮箱", "积分", "余额", "注册日期", "状态", "标签"]);
      done();
    });

    // it("row length", () => {
    //   expect(vm.$el.querySelectorAll(".el-table__body-wrapper tbody tr")).to.length(15);
    // });
  });
});
