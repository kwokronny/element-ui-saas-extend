import FormAuto from "./FormAuto.vue";
// @ts-ignore
FormAuto.install = (Vue: VueConstructor, options: any = {}) => {
  Vue.prototype.$ELEMENT = Object.assign({}, Vue.prototype.$ELEMENT, options);
  Vue.component("ElFormAuto", FormAuto);
};

if (typeof window !== "undefined" && window.Vue) {
  // @ts-ignore
  FormAuto.install(window.Vue);
}
export default FormAuto;
