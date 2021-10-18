const en = {
  numberrange: {
    min: "Min value",
    max: "Max value",
  },
  formauto: {
    pleaseInput: "Please input ",
    pleaseSelect: "Please select ",
    checkAll: "Check all",
    min: "Min ",
    max: "Max ",
    start: "Start ",
    end: "End ",
  },
  tablepage: {
    search: "Search",
    reset: "Reset",
    customColumns: "Custom Column",
    selection: ["", "items selected "],
    clear: "Clear",
    sort: "Sort",
    column: "Column",
    fixed: "Fixed",
    hide: "Hide",
    left: "Left",
    none: "None",
    right: "Right",
    cancel: "Cancel",
    save: "Save",
  },
};

if (typeof window !== "undefined" && window.Vue && window.ElementUISaaSExtend) {
  if (window.ElementUISaaSExtend.lang) {
    window.ElementUISaaSExtend.lang = {};
  }
  window.ElementUISaaSExtend.lang["en"] = en;
}

export default en;
