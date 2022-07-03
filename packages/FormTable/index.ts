import FormTable from "./FormTable.vue";
// @ts-ignore
FormTable.install = (Vue: VueConstructor, options: any = {}) => {
  Vue.prototype.$ELEMENT = Object.assign({}, Vue.prototype.$ELEMENT, options);
  Vue.component("ElFormTable", FormTable);
};

if (typeof window !== "undefined" && window.Vue) {
	// @ts-ignore
  FormTable.install(window.Vue);
}

export default FormTable;
