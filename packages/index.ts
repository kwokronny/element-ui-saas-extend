import TablePage from "./TablePage/index";
import FormAuto from "./FormAuto/index";
import NumberRange from "./NumberRange/index";
import { VueConstructor } from "vue/types/umd";
import locale from "../src/locale";

const install = (Vue: VueConstructor, options: any = {}) => {
  if (options.lang) {
    locale.use(locale);
  }
  Vue.prototype.$ELEMENT = Object.assign({}, Vue.prototype.$ELEMENT, options);
  Vue.component("ElNumberRange", NumberRange);
  Vue.component("ElFormAuto", FormAuto);
  Vue.component("ElTablePage", TablePage);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install, TablePage, FormAuto, NumberRange, locale: locale.use };
