import TablePage from "./TablePage.vue";
// @ts-ignore
TablePage.install = (Vue: VueConstructor, options: any = {}) => {
  Vue.prototype.$ELEMENT = Object.assign({}, Vue.prototype.$ELEMENT, options);
  Vue.component("ElTablePage", TablePage);
};

if (typeof window !== "undefined" && window.Vue) {
	// @ts-ignore
  TablePage.install(window.Vue);
}

export default TablePage;
