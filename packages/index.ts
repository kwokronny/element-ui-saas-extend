import TablePage from "./TablePage/index";
import FormAuto from "./FormAuto/index";
import NumberRange from "./NumberRange/index";

const API: any = {
  install(Vue: any, options: any = {}) {
    Vue.component(NumberRange.name, NumberRange);
    Vue.component(FormAuto.name, FormAuto);
    Vue.component(TablePage.name, TablePage);
    Vue.prototype.$ELEMENT = Object.assign(Vue.prototype.$ELEMENT, options);
  },
};
export { TablePage, FormAuto, NumberRange };
export default API;
