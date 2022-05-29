import MorePopover from "./MorePopover";
// @ts-ignore
MorePopover.install = (Vue: VueConstructor, options: any = {}) => {
  Vue.prototype.$ELEMENT = Object.assign({}, Vue.prototype.$ELEMENT, options);
  Vue.component("ElMorePopover", MorePopover);
};

if (typeof window !== "undefined" && window.Vue) {
  // @ts-ignore
  MorePopover.install(window.Vue);
}
export default MorePopover;
