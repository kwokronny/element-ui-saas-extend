import TableButton from "./TableButton";
// @ts-ignore
TableButton.install = (Vue: VueConstructor, options: any = {}) => {
  Vue.prototype.$ELEMENT = Object.assign({}, Vue.prototype.$ELEMENT, options);
  Vue.component("ElTableButton", TableButton);
};

if (typeof window !== "undefined" && window.Vue) {
  // @ts-ignore
  TableButton.install(window.Vue);
}
export default TableButton;
