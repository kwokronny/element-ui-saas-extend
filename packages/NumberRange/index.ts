import NumberRange from "./NumberRange.vue";
// @ts-ignore
NumberRange.install = (Vue: VueConstructor, options: any = {}) => {
  Vue.prototype.$ELEMENT = Object.assign({}, Vue.prototype.$ELEMENT, options);
  Vue.component("ElNumberRange", NumberRange);
};

if (typeof window !== "undefined" && window.Vue) {
	// @ts-ignore
  NumberRange.install(window.Vue);
}
export default NumberRange;
