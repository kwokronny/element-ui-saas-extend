import TablePage from "./TablePage/index";
import FormAuto from "./FormAuto/index";
import NumberRange from "./NumberRange/index";
import { VueConstructor } from "vue/types/umd";
import locale from "../src/locale";
import localeMixin from "../src/mixin/locale";
import copyMixin from "../src/mixin/copy";

const install = (Vue: VueConstructor, options: any = {}) => {
  if (options.locale) {
    locale.use(locale);
  }
  Vue.mixin(localeMixin);
  Vue.mixin(copyMixin);
  Vue.prototype.$ELEMENT = Object.assign({}, Vue.prototype.$ELEMENT, options);
  Vue.component("ElNumberRange", NumberRange);
  Vue.component("ElFormAuto", FormAuto);
  Vue.component("ElTablePage", TablePage);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install, TablePage, FormAuto, NumberRange, locale: locale.use };
