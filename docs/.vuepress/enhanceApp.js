import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import ElementUISaaSExtend from "../../packages/index.ts";
import en from "element-ui/lib/locale/lang/en";
import saasEN from "../../src/locale/lang/en";
import cn from "element-ui/lib/locale/lang/zh-CN";
import saasCN from "../../src/locale/lang/zh-CN";
import "../../lib/theme-chalk/index.css";

export default ({
  Vue,
  router, // 当前应用的路由实例
  isServer, // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  Vue.filter("numeral", function(value, format) {
    return numeral(value).format(format);
  });

  Vue.filter("date", function(value) {
    return dayjs(value).format("YYYY-MM-DD");
  });

  Vue.filter("datetime", function(value) {
    return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
  });

  Vue.filter("dayjs", function(value, format) {
    return dayjs(value).format(format);
  });

  router.beforeEach(function(to, form, next) {
    if (/^\/en\//.test(to.path)) {
      ElementUI.locale(en);
      ElementUISaaSExtend.locale(saasEN);
    } else {
      ElementUI.locale(cn);
      ElementUISaaSExtend.locale(saasCN);
    }
    next();
  });

  if (!isServer) {
    Vue.use(ElementUI);
    Vue.use(ElementUISaaSExtend);
    ElementUI.locale(en);
    import("./components/UserSelector.vue").then((module) => {
      Vue.component(module.name, module);
    });
  }
};
