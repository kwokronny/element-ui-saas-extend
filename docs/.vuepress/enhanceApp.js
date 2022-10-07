import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
import "../../lib/theme-chalk/index.css";
import ElementUISaaSExtend from "../../packages/index.ts";
import en from "element-ui/lib/locale/lang/en";
import saasEN from "../../src/locale/lang/en";
import cn from "element-ui/lib/locale/lang/zh-CN";
import saasCN from "../../src/locale/lang/zh-CN";

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

  Vue.prototype.$ELEMENT = {
    pickerOptions: {
      date: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      range: {
        shortcuts: [
          {
            text: "近1周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "近1月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "近3月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    },
  };
};
