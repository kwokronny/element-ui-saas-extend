const zhCN = {
  numberrange: {
    min: "最大值",
    max: "最小值",
  },
  formauto: {
    pleaseInput: "请输入",
    pleaseSelect: "请选择",
    checkAll: "全选",
    min: "最小",
    max: "最大",
    start: "起始",
    end: "结束",
  },
  tablepage: {
    search: "搜索",
    reset: "重置",
    customColumns: "自定义列",
    selection: ["已选择", "条"],
    clear: "清空",
    sort: "排序",
    column: "表项",
    fixed: "固定",
    hide: "隐藏",
    left: "左",
    none: "否",
    right: "右",
    cancel: "取消",
    save: "保存",
  },
};

if (typeof window !== "undefined" && window.Vue && window.ElementUISaaSExtend) {
  if (window.ElementUISaaSExtend.lang) {
    window.ElementUISaaSExtend.lang = {};
  }
  window.ElementUISaaSExtend.lang["zhCN"] = zhCN;
}

export default zhCN;
