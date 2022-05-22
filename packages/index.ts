import TablePage from "./TablePage/index";
import FormAuto from "./FormAuto/index";
import NumberRange from "./NumberRange/index";
import TableButton from "./TableButton/index";
import { VueConstructor } from "vue/types/umd";
import locale from "../src/locale";
import localeMixin from "../src/mixin/locale";
import copyMixin from "../src/mixin/copy";
import selectScrollMixin from "../src/mixin/selectScroll";

const install = (Vue: VueConstructor, options: any = {}) => {
  if (options.locale) {
    locale.use(locale);
  }
  Vue.mixin(localeMixin);
  Vue.mixin(copyMixin);
  Vue.mixin(selectScrollMixin);
  Vue.prototype.$ELEMENT = Object.assign({}, Vue.prototype.$ELEMENT, options);
  Vue.component("ElNumberRange", NumberRange);
  Vue.component("ElFormAuto", FormAuto);
  Vue.component("ElTablePage", TablePage);
  Vue.component("ElTableButton", TableButton);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install, TablePage, FormAuto, NumberRange, locale: locale.use };
